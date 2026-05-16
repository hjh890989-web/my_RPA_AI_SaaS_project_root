# AI Harness 전면 재정립 계획서

**작성일**: 2026-05-16
**대상 저장소**: `my_RPA_AI_SaaS_app/`
**원천 문서**: `docs/1_RPD_V_1.0.md` (PRD v7.0), `docs/2_SRS_V_1.0.md` (SRS v0.8)
**참고 가이드**: `README-claude-harness.md`, `README-common-harness.md`, `README-cursor-harness.md`, `README-gemini-harness.md`

---

## 0. 한 줄 요약

현재 harness 파일들은 **대부분 템플릿 그대로**이거나 **다른 프로젝트(Spring Boot 기반)의 잔재**다. SRS v0.8이 정의한 **FactoryAI (Next.js + Supabase + Gemini + Prisma) 1인 개발 MVP** 환경에 맞추어 전 harness를 **재작성**하고, `AGENTS.md` 단일 진실원본 + `.agents/skills/` 공유 + 도구별 전용 설정으로 정렬한다.

---

## 1. 현황 진단 (Gap Analysis)

### 1-1. 프로젝트 정체성 불일치 (Critical)

| 위치 | 현재 내용 | 실제 (SRS v0.8) |
|---|---|---|
| `AGENTS.md` §001 | "Submission Wizard / Financial Auto-Engine / AI Drafting / PMF Diagnostic / Docs Export" (정부/은행 사업계획서 작성 보조 SaaS) | **FactoryAI — 제조 AI 자동화 플랫폼** (E1~E7 + SVC-1~5) |
| `CLAUDE.md` §1 | "프로젝트 비전 …" 템플릿 그대로 | 미작성 |
| `.cursor/rules/001-project-overview.mdc` | `[PROJECT NAME]` placeholder | 미작성 |
| `.agents/rules/001-project-overview.md` | "AI Co-Pilot for First-time Founders" | 잘못된 프로젝트 |

### 1-2. 기술스택 불일치 (Critical)

| 위치 | 현재 내용 | 실제 (SRS v0.8 + package.json) |
|---|---|---|
| `AGENTS.md` §002 | Spring Boot 4.0 / Java 21 / MySQL / Python FastAPI + LangChain | **Next.js 15 App Router / TypeScript / Supabase PostgreSQL / Vercel AI SDK + Gemini / Prisma** |
| `CLAUDE.md` §2 | Spring Boot 3.x / Thymeleaf / Redis / Kafka / Flutter / Supabase | (위와 동일) |
| `.cursor/rules/002-tech-stack.mdc` | Spring Boot / Thymeleaf / Redis / Kafka / Hugging Face / OpenAI | (위와 동일) |
| `.agents/rules/002-tech-stack.md` | Spring Boot 4.0 / Java 21 / MySQL / Python FastAPI | (위와 동일) |
| `package.json` (실제) | **Vite + React + TypeScript + react-router-dom** (랜딩페이지) | — |

> **이중 단계 인식**: 현재 코드(`src/`)는 SRS의 Out-of-Scope인 **마케팅 랜딩페이지(Vite SPA)**. SRS가 정의한 **본 제품(Next.js)**는 아직 미착수. Harness는 두 단계를 모두 안내해야 한다.

### 1-3. 서브에이전트·커맨드 부적합 (High)

| 항목 | 현재 | 문제 |
|---|---|---|
| `.claude/agents/` | **비어 있음** | Subagent 없음 |
| `.claude/commands/` | `fix-error`, `gitflow-commit`, `setup-env` (3개) | 모두 일반론. Next.js·Prisma·Gemini·HITL 관련 0건 |
| `.cursor/agents/` | `document-updater.md` (1개) | 일반적 |
| `.cursor/skills/` | 8개 (대부분 Cursor 표준) | FactoryAI 도메인(HITL/ERP Read-Only/Throttle) 0건 |
| `.gemini/agents/` | `readme-architect.md` (1개) | 일반론 |
| `.agents/skills/` | **비어 있음** (폴더만 존재) | Cross-tool 공유 자산 0건 |
| `.agents/workflows/` | `generate-agent-rule`, `generate-tasks-from-srs` (2개) | 메타-워크플로우, FactoryAI 전용 0건 |

