#requires -Version 5.1
<#
.SYNOPSIS
  FactoryAI 179 Task → GitHub Issue + Project V2 자동 등록 스크립트.

.DESCRIPTION
  tasks/3.0_Full TASKS list.md의 마크다운 표를 파싱하여 179개 이슈를 생성하고,
  GitHub Project V2에 추가한 뒤 5주 AI 가속 일정의 Start/End Date를 설정합니다.

.PARAMETER Repo
  대상 저장소 (owner/repo). 기본: hjh890989-web/my_RPA_AI_SaaS_project_root

.PARAMETER ProjectTitle
  Project V2 제목. 없으면 새로 생성.

.PARAMETER DryRun
  실제 생성 없이 시뮬레이션만 (라벨/이슈/필드 출력).

.PARAMETER Limit
  생성할 최대 이슈 수 (테스트용). 기본 0 = 전체.

.EXAMPLE
  ./scripts/setup-github-project.ps1 -DryRun -Limit 5
  # 5건만 dry-run으로 미리보기

.EXAMPLE
  ./scripts/setup-github-project.ps1
  # 179건 전체 실제 생성
#>

[CmdletBinding()]
param(
    [string]$Repo = 'hjh890989-web/my_RPA_AI_SaaS_project_root',
    [string]$ProjectTitle = 'my_RPA_AI_SaaS_project',
    [int]$ProjectNumber = 7,  # 기존 Project 번호 (0이면 ProjectTitle로 검색)
    [switch]$DryRun,
    [int]$Limit = 0
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

# ============================================================================
# 0. 사전 검증
# ============================================================================
function Test-GhCli {
    try {
        $version = gh --version 2>&1 | Select-Object -First 1
        Write-Host "✓ $version" -ForegroundColor Green
    } catch {
        Write-Error "gh CLI 미설치. winget install GitHub.cli 실행."
        exit 1
    }

    $authResult = gh auth status 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Error "gh CLI 미인증. 'gh auth login --web -h github.com -s repo,project,read:org' 실행."
        exit 1
    }
    Write-Host "✓ 인증 OK" -ForegroundColor Green
}

# ============================================================================
# 1. Task ID → Phase/Week/Date 매핑
#    (tasks/3.2_AI_Accelerated_Schedule.md §4 기준)
# ============================================================================
function Get-Schedule {
    param([string]$TaskId)

    $map = @{
        # Phase 0 — Init (W1)
        'INIT'        = @{ Phase = '0-init';         Week = 1; Start = '2026-05-18'; End = '2026-05-22' }
        # Phase 1 — Foundation (W1)
        'DB'          = @{ Phase = '1-foundation';   Week = 1; Start = '2026-05-18'; End = '2026-05-22' }
        'API'         = @{ Phase = '1-foundation';   Week = 1; Start = '2026-05-20'; End = '2026-05-22' }
        'MOCK'        = @{ Phase = '1-foundation';   Week = 1; Start = '2026-05-21'; End = '2026-05-22' }
        # Phase 2a — Auth/AI (W1~W2)
        'AUTH'        = @{ Phase = '2a-auth';        Week = 2; Start = '2026-05-25'; End = '2026-05-28' }
        'AI'          = @{ Phase = '2a-ai';          Week = 1; Start = '2026-05-18'; End = '2026-05-22' }
        'NOTI'        = @{ Phase = '2a-noti';        Week = 2; Start = '2026-05-25'; End = '2026-05-26' }
        # Phase 2 — Feature
        'E1'          = @{ Phase = '2-feature';      Week = 2; Start = '2026-05-26'; End = '2026-05-30' }
        'E2-'         = @{ Phase = '2-feature';      Week = 2; Start = '2026-05-29'; End = '2026-06-03' }
        'E2B'         = @{ Phase = '2-feature';      Week = 3; Start = '2026-06-01'; End = '2026-06-03' }
        'E3'          = @{ Phase = '2-feature';      Week = 3; Start = '2026-06-03'; End = '2026-06-05' }
        'E4'          = @{ Phase = '2-feature';      Week = 3; Start = '2026-06-03'; End = '2026-06-05' }
        'E6'          = @{ Phase = '2-feature';      Week = 3; Start = '2026-06-01'; End = '2026-06-03' }
        'E7'          = @{ Phase = '2-feature';      Week = 3; Start = '2026-06-04'; End = '2026-06-05' }
        'HITL'        = @{ Phase = '2-hitl';         Week = 2; Start = '2026-05-29'; End = '2026-06-04' }
        # Phase 3 — Test (W4)
        'TEST'        = @{ Phase = '3-test';         Week = 4; Start = '2026-06-08'; End = '2026-06-12' }
        # Phase 4 — SVC (W4)
        'SVC-SYS'     = @{ Phase = '4-svc';          Week = 4; Start = '2026-06-08'; End = '2026-06-12' }
        # Phase 4 — NFR
        'NFR-PERF'    = @{ Phase = '4-nfr';          Week = 4; Start = '2026-06-08'; End = '2026-06-16' }
        'NFR-AVAIL'   = @{ Phase = '4-nfr';          Week = 4; Start = '2026-06-11'; End = '2026-06-12' }
        'NFR-REL'     = @{ Phase = '4-nfr';          Week = 4; Start = '2026-06-11'; End = '2026-06-12' }
        'NFR-SEC'     = @{ Phase = '4-nfr';          Week = 4; Start = '2026-06-12'; End = '2026-06-12' }
        'NFR-MON'     = @{ Phase = '4-nfr';          Week = 5; Start = '2026-06-15'; End = '2026-06-15' }
        'NFR-SCALE'   = @{ Phase = '4-nfr';          Week = 5; Start = '2026-06-15'; End = '2026-06-15' }
        'NFR-MAINT'   = @{ Phase = '4-nfr';          Week = 5; Start = '2026-06-15'; End = '2026-06-15' }
    }

    # 가장 긴 prefix 매칭 (예: 'E2B-CMD' 가 'E2-' 보다 먼저)
    $keys = $map.Keys | Sort-Object -Property Length -Descending
    foreach ($k in $keys) {
        if ($TaskId.StartsWith($k)) {
            return $map[$k]
        }
    }
    # Fallback
    return @{ Phase = 'backlog'; Week = 0; Start = '2026-05-18'; End = '2026-06-19' }
}

