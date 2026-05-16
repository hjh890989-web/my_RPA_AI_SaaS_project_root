# AGENTS.md — FactoryAI 크로스툴 글로벌 규칙

이 파일은 **Antigravity (v1.20.3+), Cursor, Claude Code, Gemini CLI** 등 본 저장소에서 사용하는 모든 AI 어시스턴트가 **항상** 로드하는 최상위 컨텍스트입니다. 도구별 세부 설정은 `.agents/`, `.claude/`, `.cursor/`, `.gemini/` 하위 디렉토리를 참조하십시오.

> **원천 문서**: 본 규칙의 모든 내용은 [`docs/1_RPD_V_1.0.md`](docs/1_RPD_V_1.0.md) (PRD v7.0) 및 [`docs/2_SRS_V_1.0.md`](docs/2_SRS_V_1.0.md) (SRS v0.8)에 근거합니다. 두 문서가 진실의 원천이며, 본 파일은 그 핵심 요약입니다.

---

## 1. Project Identity

- **Name**: FactoryAI — 제조 AI 자동화 플랫폼
- **Mission**: 국내 스마트공장 75.5%가 정체된 **「2차 자동화 공백」**을 해소한다. MES·ERP 기초 인프라는 있으나 현장 입력 거부(결측률 40%+)로 데이터가 축적되지 않아 AI 고도화가 불가능한 구조적 공백을, **Zero-Touch 패시브 로깅(STT+Vision)**, **비파괴형 ERP 브릿지**, **온프레미스 AI 패키지**, **턴키 바우처 행정 대행**으로 해소한다.
- **MVP Target**: 금속가공·식품제조 2개 버티컬, PoC 1개사, 동시 사용자 ≤3명
- **Owner**: 모두연 EGIGAE #5 (1인 개발 + 완전 무료 인프라)

---

## 2. Tech Stack (MVP)

| 영역 | 선택 | 근거 |
|---|---|---|
| Framework | **Next.js (App Router, TypeScript)** | CON-01 / ADR-8 단일 풀스택 모놀리스 |
| Server | **Server Actions + Route Handlers** | CON-11 — 별도 백엔드 서버 없음 |
| UI | **Tailwind CSS + shadcn/ui** | CON-10 |
| DB | **Prisma ORM + SQLite(dev) / Supabase PostgreSQL(MVP)** | CON-09 / ADR-10 |
| AI | **Vercel AI SDK + Google Gemini API (Free Tier 15 RPM)** | CON-08, CON-12 / ADR-9 |
| Deploy | **Vercel (Free Tier, Git Push 자동)** | CON-04, CON-12 |
| ERP 연동 | **Supabase 내 Mock ERP 테이블 (MVP)** / Cloudflare Tunnel (Phase 2) | CON-02, CON-05 / ADR-2 |
| PDF | **클라이언트 사이드(`@react-pdf/renderer` 또는 `window.print()`)** | CON-07, ASM-09 — Serverless 10s 타임아웃 회피 |

**금지 스택** (Phase 2 또는 사용 안 함): Java/Spring Boot, Kafka, Flutter, FastAPI, Redis, MySQL, Docker(MVP), 별도 백엔드 서버.

---

## 3. Non-Negotiable Rules (절대 규칙)

본 5개 원칙은 **모든 AI 어시스턴트의 모든 작업에서 위반 불가**합니다.

### R1. HITL (Human-in-the-Loop) 4대 원칙 — CON-03
AI 판단 결과는 **사람의 승인 없이** 외부 발행·물리 행위·실 데이터 변경을 수행할 수 없습니다. 자동 실행 가능한 것은 **읽기·요약·제안**뿐입니다. 이 원칙은 모든 코드 경로(서버 액션, 백그라운드 잡, 크론, 라우트 핸들러)에 적용됩니다.

### R2. ERP는 Read-Only — CON-02
ERP 연동(Mock 포함)에 대해 **Write·Update·Delete 쿼리는 시스템 레벨에서 차단**되어야 합니다. Prisma 스키마/미들웨어, 권한 가드 등 다층 방어를 사용합니다.

### R3. Rate Limit 준수 — CON-12, ASM-10
Gemini API 호출은 **In-memory Queue + Exponential Backoff**로 **≤12 RPM** (안전 마진 포함)을 유지합니다. 동시 요청 시 사용자에게 진행률 UI를 노출하고, 최대 대기 60초.

### R4. 무료 티어 한도 준수 — CON-12, CON-07
- Vercel Serverless: 실행 ≤10초, 호출 ≤100,000/월
- Supabase Free: DB ≤500MB, Storage ≤1GB
- 장시간 작업(PDF 생성 등)은 **클라이언트 사이드** 처리
- 한도 초과 위험이 있는 구현 요청 시 작업 전에 경고

### R5. 데이터 보호 & RBAC — SRS §5-3
- 모든 사용자 입력은 검증·이스케이프 (XSS, SQL 인젝션 방어)
- RBAC 5개 역할(`ADMIN`, `OPERATOR`, `QC`, `CISO`, `VIEWER`) 권한 체크 누락 금지
- 감사 로그(`audit_log` 테이블)는 모든 쓰기 작업에 기록

---

## 4. Development Guidelines