### 1-4. 가이드 준수 위반 (Medium)

- **`README-claude-harness.md`**가 권장한 `.claude/skills/` 구조 미적용 → 여전히 구형 `.claude/commands/` 사용.
- **`README-common-harness.md`**가 권장한 `.agents/skills/` ↔ `.cursor/skills/` ↔ `.claude/skills/` **Symlink** 미적용.
- **`CLAUDE.md`와 `AGENTS.md`** 내용 중복(원래는 `AGENTS.md`가 공통, `CLAUDE.md`는 Claude 특화로 분리해야 함).
- **Cursor 룰의 `globs`**가 미설정(`globs:` 빈 값) → `alwaysApply: true`로만 강제 주입 → 토큰 낭비.

### 1-5. 도메인 안전장치 부재 (High — FactoryAI 특수)

SRS의 핵심 제약 사항이 harness 어디에도 반영돼 있지 않음:

| 제약 ID | 내용 | 현재 harness 반영 |
|---|---|---|
| CON-02 | ERP는 Read-Only만, Write 시스템 레벨 차단 | ❌ |
| CON-03 | AI 단독 실행 금지 (HITL 4대 원칙) | ❌ |
| CON-07 | Vercel Serverless 10초 한도 → PDF 등 무거운 작업은 클라이언트 | ❌ |
| CON-08 | LLM은 Gemini만, Vercel AI SDK 표준 인터페이스 | ❌ |
| CON-12 | Gemini Free Tier 15 RPM → In-memory Queue + Throttle ≤12 RPM | ❌ |
| ASM-02 | MVP에서 ERP는 Supabase 내 Mock 테이블 | ❌ |

---

## 2. 목표 (To-Be)

### 2-1. 설계 원칙

1. **단일 진실원본 (Single Source of Truth)**: 프로젝트 정체성·기술스택·핵심 제약사항은 `AGENTS.md` 한 곳에. 다른 파일은 이를 **참조**한다.
2. **도구별 강점 활용**: 공통 규칙은 `AGENTS.md`/`.agents/skills/`, 도구별 전용 기능(globs, hooks, subagents)은 각자 폴더에.
3. **온디맨드 우선**: `alwaysApply: true`는 최소화하고 가급적 **Skill**로 분리 → 토큰 최적화.
4. **도메인 안전장치 명시**: HITL, ERP Read-Only, Gemini Throttle 등 SRS 제약을 **자동 발동되는 Rule** 또는 **호출되는 Skill**로 인코딩.
5. **현실 우선**: 현재 Vite 랜딩페이지를 부정하지 않고 "Phase 0(현재) vs Phase 1(SRS 본 제품)" 분리 안내.

### 2-2. 최종 디렉토리 구조 (제안)