# ============================================================================
# 2. Type 추출 (Feature 텍스트의 **[Command]** 등)
# ============================================================================
function Get-TypeFromFeature {
    param([string]$Feature, [string]$TaskId)

    # Task ID prefix로 우선 추정
    switch -Regex ($TaskId) {
        '^INIT-'    { return 'init' }
        '^DB-'      { return 'db' }
        '^API-'     { return 'api' }
        '^MOCK-'    { return 'mock' }
        '^AUTH-'    { return 'auth' }
        '^AI-'      { return 'ai' }
        '^NOTI-'    { return 'notification' }
        '^TEST-'    { return 'test' }
        '^NFR-'     { return 'nfr' }
        '^SVC-SYS-' { return 'svc' }
    }

    # **[Command]** 등 마크다운에서 추출
    if ($Feature -match '\*\*\[Command\]\*\*')     { return 'command' }
    if ($Feature -match '\*\*\[Query\]\*\*')       { return 'query' }
    if ($Feature -match '\*\*\[UI\]\*\*')          { return 'ui' }
    if ($Feature -match '\*\*\[Test\]\*\*')        { return 'test' }
    return 'feature'
}

# ============================================================================
# 3. Epic 정규화 (라벨용 slug)
# ============================================================================
function Get-EpicLabel {
    param([string]$Epic, [string]$TaskId)

    # TaskId prefix 기반 우선 매핑 (가장 안정적, 한글 무관)
    switch -Regex ($TaskId) {
        '^(INIT|DB|API|MOCK|AUTH|AI|NOTI)-' { return 'foundation' }
        '^E1-|^TEST-E1-'                    { return 'E1-passive-logging' }
        '^E2B-|^TEST-E2B-'                  { return 'E2B-xai' }
        '^E2-|^TEST-E2-'                    { return 'E2-audit-report' }
        '^E3-|^TEST-E3-'                    { return 'E3-erp-bridge' }
        '^E4-|^TEST-E4-'                    { return 'E4-roi' }
        '^E6-|^TEST-E6-'                    { return 'E6-security' }
        '^E7-|^TEST-E7-'                    { return 'E7-dashboard' }
        '^HITL-|^TEST-HITL-'                { return 'HITL' }
        '^SVC-'                             { return 'SVC' }
        '^NFR-SEC-'                         { return 'Sec' }
        '^NFR-'                             { return 'Infra' }
    }
    return 'misc'
}

