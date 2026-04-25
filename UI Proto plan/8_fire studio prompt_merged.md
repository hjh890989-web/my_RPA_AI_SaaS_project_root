# FactoryAI — Firebase Studio UI 프로토타이핑 마스터 프롬프트

## 프로젝트 개요
**FactoryAI**는 중소 제조공장(금속가공·식품제조)을 위한 AI 기반 생산관리 SaaS 플랫폼입니다.
작업자 추가 입력 없이 음성(STT)·이미지(Vision)로 현장 데이터를 수집하고, AI가 자동 구조화한 뒤
반드시 인간 승인(HITL)을 거쳐야만 외부 발행되는 "AI 단독 실행 0건" 원칙의 제조 품질관리 시스템입니다.

---

## 🎨 디자인 시스템 및 공통 상호작용 규칙 (Design System Context)
기술 스택과 아키텍처는 Firebase Studio가 자동으로 선택하되, 다음의 UI/UX 톤앤매너와 인터랙션 규칙을 반드시 적용해 주세요.

* **Theme:** 신뢰감 있는 "Industrial Navy & Slate" 톤의 B2B SaaS 대시보드. (다크모드 기반의 제조 현장 친화적 디자인)
* **Typography:** Google Sans 또는 Pretendard (Clean Sans-serif), 본문 14-16px, 헤더 20-24px. 한국어에 최적화된 폰트 사용.
* **Color Palette:**
  * Primary: Deep Blue (#1A365D) 및 Mint (#4ECDC4)
  * Accent: Coral (#FF6B6B)
  * Success: Emerald Green (🟢 정상 / 승인)
  * Warning: Amber Orange (🟡 경고 / 결측치 / 보류)
  * Critical: Ruby Red (🔴 위험 / 이상탐지 / 보안위반 / 에러)
  * Info: Blue (🔵 정보)
* **Components:** Shadcn/ui 스타일의 정갈한 보더와 그림자 효과 적용.

### 💡 글로벌 인터랙션 및 상태(State) 요구사항
1. **Empty State:** 데이터가 없을 때는 "조회된 데이터가 없습니다" 메시지와 함께 가이드 아이콘 표시.
2. **Loading State:** 테이블 및 화면 로딩 시 Skeleton 화면 처리.
3. **Responsive Design:** 데스크톱(1280px+)을 기본으로 하되 사이드바 메뉴는 1024px 이하에서 아이콘 형태로 축소, 모바일에서는 햄버거 메뉴로 전환 지원.
4. **Connectivity Banner:** 오프라인 시 상단에 고정되는 "네트워크 단절: 연결 복구 후 자동 재전송됩니다"라는 주황색 경고 띠.
5. **Animation:** 카드 호버 효과, 페이지 전환 트랜지션, 버튼 클릭 시 펄스 애니메이션, 알림 팝업 슬라이드 적용.

---

## 👥 사용자 권한 및 대상 업종

### 사용자 역할 (5역할 RBAC)
| 역할 | 페르소나 | 핵심 업무 |
|:---|:---|:---|
| ADMIN | 한성우 COO | 전체 관리, ERP 동기화, 대시보드 발행 |
| OPERATOR | 박작업 작업자 | 음성/카메라 로깅, 엑셀 업로드 |
| AUDITOR | 클레어 리 품질이사 | 감사 리포트 승인, XAI 검토, 품질 판단 |
| VIEWER | 이뷰어 열람자 | 읽기 전용 조회 |
| CISO | 최보안 보안책임자 | 보안 콘솔, 감사 로그, 네트워크 모니터링 |

### 대상 업종 (2개 버티컬)
- **금속가공** (대한금속 주식회사, 85명, 안산)
- **식품제조** (한국식품 주식회사, 120명, 천안)

---

## 🖥️ 전체 라우팅 구조

```text
/login                    — 로그인 (공개)
/dashboard                — 메인 대시보드
/log-entries              — 패시브 로깅 (음성/카메라/엑셀)
/log-entries/review       — HITL 승인 뷰어
/audit-reports            — 감사 리포트 생성/목록
/dashboard/xai            — XAI 이상탐지 대시보드
/dashboard/erp            — ERP 연동 관리
/roi-calculator           — ROI 계산기 (공개)
/dashboard/security       — CISO 보안 콘솔
/dashboard/performance    — 성과 대시보드 (4인 탭)
/admin/onboarding         — 온보딩 관리
/admin/voucher            — 바우처 관리
```

---

## 📱 화면 목록 및 상세 명세

*(모든 데이터는 하단 'Mock 데이터 가이드'를 활용해 채워주세요)*

### 1. 로그인 페이지 (`/login`)
- **접근**: 전체 공개
- **구성요소**:
  - 왼쪽 로고 'FactoryAI' + "스마트 공장 AI 관리 플랫폼" 서브 타이틀
  - 이메일 / 비밀번호 입력 필드
  - [로그인] 버튼
  - 에러 시 토스트: "이메일 또는 비밀번호가 올바르지 않습니다"
  - 데모용 퀵 로그인 버튼 5개 (각 역할별): `COO 로그인` `작업자 로그인` `품질이사 로그인` `열람자 로그인` `CISO 로그인`

### 2. 메인 대시보드 (`/dashboard`)
- **접근**: 인증 사용자 전체
- **공통 헤더**: 왼쪽 로고, 중앙 메뉴, 우측 사용자 프로필 + 알림 종 아이콘(미읽음 카운트 뱃지 포함) + 공장명
- **알림 피드 (종 아이콘 클릭 시)**: 슬라이드 다운 팝업. 각 항목 심각도별 배경색 차등 적용, 클릭 시 읽음 처리 체크마크.
- **좌측 사이드바**: 역할별 메뉴 노출 (대시보드, 패시브 로깅, 감사 리포트, XAI 등)
- **메인 영역 (KPI 서머리 카드 4개)**:
  - 📦 이번 달 로깅 건수: `342건` (전월 대비 +12%)
  - 📉 결측률: `3.8%` (목표 ≤5% 🟢)
  - 📄 감사 리포트: `8건 발행` / `2건 대기`
  - ⏱️ 미승인 건: `3건 PENDING` (30분 초과 1건 🔴)
- **차트 영역**: 일별 결측률 추세 꺾은선 그래프, 라인별 가동 상태 막대 차트.

### 3. 패시브 로깅 — 데이터 수집 (`/log-entries`)
- **접근**: ADMIN, OPERATOR, AUDITOR, VIEWER(읽기)
- **상단 탭**: `음성 녹음` | `카메라 촬영` | `엑셀 업로드`
- **음성 녹음 위젯**: 원형 마이크 버튼(누를 시 펄스 애니메이션), 실시간 파형 시각화.
  - 전송 시 'AI 처리 상태 바' 플로팅: "AI 분석 중 (15초 경과...)" -> 순차 처리 중입니다.
- **카메라 촬영 위젯**: 뷰파인더, 촬영 후 썸네일 노출. 실패 시 "화질 불량 — 재촬영해 주세요" 토스트.
- **엑셀 업로드**: 드래그&드롭 영역. 실패 행은 빨간색 테두리/배경 강조 및 툴팁으로 에러 표시.

### 4. HITL 승인 뷰어 — 롤백/수정 (`/log-entries/review`)
- **접근**: ADMIN, AUDITOR
- **레이아웃**: 2분할 화면 (2-Pane)
- **좌측 PENDING 목록**: 시간/유형/라인명 등 표시. PENDING 항목은 붉은색 점멸 효과.
- **우측 상세 패널 (클릭 시 확장)**:
  - **상단**: 오디오 플레이어 또는 원본 뷰파인더 썸네일.
  - **중단**: AI 파싱 결과가 미리 채워진 Editable Table. 사용자 수정 가능.
  - **하단**: `✅ 승인 (Approve)` / `❌ 거절 (Reject)` 버튼. 클릭 시 "감사 로그가 자동으로 기록됩니다" 문구 노출.

### 5. 감사 리포트 (`/audit-reports`)
- **접근**: ADMIN, AUDITOR, VIEWER(읽기)
- **리포트 생성기**: 날짜 DatePicker, 규제 표준(HACCP 등) 선택, [1클릭 생성] 버튼. 하단에 생성된 PDF 리포트 썸네일 그리드 뷰.
- **예외 처리**: 결측치 감지 시 🔴 모달 노출("다음 항목이 기록되지 않았습니다"), Lot 충돌 시 드래그&드롭 순서 조정 UI 노출.

### 6. XAI 품질 이상 탐지 대시보드 (`/dashboard/xai`)
- **접근**: ADMIN, AUDITOR, OPERATOR
- **레이아웃**: 2분할 화면
- **좌측 이상 징후 목록**: PENDING 건 🔴 빨간 뱃지 최상단 정렬.
- **우측 상세 패널**:
  - **AI 설명 박스**: "CNC-3번 라인 온도 2.3°C 높음..." 자연어 설명 강조 카드.
  - **데이터 하이라이팅**: 이상치에 노란색 형광펜 + 빨간 테두리.
  - **미니 차트**: 30분 추세선 차트(Recharts), 이상 지점 'X' 마커.
  - **수동 판단 모드(Fallback)**: AI 설명 불가 시 ⚠️ 배너 표시 후 원본 데이터 테이블 노출.

### 7. ERP 연동 관리 (`/dashboard/erp`)
- **접근**: ADMIN 전용
- **모니터링 대시보드**: 3개의 큰 상태 카드 (연결 상태 / 마지막 동기화 / 연결 테이블 수).
- **수동 동기화**: [동기화 실행] 버튼 + 진행률 표시 + 5분 쿨다운.
- **정합성 게이지**: Recharts RadialBarChart를 활용해 일치율 표기 (0~2%🟢, 목표선 2%).

### 8. ROI 계산기 (`/roi-calculator`)
- **접근**: 비인증 공개 페이지
- **입력 폼**: 업종, 직원 수, 연 매출, 라인 수 인터랙티브 입력(슬라이더 등).
- **결과 그리드**:
  - 바우처 매칭 카드, 자부담 최소 금액 카드, Payback 기간 카드.
  - **Before-After 카드**: 도입 전(결측률 40%) vs 도입 후(결측률 5%) 크고 명확한 대비를 보여주는 비교 카드 그리드.

### 9. CISO 보안 콘솔 (`/dashboard/security`)
- **접근**: CISO, ADMIN
- **Audit Trail 탐색기**: 무한 스크롤 형태의 활동 이력 테이블.
- **보안 이벤트 피드**: 미인가 접근 시 실시간으로 올라오는 빨간색 알림 스트림.
- **보안 체크리스트**: 8개 주요 보안 항목 체크 현황판.

### 10. 성과 대시보드 (`/dashboard/performance`)
- **접근**: 인증 사용자 전체
- **4인 페르소나 탭**: COO, 구매본부장, 품질이사, CFO 탭 클릭 시 해당 역할의 전용 KPI 카드 4종 + 시계열 차트 스위칭.
- **NPS 설문 위젯**: 하단 팝업되는 1~10점 선택 UI 및 동의 체크박스.

### 11. 온보딩 및 바우처 관리 (`/admin/...`)
- **파이프라인 비주얼라이저**: 4단계(온보딩) 또는 6단계(바우처) 가로형 스텝퍼 컴포넌트 적용. 현재 단계 펄스 효과 적용.
- **체크리스트 사이드바**: 각 단계 문서 완료 체크 시 중앙 프로그레스 바 실시간 업데이트.

---

## 🗄️ Mock 데이터 가이드 (데모 시연용 데이터 세팅)

**사용자 (10명)**
| 이름 | 이메일 | 역할 | 소속 공장 |
|:---|:---|:---|:---|
| 한성우 | coo@metalfactory.co.kr | ADMIN | 대한금속 |
| 김관리 | admin2@foodfactory.co.kr | ADMIN | 한국식품 |
| 박작업 | op1@metalfactory.co.kr | OPERATOR | 대한금속 |
| 이작업 | op2@foodfactory.co.kr | OPERATOR | 한국식품 |
| 클레어 리 | auditor1@metalfactory.co.kr | AUDITOR | 대한금속 |
| 차품질 | auditor2@foodfactory.co.kr | AUDITOR | 한국식품 |
| 이뷰어 | viewer1@metalfactory.co.kr | VIEWER | 대한금속 |
| 정뷰어 | viewer2@foodfactory.co.kr | VIEWER | 한국식품 |
| 최보안 | ciso1@metalfactory.co.kr | CISO | 대한금속 |
| 강보안 | ciso2@foodfactory.co.kr | CISO | 한국식품 |

**공장 & 라인**
- **대한금속**: CNC절삭가공(ACTIVE), 프레스성형(ACTIVE), 표면처리(MAINTENANCE)
- **한국식품**: 원재료혼합(ACTIVE), 충전포장(ACTIVE), 멸균살균(IDLE)

**로그 엔트리 (60건 = STT 20 + VISION 20 + EXCEL 20)**
- 상태 분포: PENDING 18건 / APPROVED 38건 / REJECTED 4건
- STT raw_data 예: `{ "transcript": "CNC-3번 공정 시작, 온도 180도 확인", "confidence": 0.92 }`
- VISION raw_data 예: `{ "detected_values": { "temperature": 182, "pressure": 4.5 }, "confidence": 0.88 }`

**감사 리포트 (3건)**
- 삼성QA/금속가공/VERIFIED, 현대/금속가공/VERIFIED, HACCP/식품제조/FLAGGED(미승인)

**ERP Mock 데이터**
- 재고 20건, 발주 15건, 실적 30건 (더존 iCUBE 스키마 모방)
