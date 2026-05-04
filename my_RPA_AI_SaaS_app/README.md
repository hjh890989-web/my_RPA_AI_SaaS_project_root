# FactoryAI — AI 기반 생산관리 SaaS 플랫폼

> **중소 제조공장을 위한 AI 기반 생산관리 SaaS 플랫폼 프로토타입**
>
> 음성·카메라·Excel 데이터를 AI가 자동 구조화하고, 사람이 최종 승인하는 HITL 시스템

---

## 📌 프로젝트 개요

| 항목 | 내용 |
|:---|:---|
| **프로젝트명** | FactoryAI |
| **기술 스택** | React 18 + TypeScript + Vite + Tailwind CSS |
| **UI 라이브러리** | Radix UI Primitives + CVA (class-variance-authority) |
| **아이콘** | lucide-react |
| **라우팅** | react-router-dom v6 |
| **상태 관리** | localStorage (프로토타입 단계) |
| **페이지 수** | 13개 (Landing + Login + 11개 앱 페이지) |
| **목적** | MVP 개발 전 UI/UX 검증용 인터랙티브 프로토타입 |

---

## 🏗️ 시스템 아키텍처

```mermaid
graph TB
    subgraph "Frontend"
        LANDING["Landing Page<br/>(고객 Hook)"]
        LOGIN["Login<br/>(역할 기반)"]
        APP["Dashboard & 11 Pages"]
    end

    LANDING -->|CTA 클릭| LOGIN
    LOGIN -->|역할 선택| APP

    subgraph "미구현 (MVP 예정)"
        FIREBASE["Firebase Auth + Firestore"]
        AI["AI Engine (STT + Vision)"]
        ERP_API["ERP Gateway"]
    end

    APP -.- FIREBASE
    APP -.- AI
    APP -.- ERP_API
```

---

## 📂 프로젝트 구조

```
my_RPA_AI_SaaS_app/
├── src/
│   ├── App.tsx                 # 루트 라우터 (13개 라우트)
│   ├── main.tsx                # Vite 진입점
│   ├── index.css               # 글로벌 스타일
│   ├── components/
│   │   ├── Layout.tsx          # 사이드바 + 헤더 레이아웃
│   │   └── ui/                 # 원자 UI 컴포넌트 (4개)
│   └── pages/
│       ├── Landing.tsx         # ✨ 랜딩페이지 (고객 Hook 최전면)
│       ├── landing.css         # 랜딩페이지 전용 스타일
│       ├── Login.tsx           # 역할 기반 Quick Login
│       ├── Dashboard.tsx       # 현장 운영 대시보드
│       ├── LogEntries.tsx      # 제로터치 로깅
│       ├── LogReview.tsx       # HITL 인간 승인
│       ├── XAI.tsx             # XAI 품질 이상탐지
│       ├── AuditReports.tsx    # 감사 리포트
│       ├── ERP.tsx             # ERP 연동 관리
│       ├── Security.tsx        # 보안 콘솔
│       ├── Performance.tsx     # 성과 분석 대시보드
│       ├── ROICalculator.tsx   # ROI 계산기
│       ├── Onboarding.tsx      # 온보딩 가이드 (ADMIN)
│       └── Voucher.tsx         # 바우처 관리 (ADMIN)
├── docs/                       # 리팩토링 문서
├── tasks/                      # 태스크 명세서
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── 프로토타입_실행.bat         # 윈도우용 원클릭 실행
```

---

## 🎯 페이지 흐름

```mermaid
flowchart LR
    LAND["🏠 랜딩페이지<br/>(고객 Hook)"] -->|CTA: 무료 데모| LOGIN["🔐 로그인<br/>(역할 선택)"]
    LOGIN --> DASH["📊 대시보드"]
    DASH --> LOG["📝 제로터치 로깅"]
    LOG --> HITL["✅ HITL 승인"]
    HITL --> ERP["🔗 ERP 동기화"]
    DASH --> XAI["🔍 XAI 이상탐지"]
    XAI --> AUDIT["📋 감사 리포트"]
    DASH --> SEC["🛡️ 보안 콘솔"]
    DASH --> ROI["💰 ROI 계산기"]

    style LAND fill:#0d1529,stroke:#4ecdc4,color:#4ecdc4
    style HITL fill:#1e293b,stroke:#f59e0b,color:#f59e0b
```

---

## 🚀 실행 방법

### 방법 1: 윈도우 원클릭 실행 (추천)
1. `my_RPA_AI_SaaS_app/` 폴더로 이동합니다.
2. `프로토타입_실행.bat` 파일을 더블 클릭합니다.

### 방법 2: 터미널 수동 실행
```bash
# 프로젝트 디렉토리에서 실행
npm install         # 최초 1회만
cmd /c npm run dev  # 개발 서버 시작
```

### 🌐 접속 주소
👉 **[http://localhost:3000](http://localhost:3000)**

| 경로 | 설명 |
|:---|:---|
| `/` | 랜딩페이지 (최전면, 고객 Hook) |
| `/login` | 역할 선택 로그인 |
| `/dashboard` | 현장 운영 대시보드 |

---

## 👥 사용자 역할 (RBAC)

| 역할 | 대표 사용자 | 접근 가능 페이지 |
|:---|:---|:---|
| **ADMIN** | 한성우 COO | 전체 13개 페이지 |
| **OPERATOR** | 박작업 | 대시보드, 로깅 엔트리 |
| **AUDITOR** | 클레어 리 품질이사 | XAI, 감사 리포트, 로그 검토 |
| **VIEWER** | 이뷰어 | 대시보드, 성과 분석 (읽기 전용) |
| **CISO** | 최보안 | 보안 콘솔, 감사 리포트 |

---

## 📝 랜딩페이지 전략

| 항목 | 적용 내용 |
|:---|:---|
| **서비스 유형** | 고객의 구체적 공포(SPOF, 기습 실사, 도입 실패)를 자극하고 구원을 제시하는 공포/결과 지향형 혼합 |
| **헤드라인** | "현장의 수기 입력은 Zero로, 원청사 감사 방어율은 100%로." |
| **CTA 전략** | 구체적 이득 제시: 무상 진단 데모, B2B ROI 시뮬레이션, 바우처 턴키 예약 선착순 |
| **타겟 페르소나** | COO(스케줄러 의존 파괴), CQO(원청사 감사 방어), CFO(도입 비용 80% 절감) 타겟팅 명시 |
| **Before/After** | 데이터 무덤 & 수기 조작(75.5% 실패) → 생산 무중단 & 조작 불가능한 10초 PDF 생성 |
| **Trust 요소** | 정부 바우처 공식 지원, ERP 비파괴, 삼성/현대차 실사 통과율 100% 보장 |

---

> **작성일**: 2026-05-04  
> **프레임워크**: React 18 + TypeScript + Vite 5 + Tailwind CSS 3