# ============================================================================
# 4. Critical Path 식별
# ============================================================================
$CRITICAL_PATH = @(
    'INIT-001', 'DB-001', 'DB-002', 'DB-003', 'DB-004', 'DB-005', 'DB-007', 'DB-008',
    'AUTH-001', 'AUTH-002', 'AUTH-003',
    'AI-001', 'AI-002',
    'E1-CMD-001', 'E2-CMD-001', 'E2-CMD-002', 'E3-CMD-001',
    'HITL-CMD-001',
    'NFR-PERF-006'
)

$GOOD_FIRST = @('INIT-001', 'AI-001', 'API-009', 'API-010', 'API-011', 'API-012', 'API-013', 'MOCK-005', 'NFR-SEC-001', 'NFR-AVAIL-001', 'E1-UI-005')

# ============================================================================
# 5. Markdown 표 파싱
# ============================================================================
function Parse-TasksFromMarkdown {
    param([string]$FilePath)

    $tasks = @()
    $lines = Get-Content -Path $FilePath -Encoding UTF8

    foreach ($line in $lines) {
        # 표 row: | TASK-ID | Epic | Feature | SRS | Dependencies | Complexity |
        if ($line -match '^\|\s*([A-Z][A-Z0-9-]+-\d+)\s*\|\s*([^|]+)\s*\|\s*([^|]+)\s*\|\s*([^|]*)\s*\|\s*([^|]*)\s*\|\s*([LMH])\s*\|') {
            $taskId       = $Matches[1].Trim()
            $epic         = $Matches[2].Trim()
            $feature      = $Matches[3].Trim()
            $srsRef       = $Matches[4].Trim()
            $dependencies = $Matches[5].Trim()
            $complexity   = $Matches[6].Trim()

            $tasks += [PSCustomObject]@{
                TaskId       = $taskId
                Epic         = $epic
                Feature      = $feature
                SrsRef       = $srsRef
                Dependencies = $dependencies
                Complexity   = $complexity
            }
        }
    }

    return $tasks
}

# ============================================================================
# 6. Issue Body 생성
# ============================================================================
function Build-IssueBody {
    param([PSCustomObject]$Task, [hashtable]$Schedule)

    $featureClean = $Task.Feature -replace '\*\*\[([^\]]+)\]\*\*\s*', ''

    $depsBlock = if ($Task.Dependencies -eq 'None' -or $Task.Dependencies -eq '없음' -or [string]::IsNullOrWhiteSpace($Task.Dependencies)) {
        "**선행 없음** — Good First Issue로 즉시 착수 가능."
    } else {
        $Task.Dependencies
    }

    $criticalBadge = if ($CRITICAL_PATH -contains $Task.TaskId) { "🟥 **Critical Path** — 본 task 지연 시 전체 일정 지연. " } else { "" }
    $goodFirstBadge = if ($GOOD_FIRST -contains $Task.TaskId) { "🟢 **Good First Issue** — 선행 의존성 0건. " } else { "" }

    $type = Get-TypeFromFeature -Feature $Task.Feature -TaskId $Task.TaskId

@"
## 📋 Task Overview
${criticalBadge}${goodFirstBadge}
- **Task ID**: ``$($Task.TaskId)``
- **Epic**: $($Task.Epic)
- **Type**: $type
- **Complexity**: $($Task.Complexity)
- **Phase**: $($Schedule.Phase)
- **Week**: W$($Schedule.Week) ($($Schedule.Start) ~ $($Schedule.End))

## 🎯 Description
$featureClean

## 🔗 SRS Reference
$($Task.SrsRef)

## ⛓ Dependencies (선행 태스크)
$depsBlock

## ✅ Acceptance Criteria
> SRS V0.8 §$($Task.SrsRef)의 AC/NAC를 참조하여 작성.
> 상세는 [tasks/3.0_Full TASKS list.md](../blob/main/my_RPA_AI_SaaS_app/tasks/3.0_Full%20TASKS%20list.md) 및 [tasks/4.x 시리즈](../tree/main/my_RPA_AI_SaaS_app/tasks) 참조.

- [ ] (구현 완료)
- [ ] (테스트 통과 — ``npm run typecheck`` + ``npm run lint`` + ``npm run build``)
- [ ] (감사 로그 기록 — R4 적용 영역인 경우)
- [ ] (HITL 영향 검토 — AI 결과 처리 시)
- [ ] (RBAC 가드 — Server Action / Route Handler인 경우)

## 📚 References
- [전체 Task List](../blob/main/my_RPA_AI_SaaS_app/tasks/3.0_Full%20TASKS%20list.md) — 의존성 맵
- [12주 Gantt 차트](../blob/main/my_RPA_AI_SaaS_app/tasks/3.1_Gantt_Chart_Critical_Path.md)
- [5주 AI 가속 일정](../blob/main/my_RPA_AI_SaaS_app/tasks/3.2_AI_Accelerated_Schedule.md)
- [SRS V0.8](../blob/main/my_RPA_AI_SaaS_app/docs/2_SRS_V_1.0.md)
- [AGENTS.md (Harness)](../blob/main/my_RPA_AI_SaaS_app/AGENTS.md)

## 🛠 구현 힌트
$(Get-ImplementationHint -TaskId $Task.TaskId -Type $type)
"@
}

