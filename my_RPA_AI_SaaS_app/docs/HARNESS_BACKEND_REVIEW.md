# Harness 백엔드 적합성 검토 + 보완 제안서

**작성일**: 2026-05-16
**대상**: `.agents/skills/` (`.cursor/skills/`, `.claude/skills/`에 Junction으로 노출되는 14개 skill)
**기준 스택**: SRS v0.8 — Next.js 15 App Router (Server Actions / Route Handlers) + Prisma + Supabase + NextAuth.js v5 + Vercel AI SDK + Gemini
**원천 문서**: [`docs/2_SRS_V_1.0.md`](2_SRS_V_1.0.md), [`AGENTS.md`](../AGENTS.md)

---

## 0. 한 줄 요약

현재 14개 skill 중 **백엔드 부적합으로 인한 삭제 0건, 표기 명확화 수정 4건, 신규 추가 권장 6건** (총 20개로 확장). FactoryAI는 Next.js 풀스택 모놀리스 (CON-01/11)이므로 "백엔드"는 별도 서버가 아닌 **Server Actions + Route Handlers + lib/ + prisma/ + middleware** 영역을 의미한다. 현재 skill은 도메인 안전장치(HITL/ERP/AI Throttle)는 강력하지만 **백엔드 기본기**(인증, RBAC 가드 구현, 감사 로그 헬퍼, API 에러 표준, 파일 업로드, 백그라운드 잡)가 누락되어 있다.

---

## 1. 본 검토에서 "백엔드"의 정의

FactoryAI는 CON-01 / CON-11에 의해 별도 백엔드 서버가 없는 **Next.js 풀스택 모놀리스**다. 따라서 본 검토에서 "백엔드"는 다음 영역을 가리킨다:

### IN-Scope (백엔드)
- `app/**/actions.ts` — **Server Actions**
- `app/api/v1/**/route.ts` — **Route Handlers**
- `lib/prisma.ts`, `lib/db.ts` — DB 클라이언트
- `lib/erp/**` — ERP 미들웨어 + 조회 헬퍼
- `lib/ai/**` — Gemini 호출 큐, XAI, 멀티모달
- `lib/rbac.ts`, `lib/auth.ts` — 인증·인가
- `lib/audit.ts` — 감사 로그 헬퍼
- `lib/schemas/**` — Zod 입력 검증
- `lib/errors.ts` — 에러 클래스·envelope
- `prisma/schema.prisma`, `prisma/migrations/`, `prisma/seed.ts`
- `middleware.ts` (Next.js) — 인증·RBAC 라우팅
- `tests/nfr/security/**`, `tests/nfr/perf/**` (백엔드 NFR)
- Vercel Cron, Edge Functions (Phase 2)

### OUT-of-Scope (프론트엔드/UI)
- `components/**` (React 컴포넌트)
- `app/(group)/page.tsx` 중 UI 렌더링 부분 (단, 데이터 페칭은 백엔드)
- Tailwind/shadcn 스타일링
- 클라이언트 사이드 PDF (의도적 클라이언트 전략 — CON-07)

---

## 2. 기존 14개 Skill 백엔드 적합성 매트릭스