### 4.1 Code Style
- **언어**: TypeScript strict 모드. `any` 금지 (불가피하면 `unknown` 후 narrow).
- **컴포넌트**: 함수형, `const` 화살표 함수. Server Component 기본, `'use client'`는 필요한 경계에서만.
- **스타일링**: Tailwind 클래스 전용. `<style>` / 별도 CSS 금지. 조건부 클래스는 `clsx` 사용.
- **네이밍**: 이벤트 핸들러 `handleXxx`, 비동기 함수 `xxxAsync` 불요(반환 타입으로 식별).
- **주석**: WHY만. WHAT는 코드로 표현. 쓸모없어진 주석 즉시 제거.

### 4.2 Architecture
- **단일 모놀리스**: `app/`, `lib/`, `prisma/`, `components/` 4 폴더 골격 유지.
- **경로 별칭**: `@/*` → 프로젝트 루트.
- **서버/클라이언트 경계**: DB·LLM 호출은 Server Action/Route Handler에서. 클라이언트 컴포넌트에는 fetch 결과만 전달.
- **에러 처리**: 시스템 경계(외부 API, 사용자 입력)에서만 try/catch. 내부 호출은 신뢰.

### 4.3 Version Control
- Git Flow: `main` → `develop` → `feature/*`, `hotfix/*`.
- Conventional Commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`.
- PR 본문은 영문 또는 한글 일관. 작업 단위는 원자적.

### 4.4 Performance (NFR)
- Wizard 단계 전환: p95 < 800ms
- 문서 초안 생성: p95 < 10s (Gemini 응답 포함)
- 가용성: Best Effort (Vercel Free / Supabase Free 한도 내)

### 4.5 Comments Policy
- 의미 있는 주석만(`// WHY`).
- TODO/FIXME는 이슈 번호와 짝지어 (`// TODO(#42): ...`).
- 큰 docblock/주석 블록 금지 — 한 줄 이내.

---

## 5. Cross-Tool Routing

작업 성격에 따라 적합한 도구·서브에이전트·스킬이 자동 선택됩니다. 수동 호출이 필요하면 도구별 문법으로 지시하십시오.

### 공통 (모든 도구)
| 자원 | 위치 |
|---|---|
| 글로벌 규칙 | `AGENTS.md` (본 파일) |
| 프로젝트 룰 | `.agents/rules/001~004` |
| 크로스툴 스킬 | `.agents/skills/<id>/SKILL.md` |
| 워크플로우 | `.agents/workflows/*.md` (Antigravity 전용) |

### Claude Code
| 자원 | 위치 |
|---|---|
| 진입 컨텍스트 | `CLAUDE.md` |
| 서브에이전트 | `.claude/agents/{nextjs-frontend, nextjs-backend, database, ai-integration, pdf-client}.md` |
| 슬래시 커맨드 | `.claude/skills/` (Junction → `.agents/skills/`, **총 24개 skill**) — 백엔드 골격은 `/310~319` 시리즈, 자세한 매핑은 [CLAUDE.md §3](CLAUDE.md) |

### Cursor
| 자원 | 위치 |
|---|---|
| 룰 (globs 기반) | `.cursor/rules/*.mdc` |
| 스킬 | `.cursor/skills/<id>/SKILL.md` (또는 `.agents/skills`에 symlink) |
| 서브에이전트 | `.cursor/agents/*.md` |

### Gemini CLI / Antigravity
| 자원 | 위치 |
|---|---|
| 서브에이전트 | `.gemini/agents/*.md` (`model: inherit` 필수) |
| 워크플로우 | `.agents/workflows/*.md` |

### Skills 공유 (Symlink 권장)
가이드 `README-common-harness.md` §1.2 참조. Windows에서는 `mklink /D` 또는 `New-Item -ItemType Junction`:

```powershell
# PowerShell (관리자)
New-Item -ItemType Junction -Path .cursor\skills -Target ..\.agents\skills
New-Item -ItemType Junction -Path .claude\skills -Target ..\.agents\skills
```

---

## 6. Working With This Project

1. 새 기능을 시작할 때: 먼저 `docs/2_SRS_V_1.0.md` 의 해당 Epic(E1~E7) / Service(SVC-1~5) 섹션을 참조.
2. 에러 발생 시: `/fix-error` (Claude) 또는 `100-error-fixing-process` 스킬 (Cursor).
3. 새 룰 추가 시: `.agents/rules/`에 추가하고 본 파일 §5 라우팅 표 갱신.
4. 외부 시스템 연동 시: SRS §3.1 EXT-01~09 표 먼저 확인 (특히 ERP/Gemini의 Rate Limit/Read-Only 제약).
5. 배포 시: Vercel 자동 (Git Push). `vercel.json` 또는 환경변수 수동 조작 금지.

---

## 7. References

- [`docs/1_RPD_V_1.0.md`](docs/1_RPD_V_1.0.md) — PRD v7.0
- [`docs/2_SRS_V_1.0.md`](docs/2_SRS_V_1.0.md) — SRS v0.8
- [`README-claude-harness.md`](README-claude-harness.md)
- [`README-cursor-harness.md`](README-cursor-harness.md)
- [`README-gemini-harness.md`](README-gemini-harness.md)
- [`README-common-harness.md`](README-common-harness.md)