function Get-ImplementationHint {
    param([string]$TaskId, [string]$Type)

    $hints = switch -Regex ($TaskId) {
        '^INIT-001'   { 'Skill: ``/101-build-and-env-setup``' }
        '^DB-'        { 'Skill: ``/300-nextjs-app-router-rules`` (§0 백엔드), Subagent: ``prisma-schema``' }
        '^API-'       { 'Skill: ``/311-route-handler-patterns``' }
        '^MOCK-'      { 'Skill: ``/304-mock-erp-pattern``' }
        '^AUTH-'      { 'Skill: ``/314-nextauth-v5-setup`` + ``/312-rbac-guard``' }
        '^AI-'        { 'Skill: ``/302-gemini-throttle`` + ``/305-vercel-ai-sdk-rules``' }
        '^NOTI-'      { 'Skill: ``/315-api-error-handling`` (알림 envelope)' }
        '^E1-CMD-'    { 'Skills: ``/310-server-action-patterns`` + ``/305-vercel-ai-sdk-rules`` + ``/306-hitl-safety-rules``' }
        '^E2-CMD-001' { 'Skill: ``/318-prisma-transactions`` (Lot 병합 ≥99%)' }
        '^E2-CMD-002' { 'Skill: ``/303-client-side-pdf`` (Vercel 10s 회피)' }
        '^E2-CMD-'    { 'Skill: ``/310-server-action-patterns`` + ``/306-hitl-safety-rules``' }
        '^E2B-'       { 'Skill: ``/305-vercel-ai-sdk-rules`` + ``/306-hitl-safety-rules``' }
        '^E3-CMD-001' { 'Skills: ``/301-erp-readonly-guard`` + ``/304-mock-erp-pattern``' }
        '^E3-CMD-002' { 'Skill: ``/316-file-upload-excel``' }
        '^E3-'        { 'Skill: ``/301-erp-readonly-guard``' }
        '^E4-'        { 'Skill: ``/310-server-action-patterns``' }
        '^E6-'        { 'Skill: ``/312-rbac-guard`` + ``/313-audit-log-helper``' }
        '^E7-'        { 'Skill: ``/317-background-jobs`` (월말 발행 cron)' }
        '^HITL-'      { 'Skill: ``/306-hitl-safety-rules`` + ``/313-audit-log-helper``' }
        '^TEST-'      { 'Skill: ``/400-srs-task-extraction`` (AC → Test 변환), Subagent: ``nfr-test-author``' }
        '^NFR-'       { 'Subagent: ``nfr-test-author`` (Gemini CLI) 또는 ``security-reviewer``' }
        '^SVC-SYS-'   { 'Skill: ``/310-server-action-patterns``' }
        default       { 'Skill: ``/300-nextjs-app-router-rules`` §0 Backend Quick Reference 참조' }
    }
    return $hints
}