| # | Skill | 백엔드 관련도 | 적합성 평가 | 권장 조치 |
|---|---|:---:|---|---|
| 1 | `100-error-fixing-process` | 🟢 90% | 백엔드 디버깅 섹션 풍부 (Vercel, Prisma, Gemini, HITL) | **유지** |
| 2 | `101-build-and-env-setup` | 🟢 90% | DB·Auth·AI 환경변수 + Prisma migration 포함 | **유지** |
| 3 | `102-fix-typecheck` | 🟡 70% | 일반 TS. 백엔드 특화 예시 1개 (Prisma GetPayload) | **유지** |
| 4 | `200-git-commit-pr` | 🟡 60% | 일반 Git. PR 체크리스트에 백엔드 룰(RBAC/HITL) 포함 | **유지** |
| 5 | `202-github-issue-handling` | ⚪ 20% | 일반 GitHub CLI. 백엔드와 직접 연관 없음 | **유지** (필요 시 호출) |
| 6 | `300-nextjs-app-router-rules` | 🟢 80% | Server/Client 경계, Server Action, Route Handler, 캐싱 — 백엔드 핵심 | **수정**: 백엔드 섹션 강조 분리 |
| 7 | `301-erp-readonly-guard` | 🟢 100% | 순수 백엔드 (Prisma middleware, DB user 권한) | **유지** |
| 8 | `302-gemini-throttle` | 🟢 95% | 서버 측 In-memory Queue. 일부 UI 진행률 예시(5%) | **유지** |
| 9 | `303-client-side-pdf` | 🔴 0% | **의도적 프론트엔드** (CON-07로 백엔드 부담 회피) | **수정**: "백엔드 부담 완화 전략" 명시 |
| 10 | `304-mock-erp-pattern` | 🟢 100% | Prisma schema + seed + 쿼리 — 순수 백엔드 | **유지** |
| 11 | `305-vercel-ai-sdk-rules` | 🟢 90% | Vercel AI SDK 서버 호출. 일부 스트리밍 UX | **유지** |
| 12 | `306-hitl-safety-rules` | 🟢 85% | 백엔드 패턴 + UI 컴포넌트 예시 1개(15%) | **수정**: UI 예시 분리/축소 |
| 13 | `400-srs-task-extraction` | 🟡 50% | 워크플로우. API/DTO/DB 분해 단계는 백엔드 | **유지** |
| 14 | `401-req-traceability` | 🟡 50% | 워크플로우. `@req` 주석 + 추적 매트릭스 | **유지** |

**평가 요약**:
- **삭제 대상: 0건** (현재 14개 모두 직간접 백엔드 가치 있음)
- **수정 대상: 4건** (300, 303, 306 — 백엔드 관점 명확화 / 추가로 102, 200은 백엔드 예시 보강)
- **백엔드 관점에서 결정적 불일치를 가진 skill 없음** — 도메인 안전장치 영역은 오히려 매우 강함

---

## 3. 백엔드 누락 영역 분석 (GAP)

도메인 안전장치(HITL/ERP/AI Throttle)는 풍부하지만, **백엔드 엔지니어가 매일 쓰는 기본기**가 다수 누락되어 있다. SRS REQ-FUNC를 구현하려면 다음이 필요하다:

### Critical Gaps (즉시 보완 권장)

| ID | 영역 | 왜 필요한가 | 관련 SRS |
|---|---|---|---|
| **G1** | **Server Action 표준 패턴** | CON-11 — 모든 mutation의 표준 입출력 형식. 현재 산발적으로만 언급 | REQ-FUNC-001~027 전반 |
| **G2** | **Route Handler 표준 패턴** | 외부 webhook, 파일 download, 표준 REST 인터페이스 | REQ-FUNC-019 (ERP sync), REQ-FUNC-020 (Excel) |
| **G3** | **RBAC Guard 구현 표준** | `lib/rbac.ts`의 `requireRole` 구현 + 5역할 매핑. 현재는 호출만 언급, 구현 없음 | SRS §5-3, REQ-NF-004 |
| **G4** | **Audit Log Helper** | `lib/audit.ts` 표준 — `auditLog.create()` 반복 코드를 헬퍼화 (DRY) | R4, REQ-FUNC-003 |
| **G5** | **NextAuth.js v5 셋업** | 인증 자체가 0건 정의됨 — Provider, session 전략, middleware, JWT | SRS §5-3, REQ-FUNC-024 |
| **G6** | **API Error Envelope** | 일관된 에러 응답 형식 (`{ error: {code, message, details} }`). 현재 ad-hoc | REQ-NF-004 |

### Important Gaps (Phase 1 안에 추가 권장)

