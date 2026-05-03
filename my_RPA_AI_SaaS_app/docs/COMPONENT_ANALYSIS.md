# FactoryAI — 컴포넌트 구조 현황 및 개선점 분석

> **문서 목적**: 현재 프로토타입의 컴포넌트 계층 구조를 시각화하고, 중복 컴포넌트, props 흐름, 리팩토링 포인트를 식별합니다.

---

## 1. 컴포넌트 계층 차트 (현재 상태)

```mermaid
graph TD
    subgraph "Application Root"
        APP["App.tsx\n(Router)"]
    end

    subgraph "Layout Layer"
        LAYOUT["Layout.tsx\n(Sidebar + Header + Main)"]
    end

    subgraph "Page Components (12개)"
        LOGIN["Login.tsx"]
        DASH["Dashboard.tsx"]
        LOG["LogEntries.tsx"]
        REVIEW["LogReview.tsx"]
        XAI["XAI.tsx"]
        AUDIT["AuditReports.tsx"]
        ERP["ERP.tsx"]
        SEC["Security.tsx"]
        PERF["Performance.tsx"]
        ROI["ROICalculator.tsx"]
        ONBOARD["Onboarding.tsx"]
        VOUCHER["Voucher.tsx"]
    end

    subgraph "UI Primitives (4개)"
        CARD["Card\nCardHeader\nCardTitle\nCardContent\nCardFooter\nCardDescription"]
        BADGE["Badge\n(8 variants)"]
        BUTTON["Button\n(7 variants × 4 sizes)"]
        TABLE["Table\nTableHeader\nTableBody\nTableRow\nTableHead\nTableCell"]
    end

    subgraph "Utilities"
        UTILS["cn()\nclsx + twMerge"]
    end

    APP --> LOGIN
    APP --> LAYOUT
    LAYOUT --> DASH
    LAYOUT --> LOG
    LAYOUT --> REVIEW
    LAYOUT --> XAI
    LAYOUT --> AUDIT
    LAYOUT --> ERP
    LAYOUT --> SEC
    LAYOUT --> PERF
    LAYOUT --> ROI
    LAYOUT --> ONBOARD
    LAYOUT --> VOUCHER

    DASH --> CARD
    DASH --> BADGE
    DASH --> BUTTON
    LOG --> CARD
    LOG --> BADGE
    LOG --> BUTTON
    REVIEW --> CARD
    REVIEW --> BADGE
    REVIEW --> BUTTON
    XAI --> CARD
    XAI --> BADGE
    XAI --> BUTTON
    AUDIT --> CARD
    AUDIT --> BADGE
    AUDIT --> BUTTON
    ERP --> CARD
    ERP --> BADGE
    ERP --> BUTTON
    ERP --> TABLE
    SEC --> CARD
    SEC --> BADGE
    SEC --> BUTTON
    SEC --> TABLE
    PERF --> CARD
    PERF --> BADGE
    PERF --> BUTTON
    ROI --> CARD
    ROI --> BADGE
    ROI --> BUTTON
    ONBOARD --> CARD
    ONBOARD --> BUTTON
    VOUCHER --> CARD
    VOUCHER --> BADGE
    VOUCHER --> BUTTON

    CARD --> UTILS
    BADGE --> UTILS
    BUTTON --> UTILS
    TABLE --> UTILS

    style APP fill:#0ea5e9,stroke:#0284c7,color:#fff
    style LAYOUT fill:#6366f1,stroke:#4f46e5,color:#fff
    style LOGIN fill:#f59e0b,stroke:#d97706,color:#000
    style UTILS fill:#4ecdc4,stroke:#26a69a,color:#000
```

---

## 2. 컴포넌트 사용 빈도 매트릭스

| UI 컴포넌트 | 사용 페이지 수 | 사용 방식 | 비고 |
|:---|:---|:---|:---|
| `Card` + `CardContent` | **12/12** | 모든 페이지의 주요 컨테이너 | 가장 많이 사용 |
| `Button` | **11/12** | 액션 버튼 (CTA, 필터, 내비게이션) | Login만 자체 button 사용 |
| `Badge` | **10/12** | 상태 표시 (성공/경고/위험 등) | Onboarding 미사용 |
| `Table` | **2/12** | ERP 필드 매핑, Security 액세스 로그 | 사용 범위 제한적 |
| `CardHeader` | **10/12** | 카드 제목 영역 | Login, ROI 미사용 |
| `CardTitle` | **10/12** | 카드 제목 텍스트 | 위와 동일 |
| `cn()` | **모든 파일** | 조건부 className 병합 | 핵심 유틸리티 |

---

## 3. 중복 컴포넌트 발견