# ============================================================================
# 7. 라벨 정의
# ============================================================================
function Get-AllLabels {
    @(
        # Epic
        @{ Name = 'epic:foundation';            Color = 'bfbfbf'; Description = 'Foundation (INIT/DB/API/MOCK/AUTH/AI/NOTI)' },
        @{ Name = 'epic:E1-passive-logging';    Color = '1f6feb'; Description = 'E1 패시브 로깅 (STT+Vision)' },
        @{ Name = 'epic:E2-audit-report';       Color = '8957e5'; Description = 'E2 감사 리포트 (Lot Merge+PDF)' },
        @{ Name = 'epic:E2B-xai';               Color = 'a371f7'; Description = 'E2-B 품질 XAI 이상탐지' },
        @{ Name = 'epic:E3-erp-bridge';         Color = '238636'; Description = 'E3 ERP 비파괴형 브릿지' },
        @{ Name = 'epic:E4-roi';                Color = 'd29922'; Description = 'E4 CFO용 ROI 진단/결재기' },
        @{ Name = 'epic:E6-security';           Color = 'da3633'; Description = 'E6 보안 패키지' },
        @{ Name = 'epic:E7-dashboard';          Color = '1f883d'; Description = 'E7 성과 가시화 대시보드' },
        @{ Name = 'epic:HITL';                  Color = 'b62324'; Description = 'HITL 공통 안전 프로토콜' },
        @{ Name = 'epic:SVC';                   Color = '6e7681'; Description = 'SVC 서비스 운영 지원' },
        @{ Name = 'epic:Infra';                 Color = '484f58'; Description = 'Infra/DevOps' },
        @{ Name = 'epic:Sec';                   Color = 'a40e26'; Description = 'Security' },
        @{ Name = 'epic:misc';                  Color = 'cccccc'; Description = '기타' },

        # Type
        @{ Name = 'type:init';                  Color = '0969da'; Description = '프로젝트 초기 설정' },
        @{ Name = 'type:db';                    Color = '033d8b'; Description = 'DB 스키마/마이그레이션' },
        @{ Name = 'type:api';                   Color = '0550ae'; Description = 'API DTO/계약' },
        @{ Name = 'type:mock';                  Color = '848d97'; Description = 'Mock 데이터/API' },
        @{ Name = 'type:auth';                  Color = 'cf222e'; Description = '인증/인가' },
        @{ Name = 'type:ai';                    Color = '8250df'; Description = 'AI 추상화/통합' },
        @{ Name = 'type:notification';          Color = '57b3f4'; Description = '알림 서비스' },
        @{ Name = 'type:command';               Color = '1f883d'; Description = 'Server Action (Mutation)' },
        @{ Name = 'type:query';                 Color = '4ac26b'; Description = 'Query (읽기 전용)' },
        @{ Name = 'type:ui';                    Color = 'bf8700'; Description = 'UI 컴포넌트' },
        @{ Name = 'type:test';                  Color = 'fb8500'; Description = 'AC 기반 테스트' },
        @{ Name = 'type:nfr';                   Color = 'db61a2'; Description = 'NFR (Performance/Security/...)' },
        @{ Name = 'type:svc';                   Color = '6e5494'; Description = 'SVC 시스템 지원' },
        @{ Name = 'type:feature';               Color = '888888'; Description = '일반 Feature' },

        # Complexity
        @{ Name = 'complexity:L';               Color = '8fce8f'; Description = '저복잡도' },
        @{ Name = 'complexity:M';               Color = 'fff200'; Description = '중복잡도' },
        @{ Name = 'complexity:H';               Color = 'ff4500'; Description = '고복잡도' },

        # Phase
        @{ Name = 'phase:0-init';               Color = 'd0d0d0'; Description = 'W1 초기화' },
        @{ Name = 'phase:1-foundation';         Color = '0969da'; Description = 'W1 Foundation' },
        @{ Name = 'phase:2-feature';            Color = '1f883d'; Description = 'W2~W3 Feature' },
        @{ Name = 'phase:3-test';               Color = 'fb8500'; Description = 'W4 Test' },
        @{ Name = 'phase:4-nfr';                Color = 'da3633'; Description = 'W4~W5 NFR' },
        @{ Name = 'phase:4-svc';                Color = '6e5494'; Description = 'W4 SVC' },

        # 특수
        @{ Name = 'critical-path';              Color = 'd73a4a'; Description = 'Critical Path — 지연 시 전체 지연' },
        @{ Name = 'good-first-issue';           Color = '7057ff'; Description = '선행 의존성 0건 — 즉시 착수 가능' },
        @{ Name = 'hitl-impact';                Color = 'b62324'; Description = 'HITL 영향 — 검토 필수' }
    )
}

