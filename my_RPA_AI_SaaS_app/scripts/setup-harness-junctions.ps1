# setup-harness-junctions.ps1
# 신규 클론·머신에서 .cursor/skills, .claude/skills를 .agents/skills로 연결.
# Windows에서 PowerShell 일반 권한으로 실행 가능 (Junction 사용).
# Linux/macOS는 마지막 섹션의 ln -s 명령을 참고.

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot                      # my_RPA_AI_SaaS_app/
$target = Join-Path $root '.agents\skills'

if (-not (Test-Path $target)) {
    Write-Error ".agents/skills 폴더가 없습니다. 잘못된 위치이거나 저장소가 손상되었습니다."
    exit 1
}

@('.cursor\skills', '.claude\skills') | ForEach-Object {
    $linkPath = Join-Path $root $_

    if (Test-Path $linkPath) {
        $item = Get-Item -Force $linkPath
        if ($item.LinkType -eq 'Junction' -or $item.LinkType -eq 'SymbolicLink') {
            Write-Host "✓ $_ 이미 Junction/Symlink 존재 — skip" -ForegroundColor Gray
            return
        }
        Write-Host "! $_ 이 일반 디렉토리로 존재합니다. 백업 후 재생성 권장." -ForegroundColor Yellow
        return
    }

    New-Item -ItemType Junction -Path $linkPath -Target $target -Force | Out-Null
    Write-Host "✓ $_ → $target" -ForegroundColor Green
}

Write-Host ""
Write-Host "Linux/macOS 사용자는 아래 명령을 직접 실행하세요:" -ForegroundColor Cyan
Write-Host "  ln -s ../.agents/skills .cursor/skills"
Write-Host "  ln -s ../.agents/skills .claude/skills"