### 3.1 인라인 중복 패턴 (컴포넌트로 추출되지 않은 반복 코드)

```mermaid
graph LR
    subgraph "중복 패턴 1: Page Header"
        PH1["Dashboard.tsx\nL27-40"]
        PH2["LogEntries.tsx\nL33-46"]
        PH3["ERP.tsx\nL41-54"]
        PH4["Security.tsx\nL44-57"]
        PH5["Performance.tsx\nL35-48"]
        PH6["AuditReports.tsx\nL29-37"]
        PH7["XAI.tsx\nL19-27"]
    end

    subgraph "중복 패턴 2: Stat Card Grid"
        SC1["Dashboard.tsx\nL43-61"]
        SC2["Security.tsx\nL60-79"]
        SC3["Performance.tsx\nL51-71"]
        SC4["AuditReports.tsx\nL39-56"]
    end

    subgraph "중복 패턴 3: Progress Bar"
        PB1["Dashboard.tsx\n2회"]
        PB2["Security.tsx\n4회"]
        PB3["Performance.tsx\n4회"]
        PB4["Voucher.tsx\n1회"]
    end

    subgraph "중복 패턴 4: Status Badge Logic"
        SB1["Dashboard.tsx"]
        SB2["LogEntries.tsx"]
        SB3["AuditReports.tsx"]
        SB4["ERP.tsx"]
        SB5["Security.tsx"]
    end

    style PH1 fill:#ef4444,stroke:#dc2626,color:#fff
    style SC1 fill:#f59e0b,stroke:#d97706,color:#000
    style PB1 fill:#8b5cf6,stroke:#7c3aed,color:#fff
    style SB1 fill:#06b6d4,stroke:#0891b2,color:#fff
```

### 3.2 중복 상세 분석

| 중복 패턴 | 발생 횟수 | 코드 줄 수 (총) | 추출 난이도 | 절감 효과 |
|:---|:---|:---|:---|:---|
| Page Header | 7회 | ~84줄 | ⭐ 쉬움 | ~70줄 절감 |
| Stat Card Grid | 4회 | ~80줄 | ⭐ 쉬움 | ~60줄 절감 |
| Progress Bar | 11회+ | ~110줄 | ⭐ 쉬움 | ~90줄 절감 |
| Status Badge 로직 | 5회+ | ~50줄 | ⭐⭐ 보통 | ~40줄 절감 |
| Two-Pane Layout | 6회 | ~30줄 | ⭐ 쉬움 | ~20줄 절감 |
| List Item 행 | 4회 | ~120줄 | ⭐⭐ 보통 | ~80줄 절감 |
| **합계** | **37회+** | **~474줄** | | **~360줄 절감** |

---

## 4. Props 흐름 점검

### 4.1 현재 데이터 흐름 (문제점 포함)

```mermaid
flowchart TD
    subgraph "데이터 소스 (현재)"
        LS["localStorage\nuserRole"]
        MOCK["각 페이지 내부\nMock 데이터 (하드코딩)"]
    end

    subgraph "Layout"
        LAYOUT["Layout.tsx"]
        SIDEBAR["Sidebar Navigation"]
        HEADER["Header"]
    end

    subgraph "Pages"
        PAGES["12개 페이지\n(독립적, props 없음)"]
    end

    LS -->|"직접 읽기\nlocalStorage.getItem()"| LAYOUT
    LS -->|"직접 읽기"| PAGES
    MOCK -->|"페이지 내부 const"| PAGES
    LAYOUT -->|"children (React.ReactNode)"| PAGES

    style LS fill:#ef4444,stroke:#dc2626,color:#fff
    style MOCK fill:#ef4444,stroke:#dc2626,color:#fff
```

### 4.2 Props 흐름 문제점

| # | 문제 | 위치 | 영향도 |
|:--|:--|:--|:--|
| 1 | **Props가 전혀 없음** | 모든 Page 컴포넌트 | 🔴 높음 |
| 2 | **localStorage 직접 접근** | Layout.tsx (L40), Dashboard.tsx (L23) | 🔴 높음 |
| 3 | **Mock 데이터가 페이지 파일에 인라인** | 모든 Page 컴포넌트 상단 | 🟡 중간 |
| 4 | **Layout → Page 간 props 전달 없음** | Layout.tsx → children | 🟡 중간 |
| 5 | **페이지 간 상태 공유 불가** | 독립적 구조 | 🔴 높음 |

### 4.3 개선된 Props 흐름 (제안)