| ID | 영역 | 사유 | 관련 SRS |
|---|---|---|---|
| **G7** | **파일 업로드 (Excel)** | E3의 핵심 — 엑셀 드래그&드롭 파싱·적재 (≥95% 성공률, ≤30초/파일) | REQ-FUNC-020, REQ-FUNC-023 |
| **G8** | **백그라운드 작업 / Cron** | AI 정확도 모니터(`checkAIHealth`), ERP 5분 배치 동기화 | REQ-FUNC-019 (5분 Batch), CON-03 ② |
| **G9** | **Prisma Transaction & 일관성** | Lot 병합, 다중 테이블 업데이트의 원자성 | REQ-FUNC-009 (Lot 병합 ≥99%) |
| **G10** | **Rate Limit (사용자 측)** | Gemini 큐와 별개. 인증 시도·API 남용 방어 | REQ-NF-004 |

### Nice-to-Have (Phase 2 또는 필요 시)

| ID | 영역 |
|---|---|
| G11 | API 버전 관리 (`v1` → `v2` 마이그레이션 전략) |
| G12 | 캐싱 전략 심화 (Next.js fetch cache, `unstable_cache`, `revalidateTag`) |
| G13 | OpenTelemetry / 분산 트레이싱 (PROD) |
| G14 | OpenAPI 자동 생성 (Zod → OpenAPI) |

---

## 4. 구체적 제안

### 4-1. 수정 (Modify) — 4건

#### M1. `300-nextjs-app-router-rules` 백엔드 섹션 명확화
- **현재**: Server/Client 섞여 있어 백엔드 dev가 빠르게 참고하기 어려움
- **수정안**:
  - §1 결정 트리는 그대로 유지
  - **새 §3 "Backend-only Quick Reference"** 추가: Server Action 골격, Route Handler 골격, 에러 처리, `revalidate*` 정리
  - §6 캐싱 전략을 더 깊이 (현재 표만 있음 → `unstable_cache`, `cache()` 예시 추가)

#### M2. `303-client-side-pdf` 백엔드 관점 주석 추가
- **현재**: 프론트엔드 전용 가이드
- **수정안**: 상단에 "**왜 이 skill이 존재하는가**" 1단락 추가:
  > "이 skill은 **백엔드 부담을 완화하는 전략**이다. Vercel Serverless 10초 한도(CON-07)를 회피하기 위해 PDF 생성을 클라이언트로 이전한다. 백엔드 dev는 PDF 데이터 추출 API만 구현하고, 렌더링은 클라이언트가 담당한다는 분업을 명확히 인지해야 한다."

#### M3. `306-hitl-safety-rules` UI 예시 분리
- **현재**: §143-184 행에 `<SuggestionCard />` React 컴포넌트 예시 (UI)
- **수정안**: 해당 UI 예시 블록을 축소하고 "프론트엔드 표시 가이드는 `.claude/agents/nextjs-frontend.md` 참조"로 위임. 백엔드 dev는 데이터 계약(JSON 구조)만 보면 충분.

#### M4. `102-fix-typecheck` 백엔드 예시 보강
- **현재**: 일반 TS + Zod + Prisma `GetPayload` 한 줄
- **수정안**: 백엔드 자주 만나는 케이스 추가:
  - `NextRequest` / `NextResponse` 타입
  - `Prisma.JsonValue` 다루기
  - Server Action FormData parsing
  - NextAuth v5 `Session` 확장

### 4-2. 추가 (Add) — 6건 (Critical Gaps G1~G6)

#### A1. `310-server-action-patterns` (NEW)
- **목적**: Server Action 표준 골격, FormData 파싱, return 형식, revalidate, error throwing.
- **자동 발동**: `app/**/actions.ts` 작성 시
- **포함 내용**:
  - `'use server'` 표준 골격 (RBAC + Zod + audit_log 짝)
  - `useFormState` / `useFormStatus` 연동 형식
  - `ActionResult<T>` 표준 반환 타입 (`{ ok: true, data } | { ok: false, error }`)
  - Optimistic update 패턴 (`useOptimistic`)
  - 일반 에러 → 한국어 메시지 + 영문 로그
  - 트랜잭션이 필요한 경우 `prisma.$transaction([...])` 패턴