```text
my_RPA_AI_SaaS_app/
├── AGENTS.md                              # ★ 단일 진실원본 (전체 도구 공통)
├── CLAUDE.md                              # AGENTS.md 참조 + Claude 특화 라우팅
├── README-*-harness.md                    # (가이드, 수정 안 함)
│
├── .agents/                               # 공통 자산 (Antigravity 우선, 다른 도구는 Symlink)
│   ├── rules/
│   │   ├── 001-project-overview.md        # ★ FactoryAI 정체성 (alwaysApply)
│   │   ├── 002-tech-stack.md              # ★ Next.js + Supabase + Gemini + Prisma
│   │   ├── 003-development-guidelines.md  # ★ HITL/보안/성능 NFR
│   │   ├── 100-phase-routing.md           # NEW: 랜딩(Vite) vs 본제품(Next.js) 라우팅
│   │   ├── 200-typescript-react.md        # NEW: TS strict + RSC + Tailwind 패턴
│   │   ├── 301-prisma-schema.md           # NEW: Prisma + Supabase 모델 컨벤션
│   │   ├── 302-server-actions-api.md      # NEW: Server Actions / Route Handlers 패턴
│   │   ├── 303-gemini-ai-sdk.md           # NEW: Vercel AI SDK + Gemini Throttle
│   │   └── 304-shadcn-ui-tailwind.md      # NEW: shadcn/ui 사용 규칙
│   ├── skills/                            # ★ Cross-tool 공유 (.claude/.cursor에서 Symlink)
│   │   ├── 100-error-fixing/
│   │   ├── 101-fix-typecheck/             # NEW: tsc/eslint 일관 수정
│   │   ├── 200-gitflow-commit/            # 기존 .claude/commands에서 이전
│   │   ├── 201-conventional-commits/
│   │   ├── 202-pr-creation/
│   │   ├── 300-hitl-approval-guard/       # NEW: AI 결과는 HITL 승인 없이 발행 금지
│   │   ├── 301-erp-readonly-guard/        # NEW: ERP Write 차단 강제
│   │   ├── 302-gemini-throttle/           # NEW: ≤12 RPM Queue 패턴
│   │   ├── 303-client-side-pdf/           # NEW: 서버 10초 한도 회피
│   │   ├── 304-mock-erp-pattern/          # NEW: Supabase Mock ERP 테이블 사용법
│   │   ├── 400-srs-task-extraction/       # 기존 .agents/workflows에서 이전
│   │   └── 401-req-traceability/          # NEW: REQ-FUNC-NNN ↔ 코드 추적
│   └── workflows/                         # Antigravity 전용 매크로
│       ├── deploy-vercel.md               # NEW: Vercel 배포 절차
│       ├── prisma-migrate-dev.md          # NEW: 스키마 변경 절차
│       └── ciso-security-review.md        # NEW: CISO 보안 심의 동행 체크리스트
│
├── .claude/                               # Claude Code 전용
│   ├── agents/                            # ★ Subagent 신설
│   │   ├── nextjs-fullstack.md            # App Router + Server Actions 전문
│   │   ├── prisma-schema.md               # Prisma 스키마 + 마이그레이션
│   │   ├── vercel-ai-gemini.md            # Vercel AI SDK + Gemini 호출
│   │   ├── shadcn-ui-frontend.md          # shadcn/ui + Tailwind 컴포넌트
│   │   ├── security-reviewer.md           # CON-02/03 위반 탐지
│   │   └── nfr-test-author.md             # 성능/보안/가용성 테스트 작성
│   ├── skills/                            # ★ commands/ 폐기 후 신설 (Symlink to .agents/skills)
│   └── settings.local.json                # NEW: 권한·env 화이트리스트
│
├── .cursor/                               # Cursor 전용
│   ├── rules/                             # ★ globs 정밀화 (재작성)
│   │   ├── 001-project-overview.mdc       # alwaysApply: true
│   │   ├── 002-tech-stack.mdc             # alwaysApply: true
│   │   ├── 003-development-guidelines.mdc # alwaysApply: true
│   │   ├── 200-tsx-components.mdc         # globs: src/**/*.tsx
│   │   ├── 301-prisma.mdc                 # globs: prisma/**/*, **/*.prisma
│   │   ├── 302-server-actions.mdc         # globs: app/**/actions.ts, app/api/**/route.ts
│   │   └── 303-ai-sdk-routes.mdc          # globs: app/api/v1/**, lib/ai/**
│   ├── agents/                            # 신설
│   │   ├── nextjs-fullstack.md
│   │   ├── security-reviewer.md
│   │   └── document-updater.md            # 기존 유지 + 갱신
│   ├── skills/                            # ★ Symlink to .agents/skills
│   └── hooks.json                         # NEW: Prisma migrate 전후 검증
│
├── .gemini/                               # Gemini CLI 전용
│   └── agents/                            # ★ Hub-and-Spoke 신설
│       ├── nextjs-fullstack.md            # tools: read_file, write_file, edit, run_shell_command
│       ├── prisma-schema.md
│       ├── vercel-ai-gemini.md
│       ├── security-reviewer.md           # tools: read_file, grep_search (읽기 전용)
│       └── readme-architect.md            # 기존 유지
│
└── docs/
    └── HARNESS_REDESIGN_PLAN.md           # 본 문서
```

