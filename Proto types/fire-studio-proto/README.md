# FactoryAI — Firebase Studio UI Prototype

이 프로젝트는 중소 제조공장을 위한 AI 기반 생산관리 SaaS **FactoryAI**의 UI 프로토타입입니다. 
이 프로토타입은 `UI Proto plan/9_fire studio prompt_final.md` 의 프롬프트를 기반으로 합니다.
음성(STT), 이미지(Vision) 데이터를 AI로 분석하고 인간 승인(HITL)을 거치는 과정을 시뮬레이션하기 위한 대시보드 UI를 포함하고 있습니다. Firebase Studio 환경의 Next.js 보일러플레이트로 구축되었습니다.

## 🚀 기술 스택 (Tech Stack)

- **Framework**: Next.js 15 (App Router), React 19
- **Styling**: Tailwind CSS, Shadcn UI (Radix UI)
- **Icons & Charts**: Lucide React, Recharts
- **Forms & Validation**: React Hook Form, Zod
- **AI & Backend**: Firebase 11, Genkit, Google GenAI

## 🛠 사전 요구사항 (Prerequisites)

- Node.js (v20 이상 권장)
- npm (또는 yarn, pnpm)
- Google Gemini API Key (Genkit AI 사용 시 필요할 수 있습니다)
- Firebase 프로젝트 설정 (해당 시)

## 📦 설치 및 실행 가이드 (Installation & Execution)

### 1. 패키지 설치
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env` 또는 `.env.local` 파일을 생성하고 필요한 환경 변수를 추가합니다.
```env
# 예시: Genkit / Gemini API Key
GEMINI_API_KEY=your_api_key_here
```

### 3. 개발 서버 실행 (웹 UI)
Turbopack을 사용하여 포트 9002에서 로컬 개발 서버를 실행합니다.
```bash
npm run dev
```
브라우저에서 [http://localhost:9002](http://localhost:9002)에 접속하여 확인할 수 있습니다.

### 4. Genkit AI 서버 실행 (선택사항)
AI 기능 개발 및 테스트를 위해 Genkit 서버를 병렬로 실행할 수 있습니다.
```bash
# 기본 실행
npm run genkit:dev

# Watch 모드로 실행 (코드 변경 시 자동 재시작)
npm run genkit:watch
```

## 📜 스크립트 명령어 모음 (Available Scripts)

- `npm run dev` : Next.js 개발 서버 실행 (`-p 9002` 기본값)
- `npm run build` : 프로덕션용 최적화 빌드 생성
- `npm run start` : 빌드된 프로덕션 서버 실행
- `npm run lint` : ESLint를 통한 코드 정적 분석
- `npm run typecheck` : TypeScript 타입 검사
- `npm run genkit:dev` : Genkit AI 개발 서버 실행
- `npm run genkit:watch` : Genkit 서버 Watch 모드 실행

## 📂 주요 디렉토리 구조 (Directory Structure)

- `src/app/` : Next.js App Router 기반의 페이지 및 레이아웃, 라우팅 폴더 (`/login`, `/dashboard`, `/log-entries` 등)
- `src/components/` : 재사용 가능한 UI 컴포넌트 (Shadcn UI 기반)
- `src/ai/` : Genkit 관련 AI 로직 (`dev.ts` 등)

## 🎨 주요 기능 및 라우팅 구조

FactoryAI는 5가지 역할(ADMIN, OPERATOR, AUDITOR, VIEWER, CISO)에 따른 RBAC를 제공합니다.

- `/login` : 5개 역할별 퀵 로그인 기능 제공
- `/dashboard` : 핵심 지표(로깅, 결측률, 감사 내역 등) 시각화 및 주요 KPI 차트 표시
- `/log-entries` : 음성 녹음, 카메라 촬영, 엑셀 업로드를 통한 제로터치 로깅
- `/log-entries/review` : 수집된 데이터에 대한 AI 분석 결과를 확인하고 승인/거절(HITL)
- `/dashboard/xai` : 품질 이상 탐지 내역과 AI의 판단 근거(XAI) 확인 및 수동 판정
- `/audit-reports` : 규제 기반 1클릭 감사 리포트 생성 및 결측치 관리
- `/dashboard/erp` : (ADMIN 전용) 외부 ERP 시스템 연동 및 데이터 동기화 상태 관리
- `/dashboard/security` : (CISO 전용) RBAC 현황, 24시간 접근 거부 내역, 감사 로그 및 보안 체크리스트 관리
- `/roi-calculator` : (비로그인 접근 가능) 공장 규모 및 비용에 따른 ROI(투자 수익률) 계산기
- `/dashboard/performance` : (내부용) COO, 구매본부장, 품질이사, CFO 등 페르소나별 주요 성과 지표 대시보드

*(이 문서는 UI 프로토타입 실행 가이드이며, 실제 데이터베이스 연결이나 프로덕션 백엔드 설정은 추가 구성이 필요할 수 있습니다.)*
