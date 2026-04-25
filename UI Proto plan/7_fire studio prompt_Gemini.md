

---

### 🚀 FactoryAI UI/UX 상세 구현용 마스터 프롬프트

**[Design System Context]**
* **Theme:** 신뢰감 있는 "Industrial Navy & Slate" 톤의 B2B SaaS 대시보드.
* **Typography:** Google Sans 또는 Pretendard (Clean Sans-serif), 본문 14-16px, 헤더 20-24px.
* **Color Palette:**
    * Primary: Deep Blue (#1A365D)
    * Success: Emerald Green (승인/정상)
    * Warning: Amber Orange (결측치/주의/보류)
    * Critical: Ruby Red (이상탐지/보안위반/에러)
* **Components:** Shadcn/ui 스타일의 정갈한 보더와 그림자 효과 적용.

---

#### 1. 공통 헤더 및 시스템 알림 (Foundation & Noti)
* **Header:** 왼쪽 로고 'FactoryAI', 중앙 메뉴(현장로깅/이상탐지/감사리포트/ERP연동/보안콘솔), 오른쪽 사용자 프로필 및 알림 종 아이콘.
* **Notification Bell:** 클릭 시 슬라이드 다운되는 '알림 피드'. 각 항목은 심각도별 배경색(INFO-White, WARNING-Yellow tint, CRITICAL-Red tint)을 가지며 '읽음 처리' 체크마크 포함.
* **AI Status Indicator:** AI 작업 실행 시 우측 하단에 플로팅되는 '처리 상태 바'. "AI 분석 중 (15초 경과...)" 메시지와 함께 "안전하게 순차 처리 중입니다"라는 보조 텍스트 노출.
* **Connectivity Banner:** 오프라인 시 상단에 고정되는 "네트워크 단절: 연결 복구 후 자동 재전송됩니다"라는 주황색 경고 띠.

#### 2. AI 패시브 로깅 및 데이터 검수 (E1 & E2B)
* **모바일 입력 위젯 (E1):**
    * **Audio Recorder:** 원형 'Mic' 버튼, 녹음 시 실시간 파형 애니메이션, 전송 시 'AI 처리 중' 스피너 레이어.
    * **Vision Camera:** 촬영용 뷰파인더, 촬영 후 즉시 썸네일 노출. 실패 시 "화질 불량: 다시 촬영해 주세요" 토스트 팝업.
* **데이터 검수 웹 뷰어 (E1-UI-003):** 2분할 화면.
    * **좌측:** 촬영된 이미지 원본 또는 음성 파형 플레이어.
    * **우측:** Editable Table. AI가 파싱한 값(온도, 압력 등)이 미리 채워져 있고, 사용자가 직접 수정 가능.
    * **Footer:** [Approve(Green)], [Reject(Red)] 버튼. 버튼 클릭 시 "감사 로그가 자동으로 기록됩니다" 문구 노출.

#### 3. XAI 품질 이상 탐지 대시보드 (E2B)
* **Main Dashboard (2-Pane):**
    * **Left List:** 이상 징후 발생 이력 테이블. 상태(PENDING/JUDGED), 시간, 설비명, 심각도(Badge). PENDING 항목은 붉은색 점멸 효과.
    * **Right Detailed Panel:** 리스트 클릭 시 확장.
        * **XAI Explanation Box:** "CNC-3번 라인 온도가 설정값 대비 2.3°C 높습니다..." 등의 한국어 자연어 설명이 강조된 카드 형태.
        * **Data Highlighting:** 이상 데이터 항목에 노란색 형광펜 효과 및 빨간색 테두리 적용.
        * **Mini Charts:** Recharts를 활용한 최근 30분간의 추세선 차트. 이상 발생 지점에 'X' 마커 표시.
        * **Manual Judgment Box (Fallback):** AI 설명 생성 실패 시 노출되는 영역. "⚠️ AI 설명 불가" 배너와 함께 원본 데이터 로우(Raw Data)를 직접 표로 보여줌.

#### 4. 감사 리포트 및 ERP 브릿지 (E2 & E3)
* **Audit Report 생성기 (E2):** 날짜 범위 선택기, 규제 표준(HACCP 등) 선택 드롭다운, [생성] 버튼. 하단에 생성된 PDF 리포트의 전체 페이지 썸네일 그리드.
* **ERP Status 모니터 (E3):** 3개의 큰 수치 카드(연결된 테이블 수, 마지막 동기화 시간, 정합성 수치).
* **Excel Upload Preview (E3-UI-002):** 파일을 끌어다 놓으면 하단에 임시 테이블 생성. 파싱 에러가 난 행(Row)은 빨간색으로 하이라이트되고 '사유' 열에 툴팁으로 상세 에러 표시.
* **Consistency Gauge:** Recharts RadialBarChart를 이용해 ERP와 내부 데이터 간의 일치율(목표 2% 이내)을 시각화.

#### 5. 보안 콘솔 및 성과 가시화 (E6 & E7)
* **Security Console (E6-UI-001):**
    * **Audit Trail Explorer:** 모든 사용자 활동(로그인, 수정, 승인)을 시간순으로 보여주는 무한 스크롤 테이블.
    * **Access Denial Feed:** 보안 위반(미인가 접근 등) 발생 시 실시간으로 올라오는 빨간색 알림 스트림.
* **Performance Dashboard (E7):** 상단에 4개의 페르소나 탭(COO, 구매본부장, 품질이사, CFO).
    * 각 탭 클릭 시 해당 역할의 KPI 카드(예: CFO 탭 - 누적 절감액 ₩4,500만)와 관련 시계열 차트 노출.
* **NPS 설문 위젯:** 대시보드 하단에 팝업되는 1-10점 선택 버튼 및 레퍼런스 동의 체크박스.

#### 6. 대외용 ROI 계산기 (E4)
* **Step-by-Step 입력 폼:** 업종(금속/식품), 직원 수, 매출액을 입력하는 인터랙티브 슬라이더.
* **ROI Result Grid:**
    * **카드 1:** 정부 바우처 매칭 예상액.
    * **카드 2:** 기업 자부담 최소 금액.
    * **카드 3:** 도입 후 예상 Payback 기간 (예: "14개월").
* **Before-After Comparison:** 도입 전(결측률 40%) vs 도입 후(결측률 5%)를 비교하는 큰 폰트의 대비 카드.

#### 7. SVC 온보딩/바우처 파이프라인 (SVC-SYS)
* **Pipeline Visualizer:** 4단계(온보딩) 또는 6단계(바우처) 가로형 스텝퍼. 현재 단계는 펄스 효과와 함께 '진행 중' 표시.
* **Checklist Sidebar:** 각 단계의 필수 문서/작업 완료 체크박스. 체크 시 중앙의 '전체 진행률' 프로그레스 바가 즉시 업데이트.

---

**[Interaction Requirements for Firebase Studio]**
1.  **Empty State:** 데이터가 없을 때는 "조회된 데이터가 없습니다" 메시지와 함께 가이드 아이콘 표시.
2.  **Loading State:** 테이블 로딩 시 Skeleton 화면 처리.
3.  **Responsive Design:** 사이드바 메뉴는 1024px 이하에서 아이콘 형태로 축소, 모바일에서는 햄버거 메뉴로 전환.