import os

base_dir = r'E:\Antigavity Workspace\my_RPA_AI_SaaS_workbace\wiki\features'
os.makedirs(base_dir, exist_ok=True)

features = {
    'E1_패시브_로깅': '''---
tags: [feature, software_epic, MVP_Must]
---
# E1: 무입력 패시브 로깅 (STT + Vision)

## 🎯 목적
작업자의 타이핑이나 터치 입력 없이 음성과 카메라 이미지 현장 데이터를 자동으로 수집하여 [[2차 자동화 공백 (Second Automation Gap)]]을 해소합니다.

## ✨ 주요 기능
- **음성 로깅 (STT)**: Gemini STT API를 활용하여 공정 상태를 텍스트로 변환
- **비전 파싱 (Vision)**: 모바일 카메라로 촬영된 완성품/계기판 이미지를 파싱하여 상태 값 자동 기록
- **롤백/수정 뷰어**: AI 오인식 시 관리자가 쉽게 Approve/Reject 할 수 있는 UI 제공 (결측률 ≤5% 목표)

## 🔗 연관 관계
- 관련 페르소나: [[COO]]
- 의존성: [[Zero-Touch 패시브 로깅 (STT+Vision)]], [[HITL (Human-in-the-Loop)]]
- 주요 데이터 모델: [[LOG_ENTRY]], [[DATA_SOURCE]], [[APPROVAL]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-001 ~ 008)
''',

    'E2_원클릭_감사리포트': '''---
tags: [feature, software_epic, MVP_Must]
---
# E2: 원클릭 감사 리포트 (Lot Merge + PDF)

## 🎯 목적
원청사의 불시 감사 및 규제에 대응하기 위해 현장 로깅 데이터와 ERP 데이터를 병합하여 즉각적인 추적성(Traceability) 리포트를 발행합니다.

## ✨ 주요 기능
- **Lot 데이터 병합**: 로깅 데이터와 ERP 데이터를 시간순으로 병합 (타임스탬프 중복/역전 자동 감지)
- **PDF 원클릭 생성**: 필수 데이터 검증 후 XAI 판단 근거가 포함된 규제 포맷 PDF 생성
- **결측치 자동 알림**: 누락된 데이터 발생 시 결측치 목록과 보완 알림을 즉시 발송

## 🔗 연관 관계
- 관련 페르소나: [[구매본부장]], [[품질이사]]
- 관련 데이터 모델: [[LOT]], [[AUDIT_REPORT]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-009 ~ 013)
''',

    'E2-B_품질_XAI_이상탐지': '''---
tags: [feature, software_epic, MVP_Must]
---
# E2-B: 품질 XAI 이상탐지

## 🎯 목적
AI가 이상 징후를 발견했을 때 블랙박스로 두지 않고, 그 판단 근거를 한국어로 명확히 설명하여 의사결정권자(품질이사)의 신뢰를 확보합니다.

## ✨ 주요 기능
- **이상 탐지 XAI 생성**: 이상 징후 감지 시 한국어 설명 및 데이터 하이라이팅 표시
- **HITL 통제 강제화**: 품질이사의 승인 없이 AI가 단독으로 기계를 멈추거나 데이터를 발행하는 것을 시스템 레벨에서 원천 차단
- **수동 모드 전환**: XAI 모듈 장애 시 즉각 수동 판단 모드로 Fallback

## 🔗 연관 관계
- 관련 페르소나: [[품질이사]]
- 의존성: [[HITL (Human-in-the-Loop)]]
- 관련 데이터 모델: [[APPROVAL]], [[AUDIT_REPORT]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-014 ~ 018)
''',

    'E3_ERP_비파괴형_브릿지': '''---
tags: [feature, software_epic, MVP_Must]
---
# E3: ERP 비파괴형 브릿지

## 🎯 목적
기존 고객사의 레거시 시스템을 교체하거나 손상시키지 않고, 안전하게 필요한 데이터만 동기화하여 연동 비용과 정치적 허들을 제거합니다.

## ✨ 주요 기능
- **Read-Only 연결**: 더존 iCUBE, 영림원 K-System 등에 접근하여 읽기 권한으로만 데이터 조회 (Write 차단)
- **엑셀 덤프 임포트 지원**: API 연동이 아예 불가능한 극한의 폐쇄망 환경을 위한 드래그 앤 드롭 파싱 지원
- **스키마 변경 감지**: ERP 측 컬럼 구조 변경 감지 시 즉시 동기화를 멈추고 CIO에게 알림

## 🔗 연관 관계
- 관련 페르소나: [[CIO]]
- 의존성: [[비파괴형 ERP 브릿지]]
- 경쟁사 방어: [[더존_영림원]]
- 관련 데이터 모델: [[ERP_CONNECTION]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-019 ~ 023)
''',

    'E4_CFO_ROI_결재기': '''---
tags: [feature, software_epic, MVP_Should]
---
# E4: CFO용 ROI 진단·결재기

## 🎯 목적
'기술'이 아닌 '숫자'로 소통하는 CFO를 타겟으로, 솔루션 도입 시 예상되는 재무적 효과와 바우처 지원 혜택을 시뮬레이션하여 결재(계약)를 유도합니다.

## ✨ 주요 기능
- **지원금 매칭 시뮬레이터**: 기업 규모, 업종 입력 시 바우처 매칭 확률 및 자부담금 자동 계산
- **Payback 기간 산출**: 솔루션 도입 시 인건비 절감 등과 대비한 ROI 및 투자금 회수 시점 산출
- **동종 업종 B/A 카드**: 비슷한 환경의 타 공장 Before/After 벤치마크 데이터 제공

## 🔗 연관 관계
- 관련 페르소나: [[CFO]]
- 연관 개념: [[Switch Trigger (전환 트리거)]]
- 관련 데이터 모델: [[SUBSCRIPTION]], [[VOUCHER_PROJECT]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-024 ~ 028)
''',

    'E6_보안_패키지': '''---
tags: [feature, software_epic, MVP_Must]
---
# E6: 온프레미스 보안 패키지 (MVP/PROD 이중 모드)

## 🎯 목적
기업 데이터 외부 반출을 극도로 꺼리는 CISO의 보안 감사를 무사 통과하기 위한 아키텍처 및 보안 자동화 기능입니다.

## ✨ 주요 기능
- **이중 배포 지원**: 클라우드 버전(MVP)과 Docker 기반 로컬 온프레미스 버전(PROD) 코드베이스 일원화
- **네트워크 차단 검증**: 온프레미스에서 외부 트래픽이 0 byte임을 증명하는 모니터링 시스템
- **보안 문서 자동 생성**: CISO 심의에 필요한 ISMS 확인서 및 망분리 설계서 자동 발급
- **RBAC**: 5가지 역할(ADMIN, OPERATOR, AUDITOR, VIEWER, CISO) 기반 엄격한 접근 제어

## 🔗 연관 관계
- 관련 페르소나: [[CISO]]
- 의존성: [[100% 온프레미스 AI 패키지]]
- 관련 데이터 모델: [[SECURITY_REVIEW]], [[USER]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-029 ~ 034)
''',

    'E7_성과_대시보드': '''---
tags: [feature, software_epic, MVP_Should]
---
# E7: 성과 가시화 및 리텐션 대시보드

## 🎯 목적
매월 가시적인 ROI 성과를 DMU별로 커스텀하여 보여줌으로써 구독(MRR) 이탈을 막고 재계약을 유도합니다.

## ✨ 주요 기능
- **역할별 맞춤 대시보드**: 월말 마감 시 COO, 품질이사, CFO 등 역할에 맞는 주요 지표 위젯 자동 생성
- **누적 ROI 산출**: 절감된 시간과 비용을 자동 집계하여 수동 개입 없이 리포팅
- **NPS 설문 자동 발송**: 만족도 9~10점 고객을 식별해 레퍼런스 활용 동의 자동 수집

## 🔗 연관 관계
- 관련 페르소나: [[COO]], [[CFO]]
- 관련 데이터 모델: [[SUBSCRIPTION]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-035 ~ 039)
''',

    'SVC_바우처_및_현장_서비스': '''---
tags: [feature, service_epic, MVP_Must]
---
# SVC: 바우처 행정 대행 및 현장 온보딩 서비스

## 🎯 목적
소프트웨어(SaaS) 판매로 끝나는 것이 아니라, 정부 바우처 사업 서류 작업부터 하드웨어 설치, 안정화, 사후관리까지 100% 턴키로 대행하여 고객의 행정 부담(도입 장벽)을 0으로 만듭니다.

## ✨ 주요 서비스 범위
- **SVC-1 현장 온보딩**: 사전조사, 카메라/마이크 하드웨어 설치, 2주간 현장 동행 안정화 및 교육
- **SVC-2 바우처 턴키 대행**: 정부 스마트공장/AX 바우처 사업계획서 100% 대필 및 정부 포털 제출 대행
- **SVC-3 보안 심의 동행**: 영업 초기 CISO 미팅 동행, 아키텍처 PT 지원 및 사전 보안 문서(망분리 설계서 등) 준비
- **SVC-4 사후관리 대행**: 정부 감리 대응, 정산서 및 분기별 성과보고서 자동 생성 및 제출 지원
- **SVC-5 현장 장애 출동**: 장애 발생 시 원격 진단(1시간 내) 및 불가 시 수도권 4시간/비수도권 8시간 내 현장 출동

## 🔗 연관 관계
- 관련 페르소나: [[CFO]] (비용 부담 완화), [[COO]] (설치 부담 완화), [[CISO]] (보안 우려 해소)
- 관련 데이터 모델: [[ONBOARDING_PROJECT]], [[VOUCHER_PROJECT]], [[SECURITY_REVIEW]]

## 📚 출처
- [[18_SRS_V07]] (REQ-FUNC-046 ~ 059)
'''
}

for name, content in features.items():
    file_path = os.path.join(base_dir, f'{name}.md')
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Successfully created {len(features)} feature files in {base_dir}")