function Sync-Labels {
    Write-Host "`n=== 라벨 동기화 ===" -ForegroundColor Cyan
    $labels = Get-AllLabels
    foreach ($label in $labels) {
        if ($DryRun) {
            Write-Host "  [DRY] label: $($label.Name) (#$($label.Color))" -ForegroundColor Gray
            continue
        }
        $args = @('label', 'create', $label.Name, '--repo', $Repo, '--color', $label.Color, '--description', $label.Description, '--force')
        $output = & gh @args 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✓ $($label.Name)" -ForegroundColor Green
        } else {
            Write-Host "  ! $($label.Name): $output" -ForegroundColor Yellow
        }
    }
}

# ============================================================================
# 8. Project V2 생성/조회 + 필드 셋업
# ============================================================================
function Setup-Project {
    Write-Host "`n=== Project V2 셋업 ===" -ForegroundColor Cyan

    $owner = ($Repo -split '/')[0]

    # 1) 프로젝트 선택 (ProjectNumber 우선, 없으면 title로 검색)
    $project = $null
    if ($ProjectNumber -gt 0) {
        $info = gh project view $ProjectNumber --owner $owner --format json 2>&1
        if ($LASTEXITCODE -eq 0) {
            $project = $info | ConvertFrom-Json
            Write-Host "  ✓ Project #$ProjectNumber 사용: $($project.title)" -ForegroundColor Green
        }
    }
    if (-not $project) {
        $existing = gh project list --owner $owner --format json --limit 50 2>&1 | ConvertFrom-Json
        $project = $existing.projects | Where-Object { $_.title -eq $ProjectTitle } | Select-Object -First 1
        if ($project) {
            Write-Host "  ✓ 기존 Project 검색 일치: #$($project.number) $($project.title)" -ForegroundColor Green
        } else {
            if ($DryRun) {
                Write-Host "  [DRY] Project 신규 생성 예정: $ProjectTitle" -ForegroundColor Gray
                return @{ Number = 0; Url = 'dryrun'; Owner = $owner; StartFieldId = ''; EndFieldId = ''; ProjectId = '' }
            }
            $created = gh project create --owner $owner --title $ProjectTitle --format json 2>&1 | ConvertFrom-Json
            $project = $created
            Write-Host "  ✓ Project 신규 생성: #$($project.number)" -ForegroundColor Green
        }
    }

    # 2) Date 필드 확보 (Roadmap 뷰 필수)
    $startFieldId = ''
    $endFieldId = ''
    $projectId = ''

    if ($DryRun) {
        Write-Host "  [DRY] 'Start Date', 'End Date' 필드 보장 예정" -ForegroundColor Gray
    } else {
        # Project Node ID는 view 결과에 이미 포함
        $projectId = $project.id
        if (-not $projectId) {
            $projNum = [int]$project.number
            $projInfo = gh api graphql -f query="query(`$login:String!, `$num:Int!){ user(login:`$login){ projectV2(number:`$num){ id } } }" -F "login=$owner" -F "num=$projNum" 2>&1 | ConvertFrom-Json
            $projectId = $projInfo.data.user.projectV2.id
        }
        Write-Host "  ✓ Project Node ID: $projectId" -ForegroundColor Gray

        $projNum = [int]$project.number
        $fields = gh project field-list $projNum --owner $owner --format json 2>&1 | ConvertFrom-Json

        $startField = $fields.fields | Where-Object { $_.name -eq 'Start Date' } | Select-Object -First 1
        if (-not $startField) {
            $out = gh project field-create $projNum --owner $owner --name 'Start Date' --data-type 'DATE' --format json 2>&1 | ConvertFrom-Json
            $startFieldId = $out.id
            Write-Host "  ✓ 'Start Date' 필드 생성: $startFieldId" -ForegroundColor Green
        } else {
            $startFieldId = $startField.id
            Write-Host "  ✓ 'Start Date' 필드 존재: $startFieldId" -ForegroundColor Gray
        }

        $endField = $fields.fields | Where-Object { $_.name -eq 'End Date' } | Select-Object -First 1
        if (-not $endField) {
            $out = gh project field-create $projNum --owner $owner --name 'End Date' --data-type 'DATE' --format json 2>&1 | ConvertFrom-Json
            $endFieldId = $out.id
            Write-Host "  ✓ 'End Date' 필드 생성: $endFieldId" -ForegroundColor Green
        } else {
            $endFieldId = $endField.id
            Write-Host "  ✓ 'End Date' 필드 존재: $endFieldId" -ForegroundColor Gray
        }
    }

    return @{
        Number       = $project.number
        Url          = $project.url
        Owner        = $owner
        ProjectId    = $projectId
        StartFieldId = $startFieldId
        EndFieldId   = $endFieldId
    }
}