### 2-3. 콘텐츠 표준

#### AGENTS.md (전면 재작성)

섹션 구성:
1. **Project Identity** — FactoryAI 한 문장 정의 + 해결하는 문제(2차 자동화 공백 75.5%)
2. **MVP Scope (SRS v0.8 in-scope만)** — E1~E7 + SVC-1~5, 출시 가드레일
3. **Tech Stack** — Next.js 15 / Supabase / Prisma / Vercel AI SDK + Gemini / NextAuth.js v5
4. **Critical Constraints (CON-01 ~ CON-12)** — 위반 시 거부 조건
5. **HITL 4대 원칙** (CON-03 / PRD §3-C)
6. **Performance NFR** — Wizard <800ms p95, PDF 클라이언트 처리 (CON-07)
7. **Project Phases** — Phase 0 (랜딩, Vite) vs Phase 1 (본제품, Next.js)
8. **Routing to Tool-specific Files** — Cursor/Claude/Gemini로의 가이드 포인터

#### CLAUDE.md (간소화)

- `AGENTS.md`를 “읽고 항상 적용”하라는 1줄 + Claude 특화 Subagent/Skill 라우팅 표.

#### .agents/rules/* (Antigravity Workspace Rules)

- `alwaysApply: true`는 001/002/003만.
- 나머지는 `globs:` 패턴으로 정밀 발동.

#### .agents/skills/* + Symlinks

- 모든 skill은 `name`, `description`, (선택) `disable-model-invocation` 프론트매터 표준 준수.
- `.cursor/skills`와 `.claude/skills`는 **PowerShell `New-Item -ItemType SymbolicLink`** (Windows 환경)로 `.agents/skills` 가리키도록 생성. (관리자 권한 필요 시 Junction 대안 안내)

---

## 3. 실행 단계 (Step-by-Step Plan)

### Phase A: Foundation (재작성) — 1세션 가능

| # | 작업 | 산출물 | 위험도 |
|---|---|---|---|
| A1 | `AGENTS.md` 전면 재작성 | 단일 진실원본 | 낮음 |
| A2 | `CLAUDE.md` 간소화 (AGENTS.md 참조형) | Claude 특화 라우팅 | 낮음 |
| A3 | `.agents/rules/001-003` 재작성 (FactoryAI 정체성) | 3 파일 | 낮음 |
| A4 | `.cursor/rules/001-003.mdc` 재작성 | 3 파일 | 낮음 |
| A5 | 잘못된 placeholder/이전 프로젝트 흔적 제거 | — | 낮음 |

### Phase B: Domain Skills (신규 작성) — 1세션 가능

| # | 작업 | 산출물 | 위험도 |
|---|---|---|---|
| B1 | `.agents/skills/300-hitl-approval-guard/SKILL.md` | HITL 강제 절차 | 낮음 |
| B2 | `.agents/skills/301-erp-readonly-guard/SKILL.md` | ERP Write 차단 | 낮음 |
| B3 | `.agents/skills/302-gemini-throttle/SKILL.md` | Queue + Backoff 패턴 | 낮음 |
| B4 | `.agents/skills/303-client-side-pdf/SKILL.md` | 클라 PDF 가이드 | 낮음 |
| B5 | `.agents/skills/304-mock-erp-pattern/SKILL.md` | Mock 테이블 패턴 | 낮음 |
| B6 | 기존 `.claude/commands/*` → `.agents/skills/`로 이전·표준화 | 3 skill | 낮음 |