#### A2. `311-route-handler-patterns` (NEW)
- **목적**: Route Handler 사용 시점·표준 패턴.
- **자동 발동**: `app/api/v1/**/route.ts` 작성 시
- **포함 내용**:
  - Server Action vs Route Handler 결정 기준
  - 표준 골격 (GET/POST/PATCH/DELETE)
  - `NextRequest` 사용 (cookies, headers, URL params)
  - 응답 표준: `NextResponse.json(data, { status })` + error envelope
  - 외부 webhook 검증 (HMAC, IP allowlist)
  - File response (CSV export 등)
  - `dynamic = 'force-dynamic'` vs ISR 결정
  - CORS (기본 same-origin, 필요 시 명시적 허용)

#### A3. `312-rbac-guard` (NEW)
- **목적**: RBAC 구현 표준. `lib/rbac.ts` 코드 + 사용 패턴.
- **자동 발동**: 인증·인가·세션 키워드 포함 시
- **포함 내용**:
  - 5역할 정의 (`ADMIN | OPERATOR | QC | CISO | VIEWER`)
  - `lib/rbac.ts` 구현 (`requireRole`, `requireAuth`, `hasRole`, `assertRole`)
  - 역할 × 자원 매트릭스 (Server Action별 허용 역할)
  - 위반 시 동작 (`ForbiddenError` throw → `error.tsx` 또는 `NextResponse.json({error}, {status:403})`)
  - `middleware.ts`에서 라우트 단위 가드 (선택)
  - 테스트 패턴 (mock session, fixture)

#### A4. `313-audit-log-helper` (NEW)
- **목적**: 모든 mutation 후 audit_log 기록을 헬퍼화.
- **자동 발동**: mutation/Prisma write 키워드 포함 시
- **포함 내용**:
  - `lib/audit.ts` 헬퍼 (`logAction({actor, action, target, before, after, confidence?})`)
  - Actor 표기 표준 (`user-<id>`, `ai-<model>-<version>`, `system-<job>`)
  - Action enum (`CREATE | UPDATE | DELETE | APPROVE | REJECT | AUTO_FLAG | ERP_SYNC | LOGIN | LOGOUT`)
  - `before/after` JSON 직렬화 (PII 마스킹)
  - 90일 retention → cold storage 이전 스크립트 골격
  - Export 헬퍼 (CSV/JSON for CISO audit)

#### A5. `314-nextauth-v5-setup` (NEW)
- **목적**: NextAuth.js v5 (Auth.js) 초기 셋업 + 일반 작업 패턴.
- **자동 발동**: 로그인/세션/인증 키워드 포함 시
- **포함 내용**:
  - `auth.ts` 설정 (Providers, callbacks, jwt, session)
  - `middleware.ts` 통합 (`export { auth as middleware }`)
  - Server Component에서 `await auth()` 패턴
  - Client Component에서 `useSession` 패턴
  - 역할(role)을 JWT/Session에 주입
  - Credentials Provider (MVP) → OAuth Provider (Phase 2)
  - 비밀번호 해시 (bcrypt/argon2)
  - 세션 만료·갱신 정책
  - 로그인/로그아웃 audit_log 연동

#### A6. `315-api-error-handling` (NEW)
- **목적**: 일관된 에러 처리·응답·로깅 표준.
- **자동 발동**: try/catch, throw, error 키워드 포함 시
- **포함 내용**:
  - 에러 분류 (`AppError` 베이스 + `ValidationError`, `ForbiddenError`, `NotFoundError`, `RateLimitError`, `AiError`)
  - 에러 응답 envelope `{ error: { code: string, message: string, details?: any } }`
  - HTTP status mapping (400/401/403/404/429/500/503)
  - 한국어 사용자 메시지 + 영문 로그 분리
  - 에러 boundary (`error.tsx`, `global-error.tsx`)
  - Sentry 통합 (Phase 2)
  - HITL 위반 같은 critical 에러는 즉시 페이지

### 4-3. 추가 (Add) — Important Gaps G7~G10