# ============================================================================
# 9. Issue 생성 + Project 연결
# ============================================================================
function Create-Issues {
    param([array]$Tasks, [hashtable]$Project)

    Write-Host "`n=== Issue 생성 (총 $($Tasks.Count)건) ===" -ForegroundColor Cyan

    # 기존 이슈 목록 조회 (idempotency 보장) — TaskId → IssueUrl 매핑
    $existing = @{}
    if (-not $DryRun) {
        Write-Host "  기존 이슈 스캔 중..." -ForegroundColor Gray
        $allIssues = gh issue list --repo $Repo --limit 1000 --state all --json number,title,url 2>&1 | ConvertFrom-Json
        foreach ($iss in $allIssues) {
            if ($iss.title -match '^\[([A-Z][A-Z0-9-]+-\d+b?)\]') {
                $existing[$Matches[1]] = $iss.url
            }
        }
        Write-Host "  기존 이슈 $($existing.Count)건 감지" -ForegroundColor Gray
    }

    $created = 0; $skipped = 0; $failed = 0

    foreach ($task in $Tasks) {
        $schedule = Get-Schedule -TaskId $task.TaskId
        $type = Get-TypeFromFeature -Feature $task.Feature -TaskId $task.TaskId
        $epicLabel = Get-EpicLabel -Epic $task.Epic -TaskId $task.TaskId
        $featureClean = ($task.Feature -replace '\*\*\[([^\]]+)\]\*\*\s*', '').Trim()
        # 큰따옴표는 작은따옴표로 (PowerShell 인자 경계 파싱 방지)
        $featureClean = $featureClean -replace '"', "'"
        # 너무 긴 제목 자르기
        if ($featureClean.Length -gt 90) { $featureClean = $featureClean.Substring(0, 87) + '...' }

        $title = "[$($task.TaskId)] $featureClean"

        $labels = @(
            "epic:$epicLabel"
            "type:$type"
            "complexity:$($task.Complexity)"
            "phase:$($schedule.Phase)"
        )
        if ($CRITICAL_PATH -contains $task.TaskId) { $labels += 'critical-path' }
        if ($GOOD_FIRST -contains $task.TaskId) { $labels += 'good-first-issue' }
        if ($task.TaskId -match '^HITL-') { $labels += 'hitl-impact' }

        $body = Build-IssueBody -Task $task -Schedule $schedule

        if ($DryRun) {
            Write-Host "  [DRY] $title" -ForegroundColor Gray
            Write-Host "        labels: $($labels -join ', ')" -ForegroundColor DarkGray
            Write-Host "        week: $($schedule.Week), start: $($schedule.Start), end: $($schedule.End)" -ForegroundColor DarkGray
            $created++
            continue
        }

        try {
            # Idempotency: 기존 이슈가 있으면 완전히 skip (item-add/date도 안 함)
            # 이유: rate limit 절약 — 이미 첫 실행에서 add+date 완료됨
            if ($existing.ContainsKey($task.TaskId)) {
                $skipped++
                continue
            } else {
                # gh api REST 호출 — PowerShell argument parsing 우회 (한글+괄호+따옴표 안전)
                $payload = [ordered]@{
                    title  = $title
                    body   = $body
                    labels = @($labels)
                } | ConvertTo-Json -Compress -Depth 4

                $tmpJson = [System.IO.Path]::GetTempFileName()
                [System.IO.File]::WriteAllText($tmpJson, $payload, [System.Text.UTF8Encoding]::new($false))

                $apiResp = gh api "repos/$Repo/issues" -X POST --input $tmpJson 2>&1
                Remove-Item $tmpJson -Force -ErrorAction SilentlyContinue

                if ($LASTEXITCODE -ne 0) {
                    throw "gh api issues 실패: $apiResp"
                }
                $issueObj = $apiResp | ConvertFrom-Json
                $issueUrl = $issueObj.html_url
                $created++
            }

            # Project에 추가 (item-id 회수)
            $addJson = gh project item-add $Project.Number --owner $Project.Owner --url $issueUrl --format json 2>&1
            if ($LASTEXITCODE -ne 0) {
                Write-Host "    ! Project 추가 실패: $addJson" -ForegroundColor Yellow
            } else {
                $item = $addJson | ConvertFrom-Json
                $itemId = $item.id

                # Start Date / End Date 설정
                if ($Project.StartFieldId -and $itemId) {
                    $r1 = gh project item-edit --project-id $Project.ProjectId --id $itemId --field-id $Project.StartFieldId --date $schedule.Start 2>&1
                    if ($LASTEXITCODE -ne 0) { Write-Host "    ! Start Date 설정 실패: $r1" -ForegroundColor Yellow }
                }
                if ($Project.EndFieldId -and $itemId) {
                    $r2 = gh project item-edit --project-id $Project.ProjectId --id $itemId --field-id $Project.EndFieldId --date $schedule.End 2>&1
                    if ($LASTEXITCODE -ne 0) { Write-Host "    ! End Date 설정 실패: $r2" -ForegroundColor Yellow }
                }
            }

            $totalDone = $created + $skipped
            if (-not $existing.ContainsKey($task.TaskId) -or $created -eq 1) {
                Write-Host "  ✓ ($totalDone/$($Tasks.Count)) $title" -ForegroundColor Green
            }

            # Secondary rate limit 보호 — 신규 생성 후 2초 대기, 매 10건마다 15초 추가
            if (-not $existing.ContainsKey($task.TaskId)) {
                Start-Sleep -Seconds 2
                if ($created % 10 -eq 0) {
                    Write-Host "  💤 10건 휴식 (15초)..." -ForegroundColor DarkGray
                    Start-Sleep -Seconds 15
                }
            }
        } catch {
            $failed++
            Write-Host "  ✗ $title — $_" -ForegroundColor Red
            # 403 secondary rate limit 감지 시 30초 백오프
            if ($_ -match '403|secondary rate limit') {
                Write-Host "  💤 Rate Limit 감지 — 30초 백오프" -ForegroundColor Yellow
                Start-Sleep -Seconds 30
            }
        }
    }

    Write-Host "`n=== 완료: 신규 $created / 재사용 $skipped / 실패 $failed ===" -ForegroundColor Cyan
}