### Phase C: Subagents (도구별) — 1세션 가능

| # | 작업 | 산출물 | 위험도 |
|---|---|---|---|
| C1 | `.claude/agents/*` 6개 신설 | Next.js/Prisma/AI/UI/Security/NFR | 낮음 |
| C2 | `.cursor/agents/*` 3개 신설/갱신 | Cursor 특화 페르소나 | 낮음 |
| C3 | `.gemini/agents/*` 4개 신설 (`tools` 명시 + `model: inherit`) | Hub-and-Spoke | 낮음 |

### Phase D: Tech-specific Rules (globs) — 1세션 가능

| # | 작업 | 산출물 | 위험도 |
|---|---|---|---|
| D1 | `.agents/rules/100-phase-routing.md` (Phase 0 vs Phase 1 안내) | 1 파일 | 낮음 |
| D2 | `.agents/rules/200-typescript-react.md` (globs) | 1 파일 | 낮음 |
| D3 | `.agents/rules/301-prisma-schema.md` | 1 파일 | 낮음 |
| D4 | `.agents/rules/302-server-actions-api.md` | 1 파일 | 낮음 |
| D5 | `.agents/rules/303-gemini-ai-sdk.md` | 1 파일 | 낮음 |
| D6 | `.agents/rules/304-shadcn-ui-tailwind.md` | 1 파일 | 낮음 |
| D7 | `.cursor/rules/200-303.mdc` 매핑 (globs 정밀화) | 4 파일 | 낮음 |

### Phase E: Workflows + Settings — 1세션 가능

| # | 작업 | 산출물 | 위험도 |
|---|---|---|---|
| E1 | `.agents/workflows/deploy-vercel.md` | Vercel 배포 매크로 | 낮음 |
| E2 | `.agents/workflows/prisma-migrate-dev.md` | 마이그레이션 매크로 | 낮음 |
| E3 | `.agents/workflows/ciso-security-review.md` | CISO 체크리스트 | 낮음 |
| E4 | `.claude/settings.local.json` 신설 (권한 화이트리스트) | 1 파일 | 중간 (사용자 확인) |
| E5 | `.cursor/hooks.json` 신설 (Prisma migrate 가드) | 1 파일 + 스크립트 | 중간 |

### Phase F: Cross-tool Wiring — 1세션 가능

| # | 작업 | 산출물 | 위험도 |
|---|---|---|---|
| F1 | `.claude/skills/` ↔ `.agents/skills/` Symlink (Windows) | Symlink 또는 Junction | **중간** — Windows 권한 이슈 가능 |
| F2 | `.cursor/skills/` 통합 (현재 8개 → `.agents/skills/` 이관 후 Symlink) | — | 중간 — 기존 8개 검토 필요 |
| F3 | 기존 `.claude/commands/` 정리 (이전 완료 후 archive 또는 삭제) | — | 사용자 확인 필요 |
| F4 | 정합성 검증: 모든 Rule/Skill cross-reference 동작 확인 | 검증 로그 | 낮음 |

---

## 4. 결정이 필요한 사항 (User Approval Required)

> 사용자가 "본격 개발 돌입 가능한 완성본"을 요구했으므로, 가급적 합리적 기본값을 채택하되 아래 3건은 영향이 커 명시 동의 권장.

### Q1. Phase 0 / Phase 1 동시 지원 방식
- **A안 (권장)**: 현재 `src/` (Vite 랜딩페이지)는 유지하고 `app/` 폴더에 Next.js 본제품을 신설하는 **모노레포 내 이중 구조**. Harness는 `globs`로 두 단계 모두 지원.
- **B안**: SRS 대로 Vite → Next.js 단일 전환(랜딩페이지도 Next.js로 마이그레이션).
- **C안**: 본 계획서는 Phase 1(Next.js)만 다루고 Phase 0는 별도 처리.