#### A7. `316-file-upload-excel` (NEW)
- **목적**: REQ-FUNC-020 — Excel/CSV 드래그&드롭 파싱·적재.
- **자동 발동**: `multipart/form-data`, `xlsx`, `csv`, `upload`, `import` 키워드
- **포함 내용**:
  - Server Action `FormData.get('file')` → `File` 처리
  - 라이브러리 선택 (`xlsx` vs `exceljs` vs `papaparse`)
  - 사이즈 한도 (≤10MB), MIME 검증, 인코딩 (UTF-8 BOM 처리)
  - 스트리밍 파싱 (메모리 절약)
  - Prisma bulk insert (`createMany` + chunk)
  - 실패 행 리포트 (사용자에게 어느 행이 왜 실패했는지)
  - 50MB 초과/비표준 인코딩 거부 (REQ-FUNC-023, ≤3초 응답)

#### A8. `317-background-jobs` (NEW)
- **목적**: AI 정확도 모니터 자동 실행, ERP 5분 배치, 대시보드 발행 등 백그라운드 작업.
- **자동 발동**: `cron`, `schedule`, `background`, `job`, `queue` 키워드
- **포함 내용**:
  - **Vercel Cron** (MVP) — `vercel.json` 또는 `app/api/cron/*/route.ts` + `CRON_SECRET`
  - 표준 cron 패턴: `0 */5 * * * *` (5분), `0 0 * * *` (자정)
  - **Supabase Edge Functions** (대안) — 더 무거운 작업
  - **In-memory queue 한계**: serverless에서 인스턴스 분산 → Upstash Redis 권장 (Phase 2)
  - 작업 멱등성 보장 (중복 실행 방지 + `idempotency_key`)
  - 작업 결과를 `system_jobs` 테이블에 기록 (start/end/status)
  - 실패 알림 (Sentry → CISO/COO)

#### A9. `318-prisma-transactions` (NEW)
- **목적**: 다중 테이블 변경의 원자성·일관성.
- **자동 발동**: 두 개 이상 Prisma write 동시 호출 시
- **포함 내용**:
  - `$transaction([...])` 배치 트랜잭션
  - `$transaction(async (tx) => {...})` 인터랙티브 트랜잭션
  - Isolation level (PostgreSQL: `Serializable` for Lot 병합)
  - 트랜잭션 타임아웃 설정 (Vercel 10초 고려)
  - 외부 호출(AI, 이메일)은 트랜잭션 밖으로
  - audit_log는 트랜잭션 안에 포함 (원자성)
  - rollback 시 `revalidatePath` 호출 안 함
  - 데드락 회피 (테이블 잠금 순서 일관)

#### A10. `319-user-rate-limiting` (NEW)
- **목적**: Gemini 큐와 별개로, 사용자/IP별 API 호출 제한 (남용 방어).
- **자동 발동**: API endpoint, login, brute-force 관련 작업 시
- **포함 내용**:
  - **Upstash Ratelimit** (또는 자체 구현)
  - 시나리오별 한도:
    - 로그인 시도: 5회/15분/IP
    - 회원가입: 3회/시간/IP
    - 일반 API: 100회/분/user
    - AI 호출: Gemini 큐가 이미 처리 (사용자별 추가 한도는 PoC 후)
  - 초과 시 `429 Too Many Requests` + `Retry-After` 헤더
  - `lib/rate-limit.ts` 헬퍼
  - Server Action / Route Handler 첫 줄에 호출
  - 화이트리스트 (관리자 IP, 테스트 환경)

---

## 5. 제안 후 최종 Skill 구성 (20개)

| 분류 | ID 범위 | Skill |
|---|---|---|
| Foundation | 100~102 | error-fixing, build-env-setup, fix-typecheck |
| Workflow | 200, 202 | git-commit-pr, github-issue-handling |
| Next.js 코어 | 300 | nextjs-app-router-rules |
| 도메인 안전장치 | 301~306 | erp-readonly-guard, gemini-throttle, client-side-pdf, mock-erp-pattern, vercel-ai-sdk-rules, hitl-safety-rules |
| **백엔드 기본기 (신규 Critical)** | **310~315** | **server-action-patterns, route-handler-patterns, rbac-guard, audit-log-helper, nextauth-v5-setup, api-error-handling** |
| **백엔드 심화 (신규 Important)** | **316~319** | **file-upload-excel, background-jobs, prisma-transactions, user-rate-limiting** |
| Process | 400, 401 | srs-task-extraction, req-traceability |

