# CLAUDE.md — FactoryAI (Claude Code 진입 컨텍스트)

이 파일은 Claude Code 세션 시작 시 자동 로드되는 시스템 프롬프트입니다. **크로스툴 공통 규칙은 [`AGENTS.md`](AGENTS.md)에 정의**되어 있으며, 본 파일은 Claude Code 사용자가 추가로 알아야 할 사항만 담습니다.

> **⚠️ 중요**: [`AGENTS.md`](AGENTS.md) §3 의 절대 규칙(HITL, Read-Only ERP, Rate Limit, 무료 티어, RBAC)은 본 파일에서 반복하지 않지만 **항상 강제 적용**됩니다.

---

## 1. 빠른 진입점

| 필요한 작업 | 참조 위치 |
|---|---|
| 프로젝트 비전·핵심 KPI | [`docs/1_RPD_V_1.0.md`](docs/1_RPD_V_1.0.md) PRD v7.0 §1 |
| 기능 요구사항(Epic/Story) | [`docs/2_SRS_V_1.0.md`](docs/2_SRS_V_1.0.md) SRS v0.8 §4 |
| 외부 시스템 인터페이스 | SRS §3.1 EXT-01~09 |
| 제약사항(CON-01~12) | SRS §1.2.3 |
| 데이터 모델 | SRS §6 |
| 보안·NFR | SRS §5 |
| 글로벌 룰 | [`AGENTS.md`](AGENTS.md) §3 |
| 도구 가이드 | [`README-claude-harness.md`](README-claude-harness.md) |

---

## 2. Subagent 라우팅

작업 성격에 맞는 서브에이전트가 자동 위임됩니다. 수동 호출: `> use the <agent-name> subagent`.

| 에이전트 | 사용 시점 |
|---|---|
| [`nextjs-frontend`](.claude/agents/nextjs-frontend.md) | UI 컴포넌트, 페이지, Server/Client Component, shadcn/ui, Tailwind |
| [`nextjs-backend`](.claude/agents/nextjs-backend.md) | Server Action, Route Handler, 비즈니스 로직, `lib/` 유틸 |
| [`database`](.claude/agents/database.md) | Prisma schema, migration, Supabase, Mock ERP 테이블 |
| [`ai-integration`](.claude/agents/ai-integration.md) | Vercel AI SDK, Gemini 호출, Rate Limit, XAI 설명 생성 |
| [`pdf-client`](.claude/agents/pdf-client.md) | 클라이언트 사이드 PDF 생성 (`@react-pdf/renderer`, `window.print()`) |

---

## 3. Skills (총 24개 — 구 commands 폐기 → Skills 통합)

> `.claude/skills/`는 `.agents/skills/`에 대한 Junction(심볼릭 링크). `.agents/skills/`에 작성한 SKILL.md를 Claude Code가 동일하게 인식.

### 3-1. 자동 발동 (Auto) — 좁은 트리거 (파일 경로 globs + 1~2 도메인 키워드)

| Skill | 발동 트리거 |
|---|---|
| `100-error-fixing-process` | 에러/스택트레이스/빌드 실패 보고 |
| `102-fix-typecheck` | tsc/eslint 오류 |
| `300-nextjs-app-router-rules` | `app/**` 작업 (Server/Client 경계, 캐싱) |
| `301-erp-readonly-guard` | ERP 모델 접근 코드 |
| `302-gemini-throttle` / `305-vercel-ai-sdk-rules` | Gemini API 호출 코드 |
| `303-client-side-pdf` | PDF 생성/리포트 (백엔드 부담 완화 전략) |
| `304-mock-erp-pattern` | Mock ERP 시드/조회 |
| `306-hitl-safety-rules` | AI 결과 저장 코드 |
| **`310-server-action-patterns`** | `app/**/actions.ts` 또는 `'use server'` |
| **`311-route-handler-patterns`** | `app/api/**/route.ts` |
| **`312-rbac-guard`** | `lib/rbac.ts`, `requireRole|requireAuth|hasRole` |
| **`313-audit-log-helper`** | `lib/audit.ts`, `logAction\|auditLog\.create` |
| **`314-nextauth-v5-setup`** | `auth.ts`, `middleware.ts`, `app/api/auth/**`, `signIn\|signOut\|useSession` |
| **`315-api-error-handling`** | `lib/errors.ts`, `apiError\|AppError\|ValidationError` |
| **`316-file-upload-excel`** | `app/api/**/import/**`, `lib/excel/**`, `xlsx\|papaparse` |
| **`317-background-jobs`** | `app/api/cron/**`, `vercel.json`, `lib/jobs/**`, `cron\|idempotency` |
| **`318-prisma-transactions`** | `prisma\.\$transaction`, `isolationLevel` |
| **`319-user-rate-limiting`** | `lib/rate-limit.ts`, `Ratelimit\|rateLimit` |

### 3-2. 수동 호출 (Slash Commands)

| Skill | 사용 |
|---|---|
| `/101-build-and-env-setup` | 로컬 환경 셋업, .env, Prisma 초기화 |
| `/200-git-commit-pr` | Git Flow 커밋 + Draft PR 자동화 |
| `/202-github-issue-handling` | GitHub Issue/Project gh CLI 일괄 처리 |
| `/400-srs-task-extraction` | SRS REQ → 개발 Task 변환 |
| `/401-req-traceability` | REQ ↔ 코드/테스트/PR 추적 |

### 3-3. 백엔드 작업 시 우선 참조 (이 순서로 시작)
1. `300-nextjs-app-router-rules` §0 Backend-only Quick Reference (지도)
2. `310-server-action-patterns` 또는 `311-route-handler-patterns` (골격)
3. `312-rbac-guard` + `313-audit-log-helper` (가드 + 감사)
4. `315-api-error-handling` (에러 envelope)
5. 필요 시 `316~319` (Upload/Cron/Transactions/RateLimit)

---

## 4. 작업 흐름 (Working Style)

1. **요구 파악**: SRS §4 (FR-XXX)를 먼저 검색해 해당 요구사항 ID를 인용한 뒤 시작.
2. **계획 → 실행**: 3단계 이상이면 TodoWrite 사용. 단순 작업은 바로 실행.
3. **검증**: 변경 후 `npm run lint`, `npm run typecheck` (있다면 `npm test`). UI 변경 시 `npm run dev`로 브라우저 확인.
4. **커밋**: 사용자 명시 요청이 있을 때만. Conventional Commits.
5. **HITL 강제**: AI 출력은 항상 사용자 검토 단계가 들어가도록 UI/Flow 구성.

---

## 5. 자주 쓰는 명령

```bash
npm run dev         # Vite dev server (현재 포트 3000 — Next.js 이전 후 변경 가능)
npm run build       # 프로덕션 빌드
npm run lint        # ESLint
```

> **참고**: 본 저장소는 현재 Vite + React로 시작되어 있으나, SRS v0.8 기준 **Next.js App Router 단일 모놀리스**로 마이그레이션해야 합니다. 마이그레이션 작업 시 `nextjs-frontend` + `nextjs-backend` 에이전트를 활용하십시오.

---

## 6. 컨텍스트 사용 우선순위

Claude Code가 모호한 상황에서 결정을 내릴 때 따를 우선순위:

1. **SRS 제약(CON-01~12)** — 절대 위반 불가
2. **AGENTS.md §3 절대 규칙** — HITL·Read-Only·Rate Limit·무료 티어·RBAC
3. **PRD/SRS 본문** — 비즈니스 정합성
4. **본 파일 §4 작업 흐름**
5. **일반 베스트 프랙티스** — 마지막 우선순위