### Q2. Symlink 생성 방법 (Windows)
- **A안 (권장)**: PowerShell `New-Item -ItemType SymbolicLink` (개발자 모드 활성 또는 관리자 권한 필요).
- **B안**: Junction(`mklink /J`) — 일반 권한 OK, 단 디렉토리만 가능.
- **C안**: Symlink 포기 → 각 폴더에 동일 SKILL.md 복사본 유지(중복 발생).

### Q3. 기존 `.claude/commands/` 처리
- **A안 (권장)**: `.agents/skills/`로 이전 후 commands 폴더 archive 또는 삭제.
- **B안**: commands 폴더 유지(legacy 호환).

---

## 5. 산출물 수량 추정

| 카테고리 | 신규 | 수정 | 삭제·이전 | 합 |
|---|---:|---:|---:|---:|
| 루트 문서 (`AGENTS.md`, `CLAUDE.md`) | 0 | 2 | 0 | 2 |
| `.agents/rules/` | 7 | 3 | 0 | 10 |
| `.agents/skills/` | 12 | 0 | 0 | 12 |
| `.agents/workflows/` | 3 | 0 | 0 | 3 |
| `.claude/agents/` | 6 | 0 | 0 | 6 |
| `.claude/skills/` | (symlink) | 0 | 0 | — |
| `.claude/commands/` | 0 | 0 | 3 | 3 |
| `.claude/settings.local.json` | 1 | 0 | 0 | 1 |
| `.cursor/rules/` | 4 | 3 | 0 | 7 |
| `.cursor/agents/` | 2 | 1 | 0 | 3 |
| `.cursor/skills/` | (symlink) | — | 8 (이전) | — |
| `.cursor/hooks.json` | 1 | 0 | 0 | 1 |
| `.gemini/agents/` | 4 | 0 | 0 | 4 |
| **합계** | **40** | **9** | **11** | **52** |

---

## 6. 검증 기준 (Definition of Done)

- [ ] 모든 harness 파일에서 “FactoryAI”/“Next.js”/“Supabase”/“Gemini”/“Prisma”가 일관되게 사용된다.
- [ ] “Spring Boot”/“Java”/“MySQL”/“Flutter”/“OpenAI”/“Kafka”/“Redis” 잔재 0건.
- [ ] `[PROJECT NAME]`/`[Description]` 같은 미작성 placeholder 0건.
- [ ] `AGENTS.md`에 SRS의 CON-01~12 및 HITL 4대 원칙이 명시되어 있다.
- [ ] 각 도구(Claude/Cursor/Gemini) 폴더에 동일 도메인 Subagent가 최소 1쌍씩 존재한다.
- [ ] Cursor `.mdc` 파일 모두에 적절한 `globs` 또는 `alwaysApply: true`가 설정돼 있다.
- [ ] `.gemini/agents/*.md`는 모두 `model: inherit` 및 `tools:` 명시.
- [ ] 사용자가 `/fix-error`, `/gitflow-commit` 등 기존 명령을 Claude Code에서도 호출 가능(이전 후).
- [ ] 본 계획서가 `docs/HARNESS_REDESIGN_PLAN.md`에 보존되어 향후 회고 가능.

---

## 7. 단계별 승인 흐름 (제안)

1. 사용자 → 본 계획서 검토 후 Q1/Q2/Q3 답변.
2. Claude → Phase A 실행 → diff 보고.
3. 사용자 → Phase A 승인 → Phase B 진행 지시.
4. 이후 Phase C~F를 같은 패턴으로 반복.

> 한 번에 모두 진행을 원하면 “Phase A~F 일괄 진행” 지시 시 즉시 일괄 실행 가능. 단, 산출물 40여 개라 검토 부담이 큼.