# ============================================================================
# Main
# ============================================================================

Write-Host "FactoryAI GitHub Project 셋업" -ForegroundColor Cyan
Write-Host "  Repo: $Repo"
Write-Host "  Project: $ProjectTitle"
Write-Host "  Mode: $(if ($DryRun) {'DRY RUN'} else {'LIVE'})"
if ($Limit -gt 0) { Write-Host "  Limit: 첫 $Limit건만" }

Test-GhCli

$taskFile = Join-Path $root 'tasks\3.0_Full TASKS list.md'
if (-not (Test-Path $taskFile)) {
    Write-Error "Task 파일 없음: $taskFile"
    exit 1
}

$allTasks = Parse-TasksFromMarkdown -FilePath $taskFile
Write-Host "`n파싱 완료: $($allTasks.Count) tasks" -ForegroundColor Green

# 중복 Task ID 처리 (예: NFR-SEC-001 두 번 등장 → 두 번째는 'b' 접미)
$seen = @{}
foreach ($t in $allTasks) {
    if ($seen.ContainsKey($t.TaskId)) {
        $newId = "$($t.TaskId)b"
        Write-Host "  ! 중복 발견: $($t.TaskId) → $newId 로 변경" -ForegroundColor Yellow
        $t.TaskId = $newId
    }
    $seen[$t.TaskId] = $true
}

if ($Limit -gt 0) {
    $allTasks = $allTasks | Select-Object -First $Limit
    Write-Host "Limit 적용: $($allTasks.Count) tasks로 축소" -ForegroundColor Yellow
}

Sync-Labels

$project = Setup-Project

Create-Issues -Tasks $allTasks -Project $project

if (-not $DryRun) {
    Write-Host "`n🎉 완료! Project URL: $($project.Url)" -ForegroundColor Green
    Write-Host "Roadmap 뷰는 GitHub UI에서 수동 설정 필요 — README 또는 docs/HARNESS_BACKEND_REVIEW.md 참고" -ForegroundColor Cyan
}
