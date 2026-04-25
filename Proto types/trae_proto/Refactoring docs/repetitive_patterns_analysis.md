# FactoryAI Trae Prototype — 반복 패턴 분석 및 재사용 컴포넌트 제안

## 📊 분석 요약

12개 페이지(약 1,700줄)를 분석하여 **6가지 주요 반복 패턴**을 식별했습니다. 이들을 공유 컴포넌트로 추출하면 코드량을 **약 35~40%** 절감할 수 있습니다.

---

## 🔁 식별된 반복 패턴

### 1. Page Header (페이지 헤더)

**발생 빈도**: 모든 페이지 (12/12)

거의 모든 페이지가 동일한 구조로 시작합니다:

```tsx
// Dashboard.tsx (L27-40)
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
  <div>
    <h1 className="text-2xl font-bold text-white">현장 운영 대시보드</h1>
    <p className="text-slate-400">실시간 데이터 수집 및 AI 구조화 현황입니다.</p>
  </div>
  <div className="flex items-center space-x-3">
    <Button variant="outline" ...>기간 설정</Button>
    <Button variant="mint">새 로그 생성</Button>
  </div>
</div>
```

동일한 패턴이 다음 페이지에서 반복됩니다:
- [Dashboard.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Dashboard.tsx#L27-L40)
- [LogEntries.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/LogEntries.tsx#L33-L46)
- [ERP.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/ERP.tsx#L41-L54)
- [Security.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Security.tsx#L44-L57)
- [Performance.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Performance.tsx#L35-L48)
- [AuditReports.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/AuditReports.tsx#L29-L37)
- [XAI.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/XAI.tsx#L19-L27)

> [!TIP]
> **제안 컴포넌트**: `<PageHeader>`
> ```tsx
> interface PageHeaderProps {
>   title: string;
>   description: string;
>   actions?: React.ReactNode;
> }
> 
> function PageHeader({ title, description, actions }: PageHeaderProps) {
>   return (
>     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
>       <div>
>         <h1 className="text-2xl font-bold text-white">{title}</h1>
>         <p className="text-slate-400">{description}</p>
>       </div>
>       {actions && <div className="flex items-center space-x-3">{actions}</div>}
>     </div>
>   );
> }
> ```

---

### 2. KPI Stat Cards (통계 카드 그리드)

**발생 빈도**: 4개 페이지

`icon + value + label + change badge`의 동일한 카드 레이아웃이 반복됩니다:

```tsx
// Dashboard.tsx (L43-61) — 4칸 그리드
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {stats.map((stat) => (
    <Card key={stat.label}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-lg bg-slate-800/50">
            <stat.icon className="w-5 h-5" />
          </div>
          <Badge ...>{stat.change}</Badge>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

동일한 패턴이 다음에서 반복됩니다:
- [Dashboard.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Dashboard.tsx#L43-L61) — 4칸 stats
- [Security.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Security.tsx#L60-L79) — 4칸 securityStats
- [Performance.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Performance.tsx#L51-L71) — 4칸 kpiStats
- [AuditReports.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/AuditReports.tsx#L39-L56) — 4칸 (간소화 버전)

> [!TIP]
> **제안 컴포넌트**: `<StatsGrid>` + `<StatCard>`
> ```tsx
> interface StatCardProps {
>   label: string;
>   value: string;
>   change?: string;
>   icon: LucideIcon;
>   color?: string;
>   trend?: 'up' | 'down';
> }
> 
> function StatCard({ label, value, change, icon: Icon, color, trend }: StatCardProps) { ... }
> function StatsGrid({ stats, columns = 4 }: { stats: StatCardProps[], columns?: number }) { ... }
> ```

---

### 3. Progress Bar (진행도 바)

**발생 빈도**: 5개 페이지, 약 12회 이상

`label + percentage + colored bar` 패턴이 매우 빈번하게 반복됩니다:

```tsx
// Dashboard.tsx (L107-115)
<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span className="text-slate-400">AI 모델 가동률</span>
    <span className="text-white font-medium">94%</span>
  </div>
  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
    <div className="h-full bg-mint w-[94%]" />
  </div>
</div>
```

반복 위치:
- [Dashboard.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Dashboard.tsx#L107-L125) — 2회
- [Security.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Security.tsx#L138-L151) — 4회 (threatLevels)
- [Performance.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Performance.tsx#L128-L141) — 4회 (performanceGoals)
- [Voucher.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Voucher.tsx#L79-L87) — 1회

> [!TIP]
> **제안 컴포넌트**: `<ProgressBar>`
> ```tsx
> interface ProgressBarProps {
>   label: string;
>   value: string | number;
>   progress: number;       // 0-100
>   color?: string;          // 'bg-mint' | 'bg-success' | ...
>   target?: string;
> }
> ```

---

### 4. Two-Pane Layout (2분할 레이아웃: 메인 + 사이드)

**발생 빈도**: 6개 페이지

`lg:col-span-2`(좌측 메인) + 나머지(우측 사이드바) 형태의 `grid-cols-3` 레이아웃이 반복됩니다:

```tsx
// 거의 모든 대시보드 페이지에서 사용
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <Card className="lg:col-span-2"> ... 메인 콘텐츠 ... </Card>
  <div className="space-y-6"> ... 사이드바 카드들 ... </div>
</div>
```

반복 위치:
- [Dashboard.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Dashboard.tsx#L64) — 실시간 피드 + 시스템 상태
- [XAI.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/XAI.tsx#L29) — 이상 분석 + 통계
- [ERP.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/ERP.tsx#L88) — 필드 매핑 + 동기화 로그
- [Security.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Security.tsx#L81) — 액세스 로그 + 위협/RBAC
- [Performance.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Performance.tsx#L73) — 트렌드 + 목표
- [Voucher.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Voucher.tsx#L62) — 예산 + 증빙

> [!TIP]
> **제안 컴포넌트**: `<TwoPaneLayout>`
> ```tsx
> function TwoPaneLayout({ main, sidebar }: { main: ReactNode, sidebar: ReactNode }) {
>   return (
>     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
>       <div className="lg:col-span-2">{main}</div>
>       <div className="space-y-6">{sidebar}</div>
>     </div>
>   );
> }
> ```

---

### 5. Status Badge 매핑 로직

**발생 빈도**: 8개 페이지

`status → variant/label` 매핑이 각 페이지에서 인라인으로 반복됩니다:

```tsx
// 여러 곳에서 반복되는 패턴
<Badge variant={
  status === 'APPROVED' ? 'success' :
  status === 'PENDING' ? 'warning' : 'info'
}>
  {status === 'APPROVED' ? '승인완료' :
   status === 'PENDING' ? '검토대기' : '분석중'}
</Badge>
```

반복 위치:
- [Dashboard.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Dashboard.tsx#L92-L94) — 로그 상태
- [LogEntries.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/LogEntries.tsx#L144-L150) — 로그 상태
- [AuditReports.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/AuditReports.tsx#L109-L115) — 리포트 상태
- [ERP.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/ERP.tsx#L65-L67) — 연결 상태
- [Security.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Security.tsx#L117-L119) — 접근 로그 상태

> [!TIP]
> **제안**: Status Mapping 유틸리티 + `<StatusBadge>` 컴포넌트
> ```tsx
> const STATUS_MAP: Record<string, { variant: string; label: string }> = {
>   APPROVED: { variant: 'success', label: '승인완료' },
>   PENDING_REVIEW: { variant: 'warning', label: '검토대기' },
>   AI_ANALYZING: { variant: 'info', label: '분석중' },
>   DRAFT: { variant: 'warning', label: '작성중' },
>   // ...
> };
> 
> function StatusBadge({ status }: { status: string }) {
>   const { variant, label } = STATUS_MAP[status] ?? { variant: 'outline', label: status };
>   return <Badge variant={variant}>{label}</Badge>;
> }
> ```

---

### 6. Data List Items (항목 리스트 행)

**발생 빈도**: 4개 페이지

`icon + title + metadata + status badge` 형태의 리스트 행이 반복됩니다:

```tsx
// Dashboard.tsx (L75-95) — 로깅 피드
<div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border ...">
  <div className="flex items-center space-x-4">
    <div className="p-2 rounded-full bg-slate-900 border border-slate-800">
      <Icon className="w-4 h-4" />
    </div>
    <div>
      <p className="text-sm font-medium text-white">{title}</p>
      <p className="text-xs text-slate-500">{metadata}</p>
    </div>
  </div>
  <Badge ...>{status}</Badge>
</div>
```

유사 패턴 반복 위치:
- [Dashboard.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/Dashboard.tsx#L75-L96) — 실시간 로깅 피드
- [LogEntries.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/LogEntries.tsx#L122-L158) — 인입 데이터 목록
- [AuditReports.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/AuditReports.tsx#L79-L122) — 리포트 목록
- [ERP.tsx](file:///c:/Antigravity_Workspace/my_RPA_AI_SaaS_project_root/Proto%20types/trae_proto/RPA_AI_Saas/src/pages/ERP.tsx#L143-L164) — 동기화 로그 목록

> [!TIP]
> **제안 컴포넌트**: `<ListItem>`
> ```tsx
> interface ListItemProps {
>   icon: ReactNode;
>   title: string;
>   subtitle?: string;
>   trailing?: ReactNode;
>   onClick?: () => void;
>   href?: string;
>   className?: string;
> }
> ```

---

## 🏗️ 추천 컴포넌트 아키텍처

리팩토링 후의 이상적인 디렉토리 구조:

```
src/components/
├── ui/                          # 기존 Radix 기반 원자 컴포넌트
│   ├── badge.tsx
│   ├── button.tsx
│   ├── card.tsx
│   └── table.tsx
│
├── shared/                      # ✨ 새로 추출할 공유 컴포넌트
│   ├── PageHeader.tsx           # 패턴 1
│   ├── StatCard.tsx             # 패턴 2
│   ├── StatsGrid.tsx            # 패턴 2
│   ├── ProgressBar.tsx          # 패턴 3
│   ├── TwoPaneLayout.tsx        # 패턴 4
│   ├── StatusBadge.tsx          # 패턴 5
│   └── ListItem.tsx             # 패턴 6
│
├── Layout.tsx                   # 기존 레이아웃
└── ...
```

---

## 📈 리팩토링 효과 예측

| 지표 | Before | After (예상) |
|:---|:---|:---|
| 총 코드 줄 수 | ~1,700줄 | ~1,050줄 |
| 페이지별 평균 줄 수 | ~140줄 | ~85줄 |
| 중복 코드율 | ~40% | ~10% |
| 공유 컴포넌트 수 | 4개 (ui) | 11개 (ui + shared) |
| 새 페이지 추가 시간 | 높음 (복사+수정) | 낮음 (조합) |

---

## ⚡ 우선순위 추천

| 순위 | 컴포넌트 | 사유 |
|:---|:---|:---|
| 🥇 1 | `PageHeader` | 모든 페이지에서 사용, 가장 쉬운 추출 |
| 🥇 1 | `StatusBadge` | 인라인 분기 로직 제거로 가독성 대폭 향상 |
| 🥈 2 | `StatCard` + `StatsGrid` | 4개 페이지, 각 4개씩 = 16개 카드 중복 제거 |
| 🥈 2 | `ProgressBar` | 12회 이상 반복, 단순 props 추출로 즉시 효과 |
| 🥉 3 | `TwoPaneLayout` | 레이아웃 일관성 보장 |
| 🥉 3 | `ListItem` | 데이터 리스트 패턴 통합 |

> [!IMPORTANT]
> 이 분석은 프로토타입(Trae)을 기반으로 합니다. 실제 MVP 구현 시 이 패턴들을 처음부터 공유 컴포넌트로 설계하면 **개발 속도와 UI 일관성** 모두 크게 향상됩니다.