**총 14 → 20개**. 새로 추가되는 6 Critical + 4 Important = 10개. 모두 `.agents/skills/`에 추가하면 Junction을 통해 자동으로 Claude/Cursor에서도 사용 가능.

---

## 6. 실행 우선순위 (권장)

### Wave 1 (즉시 — 1세션)
- M1~M4 수정 4건 (기존 skill 명확화)
- A1, A2, A3 — Server Action, Route Handler, RBAC Guard (백엔드 골격 3종)

### Wave 2 (다음 세션)
- A4, A5, A6 — Audit Log Helper, NextAuth Setup, API Error Handling

### Wave 3 (실제 기능 개발 직전)
- A7 (Excel 업로드) — E3 시작 시
- A8 (Background Jobs) — AI 정확도 모니터 구현 시
- A9 (Transactions) — Lot 병합(E2) 시작 시
- A10 (User Rate Limit) — 인증 구현 직후

---

## 7. 의사 결정이 필요한 사항

### Q1. 신규 skill의 description 자동 발동 트리거 키워드는?
- 각 skill의 frontmatter `description`에 포함할 자동 발동 키워드 목록을 위 4-2/4-3에 표기했으나, **너무 광범위하면 빈번한 발동으로 컨텍스트 폭주** 우려. 좁힐지 넓힐지 결정 필요.

### Q2. NextAuth.js v5 vs Supabase Auth 선택
- 현재 `.agents/rules/002-tech-stack.md`는 `NextAuth.js 또는 Supabase Auth (선택)` 으로 모호. 백엔드 룰을 확정하려면 **하나로 결정** 필요. NextAuth.js v5는 유연하고 self-hosted 친화적. Supabase Auth는 Supabase 통합·소셜 로그인 간편.
- **권장**: NextAuth.js v5 (Phase 2 Ollama 전환·온프레미스 PROD까지 일관 유지 가능).

### Q3. Upstash Redis 도입 시점
- A8(Background Jobs)와 A10(User Rate Limit)는 둘 다 분산 상태 저장소를 권장. Vercel KV 또는 Upstash Redis(Free Tier 256MB) 도입을 PoC 단계에 미리 할지, Phase 2까지 In-memory로 버틸지.
- **권장**: PoC 단계에는 In-memory + 단일 인스턴스 가정으로 시작, A10 도입 시점에 Upstash 검토.

### Q4. OpenAPI / Swagger 자동 생성
- G14에 언급된 Zod → OpenAPI 자동 생성 (`zod-to-openapi`). 백엔드 API 문서화에 큰 가치. Phase 1에 포함할지, Phase 2로 미룰지.
- **권장**: 첫 API 5개 정도까지는 수동 문서화, 이후 자동화 도입.

---

## 8. 산출물 수량 추정

| 카테고리 | 신규 | 수정 | 삭제 | 합 |
|---|---:|---:|---:|---:|
| Skill 폴더 (`.agents/skills/`) | **10** | 4 | 0 | 14 변경 |
| `lib/` 구현 골격 (skill에 동반되는 보일러플레이트) | 7 | 0 | 0 | 7 |
| 합계 | **17** | **4** | **0** | **21** |

---

## 9. 검증 기준 (Definition of Done)

- [ ] 6개 Critical 신규 skill이 `.agents/skills/`에 추가되고 Junction을 통해 `.cursor/skills/`, `.claude/skills/`에서 보임
- [ ] 4개 기존 skill 수정 사항이 반영됨
- [ ] 각 신규 skill에 코드 예시 ≥2개, 한국어 설명, 사용 사례 명시
- [ ] `AGENTS.md`와 `CLAUDE.md`의 라우팅 표 업데이트
- [ ] `docs/HARNESS_REDESIGN_PLAN.md`의 6-3 산출물 표 갱신
- [ ] 새 skill이 SRS REQ-FUNC-NNN을 인용 (추적성)

---

## 10. 승인 흐름

1. 사용자 → 본 제안서 검토
2. Q1~Q4 결정 (특히 Q2 NextAuth 채택 여부)
3. Wave 1 실행 승인 시 → 즉시 적용
4. Wave 2, 3는 단계별 승인