```mermaid
flowchart TD
    subgraph "Context Providers"
        AUTH["AuthContext\n(user, role, login, logout)"]
        DATA["DataContext\n(logs, reports, erpStatus)"]
    end

    subgraph "Layout"
        LAYOUT["Layout.tsx"]
    end

    subgraph "Shared Components"
        PH["PageHeader\n(title, description, actions)"]
        SC["StatCard\n(label, value, icon, change)"]
        PB["ProgressBar\n(label, value, progress, color)"]
        SB["StatusBadge\n(status)"]
        LI["ListItem\n(icon, title, subtitle, trailing)"]
    end

    subgraph "Pages"
        PAGES["12개 페이지"]
    end

    AUTH -->|"useAuth() hook"| LAYOUT
    AUTH -->|"useAuth() hook"| PAGES
    DATA -->|"useData() hook"| PAGES
    LAYOUT -->|children| PAGES
    PAGES -->|"props"| PH
    PAGES -->|"props"| SC
    PAGES -->|"props"| PB
    PAGES -->|"props"| SB
    PAGES -->|"props"| LI

    style AUTH fill:#4ecdc4,stroke:#26a69a,color:#000
    style DATA fill:#4ecdc4,stroke:#26a69a,color:#000
    style PH fill:#6366f1,stroke:#4f46e5,color:#fff
    style SC fill:#6366f1,stroke:#4f46e5,color:#fff
```

---

## 5. 리팩토링 포인트 종합

### 5.1 컴포넌트 구조 개선 로드맵

```mermaid
gantt
    title 컴포넌트 리팩토링 로드맵
    dateFormat  YYYY-MM-DD
    section Phase 1: 공통 컴포넌트 추출
        PageHeader 컴포넌트           :p1, 2026-04-27, 1d
        StatusBadge 컴포넌트          :p2, after p1, 1d
        ProgressBar 컴포넌트          :p3, after p1, 1d
    section Phase 2: 레이아웃 통합
        StatCard + StatsGrid         :p4, after p2, 1d
        TwoPaneLayout                :p5, after p4, 1d
        ListItem                     :p6, after p5, 1d
    section Phase 3: 상태 관리 도입
        AuthContext 도입              :p7, after p6, 2d
        Mock 데이터 분리              :p8, after p7, 1d
        ProtectedRoute 적용          :p9, after p8, 1d
    section Phase 4: 검증
        전체 페이지 적용 및 테스트     :p10, after p9, 2d
```

### 5.2 리팩토링 포인트 상세

| # | 분류 | 현재 상태 | 개선 방향 | 영향 범위 | 우선순위 |
|:--|:--|:--|:--|:--|:--|
| 1 | **구조** | 12개 페이지가 모두 독립적 | 공유 컴포넌트 레이어 도입 | 전체 | 🔴 |
| 2 | **상태** | `localStorage` 직접 접근 | `AuthContext` + `useAuth` Hook | Layout, Dashboard, Login | 🔴 |
| 3 | **데이터** | Mock 데이터가 각 페이지에 인라인 | `data/mock/` 디렉토리로 분리 | 전체 | 🟡 |
| 4 | **라우팅** | 동적 라우팅 없음 | `useParams`로 `:id` 기반 라우팅 | LogReview, AuditReports | 🟡 |
| 5 | **타입** | 타입 정의 없음 (인라인 객체) | `types/` 디렉토리에 인터페이스 정의 | 전체 | 🟡 |
| 6 | **CSS** | Tailwind 클래스 직접 사용 | 공통 컴포넌트에 캡슐화 | 전체 | 🟢 |
| 7 | **성능** | 불필요한 리렌더링 가능 | `React.memo`, `useMemo`, `useCallback` | 주요 리스트 | 🟢 |

### 5.3 리팩토링 후 이상적 디렉토리 구조

```
src/
├── components/
│   ├── ui/                    # 원자 컴포넌트 (기존 유지)
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── table.tsx
│   ├── shared/                # ✨ 새로 추출할 공유 컴포넌트
│   │   ├── PageHeader.tsx
│   │   ├── StatCard.tsx
│   │   ├── StatsGrid.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── TwoPaneLayout.tsx
│   │   ├── StatusBadge.tsx
│   │   └── ListItem.tsx
│   └── Layout.tsx
├── context/                   # ✨ 상태 관리
│   ├── AuthContext.tsx
│   └── DataContext.tsx
├── data/                      # ✨ Mock 데이터 분리
│   └── mock/
│       ├── users.ts
│       ├── logs.ts
│       ├── reports.ts
│       └── erp.ts
├── hooks/                     # ✨ 커스텀 훅
│   ├── useAuth.ts
│   └── useData.ts
├── types/                     # ✨ 타입 정의
│   ├── user.ts
│   ├── log.ts
│   ├── report.ts
│   └── common.ts
├── pages/
│   └── (12개 페이지 — 대폭 경량화)
├── lib/
│   └── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```
