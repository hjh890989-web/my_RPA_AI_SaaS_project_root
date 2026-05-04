/**
 * @file Landing.tsx — FactoryAI 랜딩페이지 (Rescue Team 테마)
 * @description 잠재 고객의 극한 페인포인트(SPOF, 감사 벤더 탈락 위기)를 '재난'으로 규정하고, 
 *   자사를 '구조대'로 포지셔닝하여 감정적 공감과 안도감을 이끌어내는 고도화된 B2B 마케팅 페이지.
 */
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic, Camera, FileText, Shield, BarChart3, Zap,
  ArrowRight, CheckCircle2, Lock, Eye, Activity, 
  TrendingUp, Factory, Database, Briefcase,
  AlertTriangle, Crosshair, Siren, Flame, LifeBuoy
} from 'lucide-react'
import './landing.css'

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible') },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function FadeSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn()
  return <div ref={ref} className={`fade-in-section ${className}`}>{children}</div>
}

function Navbar({ onCTA }: { onCTA: () => void }) {
  const [scrolled, setScrolled] = React.useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])
  
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} style={{cursor: 'pointer'}}>
        Factory<span style={{ color: '#EF4444' }}>Rescue</span>
      </div>
      <div className="nav-links">
        <button onClick={() => scrollTo('features')}>기능 소개</button>
        <button onClick={() => scrollTo('structure')}>대응 체계</button>
        <button onClick={() => scrollTo('visualization')}>도입 효과</button>
        <button onClick={() => scrollTo('testimonials')}>생생한 후기</button>
        <button onClick={() => scrollTo('pricing')}>구출 플랜</button>
      </div>
      <button className="nav-cta" onClick={onCTA}>
        <Siren className="w-3 h-3 inline-block mr-1" /> 긴급 구조 요청
      </button>
    </nav>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const goLogin = () => navigate('/login')

  return (
    <div style={{ background: '#050a14', color: '#e2e8f0', overflowX: 'hidden' }}>
      <Navbar onCTA={goLogin} />

      {/* ════════════ HERO SECTION (The Rescue Call) ════════════ */}
      <section className="landing-hero">
        <div className="grid-pattern" />
        <div className="particle" style={{ left: '10%' }} />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />
        <div className="particle" />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '160px 24px 80px', textAlign: 'center' }}>
          <div className="landing-badge">
            <span className="pulse-dot" />
            업무 과다 및 조업 중단 위기 대응 전담 솔루션
          </div>

          <h1 className="landing-headline" style={{ marginTop: 28 }}>
            지금 <span style={{ color: '#EF4444' }}>엑셀</span>을 사용하고 계십니까?<br /> 그러면 당신은 <span style={{ color: '#EF4444' }}>구조대상</span>입니다.
          </h1>

          <p className="landing-subhead" style={{ margin: '24px auto 0' }}>
            지금 즉시 FactoryAI 구조대를 투입하십시오.<br />
            현장 작업자의 거센 반발, 스케줄러 퇴사로 인한 공장 마비의 공포,<br />
            그리고 데이터 조작 의심을 받는 지옥 같은 엑셀 수작업에서 귀하를 구출합니다.<br />
            FactoryAI는 <strong>무중단 구조 작전(Traceability 브릿지)</strong>을 실행합니다.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <button className="cta-primary" onClick={goLogin}>
              <LifeBuoy style={{ width: 18, height: 18 }} />
              긴급 구조(데모) 요청하기
            </button>
            <button className="cta-secondary" onClick={() => navigate('/roi-calculator')}>
              <Shield style={{ width: 18, height: 18 }} />
              원클릭 감사 방어막 가동
            </button>
          </div>

          {/* Stats bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#4ECDC4', background: 'none', WebkitTextFillColor: 'initial' }}>0건</div>
              <div className="stat-label">현장 입력 노동 (Zero-Touch)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#EF4444', background: 'none', WebkitTextFillColor: 'initial' }}>10초</div>
              <div className="stat-label">Traceability 방어 증빙 생성</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#3B82F6', background: 'none', WebkitTextFillColor: 'initial' }}>100%</div>
              <div className="stat-label">기존 ERP 보존 (무중단)</div>
            </div>
            <div className="stat-item">
              <div className="stat-value" style={{ color: '#F59E0B', background: 'none', WebkitTextFillColor: 'initial' }}>80%</div>
              <div className="stat-label">정부 지원 구조 자금 (바우처)</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SUCCESSFUL RESCUES (Social Proof) ════════════ */}
      <section className="landing-section section-dark" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <FadeSection>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#EF4444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
            성공적인 구조 작전 레퍼런스
          </p>
          <div className="logo-wall">
            {['S/H사 실사 통과 지원', 'EU CBAM 대응팀 파트너', '중소벤처기업부 지정 구조반', '영림원/더존 무중단 연동', '스마트제조혁신추진단 인증'].map((name) => (
              <div className="logo-item" key={name}>
                <div className="logo-icon-box">
                  <Shield style={{ width: 16, height: 16, color: '#EF4444' }} />
                </div>
                {name}
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ════════════ NIGHTMARES (Red Alert) ════════════ */}
      <section className="landing-section section-darker">
        <FadeSection>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
            <Siren className="w-5 h-5 siren-active" />
            <p className="section-subtitle" style={{ margin: 0, fontWeight: 600, color: '#EF4444', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              RED ALERT: 현장 발령 경보
            </p>
            <Siren className="w-5 h-5 siren-active" />
          </div>
          <h2 className="section-title">지금 귀하의 공장은 고립 상태입니다</h2>
          <div className="feature-grid" style={{ marginTop: 40 }}>
            <div className="feature-card alert-card">
              <div className="feature-icon-box card-icon-active">
                <Flame style={{ width: 24, height: 24 }} />
              </div>
              <h3 style={{ color: '#fff' }}>[코드명: SPOF] 운영본부장의 공포</h3>
              <p>"핵심 스케줄러가 퇴사한다면? 공장은 즉시 마비됩니다. 억지로 도입한 키오스크는 현장에서 외면받고 데이터는 텅 비어갑니다."</p>
            </div>
            <div className="feature-card alert-card">
              <div className="feature-icon-box card-icon-active">
                <Crosshair style={{ width: 24, height: 24 }} />
              </div>
              <h3 style={{ color: '#fff' }}>[코드명: AUDIT] 품질이사의 수치심</h3>
              <p>"원청사의 기습 감사 통보. 며칠 밤을 새워 엑셀을 꿰맞춰도 돌아오는 건 '데이터 조작 의심'과 '벤더 탈락'이라는 극도의 수치심뿐입니다."</p>
            </div>
            <div className="feature-card alert-card">
              <div className="feature-icon-box card-icon-active">
                <AlertTriangle style={{ width: 24, height: 24 }} />
              </div>
              <h3 style={{ color: '#fff' }}>[코드명: BUDGET] 재무이사의 불신</h3>
              <p>"수억 원을 쏟아부은 과거 스마트공장 도입은 철저히 실패했습니다. 명확한 절감 액수와 든든한 지원금 없이는 단 1원도 결재할 수 없습니다."</p>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ RESCUE GEARS (Core Solutions) ════════════ */}
      <section id="features" className="landing-section section-dark">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tactical Rescue Gears</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            구조대의 특수 장비가 즉각 배포됩니다
          </h2>
          <p className="section-subtitle">
            기존의 느리고 복잡한 IT 시스템이 아닙니다. 생존을 위한 가장 빠르고 확실한 무기입니다.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-box gear-icon-active">
                <Mic style={{ width: 24, height: 24, color: '#4ECDC4' }} />
              </div>
              <h3>장갑을 벗지 마십시오 (패시브 레이더)</h3>
              <p>현장 소음을 뚫는 STT와 Vision AI가 작업자의 움직임을 은밀히 포착합니다. 작업자는 아무것도 입력할 필요가 없습니다.</p>
              <div className="feature-stat"><Zap style={{ width: 14, height: 14 }} /> 현장 반발 저항 0% 달성</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box gear-icon-active">
                <Shield style={{ width: 24, height: 24, color: '#3B82F6' }} />
              </div>
              <h3>10초 방탄 쉴드 (실사 완벽 방어)</h3>
              <p>기습 감사가 시작되면 버튼 하나만 누르십시오. 파편화된 Lot가 시간순으로 정렬된 Traceability PDF가 10초 만에 사출됩니다.</p>
              <div className="feature-stat"><CheckCircle2 style={{ width: 14, height: 14 }} /> 벤더 탈락 리스크 즉시 소멸</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box gear-icon-active">
                <Activity style={{ width: 24, height: 24, color: '#F59E0B' }} />
              </div>
              <h3>무중단 오토파일럿 (SPOF 제거)</h3>
              <p>특정 스케줄러가 내일 당장 사직서를 내도 공장은 멈추지 않습니다. 그들의 머릿속 노하우는 이미 시스템에 복제되어 있습니다.</p>
              <div className="feature-stat"><TrendingUp style={{ width: 14, height: 14 }} /> 공장 가동 마비 공포 제거</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box gear-icon-active">
                <Briefcase style={{ width: 24, height: 24, color: '#22C55E' }} />
              </div>
              <h3>CFO 전용 구호 자금 (정부 바우처)</h3>
              <p>예산 결재의 벽을 뚫어드립니다. 정부 예산 활용 컨설팅과 서류 작업을 100% 턴키 대행하여 자부담을 80% 줄입니다.</p>
              <div className="feature-stat"><BarChart3 style={{ width: 14, height: 14 }} /> 비용 리스크 없는 안전한 구출</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box gear-icon-active">
                <Database style={{ width: 24, height: 24, color: '#A855F7' }} />
              </div>
              <h3>비파괴형 무중단 침투 시스템</h3>
              <p>기존 ERP를 뜯어고치는 무모한 수술은 하지 않습니다. Read-Only 커넥터로 조용하고 안전하게 데이터만 동기화합니다.</p>
              <div className="feature-stat"><ArrowRight style={{ width: 14, height: 14 }} /> IT 도입 실패 매몰 비용 제로</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box gear-icon-active">
                <Lock style={{ width: 24, height: 24, color: '#EF4444' }} />
              </div>
              <h3>철통 보안, 통제권 회수 (온프레미스)</h3>
              <p>핵심 레시피가 클라우드로 새어나갈까 두려우십니까? 외부망과 차단된 완벽한 온프레미스 제어권을 되찾아 드립니다.</p>
              <div className="feature-stat"><Shield style={{ width: 14, height: 14 }} /> 데이터 외부 유출 100% 방어</div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ 3-TIER RESCUE OPERATION (Response Structure) ════════════ */}
      <section id="structure" className="landing-section section-dark">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#EF4444', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Response Structure</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>3단계 특수 대응 체계</h2>
          <p className="section-subtitle">
            단순한 소프트웨어 공급을 넘어, 귀사의 위기 단계에 맞춰 전문 구조 인력이 즉각 투입됩니다.
          </p>

          <div className="rescue-steps-container" style={{ marginTop: 60 }}>
            <div className="rescue-step-item">
              <div className="rescue-step-icon-wrapper">
                <Flame className="rescue-step-icon" style={{ color: '#EF4444' }} />
                <div className="rescue-step-number">01</div>
              </div>
              <div className="rescue-step-content">
                <h4>(초기) 진화팀</h4>
                <p><strong>당장 발등에 떨어진 불부터 끕니다.</strong><br />기습 감사 대응, 바우처 행정 턴키 대행, 비파괴형 ERP 브릿지 설치로 즉각적인 위기 상황을 해소합니다.</p>
              </div>
            </div>

            <div className="rescue-step-connector" />

            <div className="rescue-step-item">
              <div className="rescue-step-icon-wrapper">
                <LifeBuoy className="rescue-step-icon" style={{ color: '#4ECDC4' }} />
                <div className="rescue-step-number">02</div>
              </div>
              <div className="rescue-step-content">
                <h4>(중기) 구조팀</h4>
                <p><strong>혼란의 현장에서 공장을 구출합니다.</strong><br />STT/Vision AI 기반 패시브 로깅 배포 및 작업자 입력 노동 0% 달성. 특정 인원 의존 없는 시스템 스케줄링을 확립합니다.</p>
              </div>
            </div>

            <div className="rescue-step-connector" />

            <div className="rescue-step-item">
              <div className="rescue-step-icon-wrapper">
                <Shield className="rescue-step-icon" style={{ color: '#3B82F6' }} />
                <div className="rescue-step-number">03</div>
              </div>
              <div className="rescue-step-content">
                <h4>(상시) 방재팀</h4>
                <p><strong>재난의 재발을 원천 차단합니다.</strong><br />XAI 품질 이상탐지 상시 가동, HITL(인간 승인) 프로토콜 정착 및 온프레미스 망 분리로 핵심 기술 유출을 완벽 방어합니다.</p>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ BEFORE / AFTER COMPARISON (Rescue Result) ════════════ */}
      <section className="landing-section section-darker">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rescue Mission Report</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>과거의 지옥에서, 완벽한 통제로.</h2>

          <div className="comparison-grid">
            <div className="comparison-card comparison-before">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>고립된 공장 (Before)</div>
              <div className="comparison-value" style={{ color: '#EF4444', fontSize: '28px' }}>공포와 불신</div>
              <div className="comparison-label">언제 터질지 모르는 시한폭탄</div>
              <div className="comparison-items">
                <div className="comparison-item"><Flame style={{ width: 14, height: 14, color: '#EF4444' }} /> 현장은 키오스크를 외면하고 수기 작성</div>
                <div className="comparison-item"><Flame style={{ width: 14, height: 14, color: '#EF4444' }} /> 감사 전날, 엑셀을 조작하느라 밤을 샘</div>
                <div className="comparison-item"><Flame style={{ width: 14, height: 14, color: '#EF4444' }} /> 핵심 직원 퇴사 소문에 임원이 불안에 떪</div>
              </div>
            </div>

            <div className="comparison-divider">
              <div className="comparison-arrow-icon" style={{ borderColor: '#EF4444', color: '#EF4444', background: 'rgba(239,68,68,0.1)' }}>
                <LifeBuoy style={{ width: 20, height: 20 }} />
              </div>
              <span style={{ color: '#EF4444' }}>FactoryAI<br />구조대 투입</span>
            </div>

            <div className="comparison-card comparison-after">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#4ECDC4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>구출된 공장 (After)</div>
              <div className="comparison-value" style={{ color: '#4ECDC4', fontSize: '28px' }}>생산 무중단</div>
              <div className="comparison-label">원청사가 신뢰하는 철벽 방어</div>
              <div className="comparison-items">
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 작업자의 말과 행동이 그대로 자동 저장</div>
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 어떤 기습 감사에도 10초 만에 완벽 증빙</div>
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 시스템이 주도하는 흔들림 없는 스케줄링</div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ VISUAL DATA & DASHBOARD MOCKUP ════════════ */}
      <section id="visualization" className="landing-section section-dark">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#3B82F6', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>System Visualization</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>눈으로 확인하는 구출의 결과</h2>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>
            수치로 증명되는 야근 감소율과 완벽하게 통제되는 라이브 대시보드를 경험하십시오.
          </p>
          
          <div className="visual-dashboard-container">
            {/* Left: ROI Graph Mockup */}
            <div className="visual-card">
              <div className="visual-card-header">
                <h4>수기 입력 및 오류 발생률 추이</h4>
                <span className="badge-green">-98% 달성</span>
              </div>
              <div className="mock-graph-area">
                <svg viewBox="0 0 400 200" className="animated-graph">
                  <defs>
                    <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(239, 68, 68, 0.5)" />
                      <stop offset="100%" stopColor="rgba(239, 68, 68, 0)" />
                    </linearGradient>
                    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(78, 205, 196, 0.5)" />
                      <stop offset="100%" stopColor="rgba(78, 205, 196, 0)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                  {/* Red Line (Errors/Manual Work) */}
                  <path className="path-red" d="M 0 40 C 100 40, 150 160, 400 180" fill="none" stroke="#EF4444" strokeWidth="4" />
                  <path className="area-red" d="M 0 40 C 100 40, 150 160, 400 180 L 400 200 L 0 200 Z" fill="url(#redGrad)" />
                  
                  {/* Cyan Line (Accuracy/Productivity) */}
                  <path className="path-cyan" d="M 0 160 C 150 160, 200 40, 400 20" fill="none" stroke="#4ECDC4" strokeWidth="4" />
                  <path className="area-cyan" d="M 0 160 C 150 160, 200 40, 400 20 L 400 200 L 0 200 Z" fill="url(#cyanGrad)" />
                  
                  {/* Intervention Marker */}
                  <line x1="150" y1="0" x2="150" y2="200" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="5,5" />
                  <text x="160" y="20" fill="#94a3b8" fontSize="12" fontWeight="bold">구조대 투입 시점</text>
                </svg>
                <div className="graph-labels">
                  <span className="label-red"><div className="dot red"></div> 엑셀 수작업 및 야근</span>
                  <span className="label-cyan"><div className="dot cyan"></div> 데이터 정확도 (Traceability)</span>
                </div>
              </div>
            </div>

            {/* Right: Traceability Dashboard Mockup */}
            <div className="visual-card dashboard-ui">
              <div className="ui-header">
                <div className="ui-dots"><span className="dot close"></span><span className="dot min"></span><span className="dot max"></span></div>
                <div className="ui-title">Live Traceability Radar</div>
              </div>
              <div className="ui-body">
                <div className="ui-alert-bar">
                  <Shield size={16} /> 실시간 원청사 감사 완벽 방어 모드 (100% 무입력)
                </div>
                <div className="ui-log-list">
                  <div className="ui-log-item new">
                    <span className="time">14:02:11</span>
                    <span className="lot">Lot #A892-1</span>
                    <span className="desc">Vision AI 품질 검사 완료</span>
                    <span className="ui-tag success">Passed</span>
                  </div>
                  <div className="ui-log-item">
                    <span className="time">14:05:33</span>
                    <span className="lot">스케줄러</span>
                    <span className="desc">1번 라인 부하 예측 및 분산</span>
                    <span className="ui-tag primary">AI Re-routed</span>
                  </div>
                  <div className="ui-log-item">
                    <span className="time">14:10:05</span>
                    <span className="lot">현장 STT</span>
                    <span className="desc">"자재 B 투입 완료" 음성 인식</span>
                    <span className="ui-tag success">Auto-Logged</span>
                  </div>
                   <div className="ui-log-item">
                    <span className="time">14:15:22</span>
                    <span className="lot">보안 통제</span>
                    <span className="desc">망 분리 무결성 확인</span>
                    <span className="ui-tag secure"><Lock size={12}/> Secure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>
      {/* ════════════ TESTIMONIALS (Rescue Logs) ════════════ */}
      <section id="testimonials" className="landing-section section-darker">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rescue Logs</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>고립된 현장을 구출한 생생한 기록</h2>
          <p className="section-subtitle" style={{ marginBottom: 40 }}>
            각자의 위치에서 고군분투하던 리더들이 FactoryRescue 투입 후 얻게 된 완벽한 통제력.
          </p>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"수천만 원짜리 MES 화면을 장갑 낀 손으로 터치하라고 하니 매일이 현장 반장들과의 싸움이었습니다. 패시브 로깅 엔진 도입 후, 작업자들은 그냥 일만 하면 AI가 알아서 데이터를 쌓아줍니다. 현장에 평화가 찾아왔어요."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>박*만 (현장소장)</strong>
                  <span>D금속 현장 책임자</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"글로벌 고객사들이 부품 단위의 이력 데이터를 요구하기 시작했을 때 우리 시스템으론 불가능했습니다. 브릿지 솔루션 도입 한 달 만에 EU 실사를 무사히 통과했고, 오히려 신뢰도가 올라 추가 수주를 받았습니다."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>클*어 리 (구매본부장)</strong>
                  <span>G일렉트로닉스 공급망 총괄</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"수억 원을 허공에 날린 과거 스마트공장 실패 경험 때문에 AI 도입은 결사반대했습니다. 하지만 정부 바우처 턴키 대행으로 자부담금을 80% 줄여주었고, 3개월 만에 야근 수당 감소액으로 본전을 뽑았습니다. 최고의 투자였습니다."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>이*무 (재무이사/CFO)</strong>
                  <span>V테크 재무/투자 총괄</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"매일 저녁 8시까지 수기 일지를 엑셀로 타이핑하는 게 제 일과였습니다. 지금은 퇴근 직전 '일일 보고서 생성' 버튼 하나만 누르면 끝납니다. 제 워라밸을 구원해 준 고마운 솔루션입니다."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>최*진 (생산팀장)</strong>
                  <span>S테크 현장 데이터 관리</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"처음엔 컴퓨터가 내 머리를 어떻게 따라오냐며 호통을 쳤습니다. 그런데 이 놈이 내가 일하는 방식을 묵묵히 기록하더니 후배들에게 똑같이 지시하더군요. 내 30년 평생의 노하우가 회사에 영원히 남게 되어 흐뭇합니다."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>노*풍 (창업주/회장)</strong>
                  <span>C기계 30년 현장 장인</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">"상장 심사를 위해선 '사람'이 아닌 '데이터'로 돌아가는 회사를 증명해야 했습니다. FactoryRescue 도입 후 우리 공장은 완벽한 데이터 주도(Data-Driven) 기업으로 탈바꿈하여 코스닥 진입의 큰 산을 넘었습니다."</p>
              <div className="testimonial-author">
                <div className="author-info">
                  <strong>강*현 (대표이사/CEO)</strong>
                  <span>W산업 최고 경영자</span>
                </div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ PRICING / SUBSCRIPTION TIERS ════════════ */}
      <section id="pricing" className="landing-section section-dark">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#F59E0B', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Rescue Plans</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>위기 단계별 맞춤형 구출 플랜</h2>
          <p className="section-subtitle">
            기능 단위가 아닌, 해결되는 재난의 크기에 따라 과금합니다. 바우처 적용 시 도입비는 0원에 수렴합니다.
          </p>

          <div className="pricing-grid">
            {/* Setup Fee */}
            <div className="pricing-card setup-card">
              <div className="pricing-header">
                <h3>[초기 진화비] Voucher Turn-key</h3>
                <div className="price">정부 예산 대행</div>
                <p>비파괴 레거시 연동 & 초기 세팅</p>
              </div>
              <ul className="pricing-features">
                <li><CheckCircle2 size={16} /> 기존 ERP(영림원/더존) 무손실 연동</li>
                <li><CheckCircle2 size={16} /> 스마트공장 정부 바우처 100% 대행</li>
                <li className="highlight"><ArrowRight size={16} /> <strong>자부담금 최대 80%~전액 감축</strong></li>
              </ul>
              <div className="pricing-review">
                <p>"바우처 행정 서류가 너무 복잡해 사업 지원을 포기하려던 상황... 전담 진화팀이 A부터 Z까지 행정 처리를 다 해줬습니다. 도장만 찍고 무상 구축한 기분입니다."</p>
                <span>- 신*아 (R팩토리 경영기획실장)</span>
              </div>
            </div>

            {/* Basic Plan */}
            <div className="pricing-card tier-card">
              <div className="pricing-header">
                <h3>[Basic] Audit Defender</h3>
                <div className="price">기본 월 구독</div>
                <p>원청사 기습 실사 완벽 방어</p>
              </div>
              <ul className="pricing-features">
                <li><Shield size={16} color="#4ECDC4" /> 10초 완벽 Traceability PDF 사출</li>
                <li><FileText size={16} color="#4ECDC4" /> 엑셀 / 바코드 수동 로깅 엔진</li>
                <li><Flame size={16} color="#EF4444" /> <strong>벤더 탈락(생존) 리스크 해소</strong></li>
              </ul>
              <div className="pricing-review">
                <p>"현대차 기습 실사 통보로 데이터 조작 의심을 받던 상황... 감사관 앞에서 단 10초 만에 완벽한 Traceability PDF를 뽑아줍니다. 벤더 탈락 공포에서 해방되었습니다."</p>
                <span>- 차*질 (A오토모티브 품질이사)</span>
              </div>
              <button className="pricing-cta" onClick={goLogin}>Basic 플랜 상담</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-card tier-card popular">
              <div className="popular-badge">가장 강력한 구출 (추천)</div>
              <div className="pricing-header">
                <h3>[Pro] Zero-Touch Autopilot</h3>
                <div className="price">구독 + 노드당 과금</div>
                <p>무입력 현장 및 스케줄러 독립</p>
              </div>
              <ul className="pricing-features">
                <li><Mic size={16} color="#3B82F6" /> <strong>STT/Vision AI 무입력 로깅</strong></li>
                <li><TrendingUp size={16} color="#3B82F6" /> 특정 인원 독립형 시스템 스케줄링</li>
                <li><Activity size={16} color="#3B82F6" /> 작업자 반발 및 공장 마비 리스크 소멸</li>
              </ul>
              <div className="pricing-review highlight">
                <p>"스케줄러 퇴사 통보로 공장 마비 위기였던 상황... AI가 김 부장의 머릿속 노하우를 그대로 시스템화하여 이제 누가 와도 공장이 멈추지 않습니다."</p>
                <span>- 한*우 (H정공 운영본부장)</span>
              </div>
              <button className="pricing-cta primary" onClick={() => navigate('/roi-calculator')}>ROI 시뮬레이션 해보기</button>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card tier-card enterprise">
              <div className="pricing-header">
                <h3>[Enterprise] Fortress</h3>
                <div className="price">Custom (연간 계약)</div>
                <p>완벽한 통제권과 철통 보안</p>
              </div>
              <ul className="pricing-features">
                <li><Lock size={16} color="#A855F7" /> <strong>100% 온프레미스 망 분리 요새화</strong></li>
                <li><Eye size={16} color="#A855F7" /> XAI 이상탐지 및 HITL 인간 승인 프로토콜</li>
                <li><LifeBuoy size={16} color="#A855F7" /> 24시간 전담 방재팀 SLA 보장</li>
              </ul>
              <div className="pricing-review">
                <p>"클라우드 기반 SaaS 도입 시 보안 사고 책임 문제로 반대했던 상황... 온프레미스 망 분리 환경을 완벽하게 지원해 주어 안심하고 AI를 도입했습니다."</p>
                <span>- 최*안 (Q디스펜서 CISO)</span>
              </div>
              <button className="pricing-cta" onClick={goLogin}>엔터프라이즈 컨설팅</button>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ FINAL CTA (Emergency Broadcast) ════════════ */}      <section className="final-cta-section" style={{ background: 'linear-gradient(180deg, #050a14 0%, #150909 50%, #050a14 100%)' }}>
        <FadeSection>
          <div style={{ display: 'inline-block', padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '50%', marginBottom: 20 }}>
            <Siren className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h2 className="section-title">더 이상 고립되지 마십시오.</h2>
          <p className="section-subtitle" style={{ marginBottom: 0, color: '#f87171' }}>
            수기 입력의 굴레와 벤더 감사의 공포에서 당신을 구출할 골든 타임입니다.<br />
            정부 지원 구조 자금(바우처)이 소진되기 전에 지금 즉시 구조를 요청하십시오.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <button className="cta-primary" onClick={goLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 32px', background: 'linear-gradient(135deg, #EF4444, #991B1B)' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>긴급 구조대(데모) 투입 요청</span>
              <span style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.8, marginTop: '4px' }}>10초 방어 증빙 사출 체험하기</span>
            </button>
            <button className="cta-secondary" onClick={() => navigate('/roi-calculator')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 32px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>구조 자금(ROI) 시뮬레이션</span>
              <span style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.8, marginTop: '4px' }}>야근 절감액 및 바우처 즉시 확인</span>
            </button>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: '#ef4444', opacity: 0.8 }}>
            경고: 정부 지원 바우처 행정 대행은 선착순으로 마감될 수 있습니다.
          </p>
        </FadeSection>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="landing-footer" style={{ borderTopColor: 'rgba(239,68,68,0.1)' }}>
        <p>© 2026 FactoryRescue — 위기에 빠진 중소·중견 제조 현장 전담 구조 솔루션</p>
        <p style={{ marginTop: 8, fontSize: 12, color: '#ef4444', opacity: 0.6 }}>
          수기 입력 제로화 및 원청사 감사 방어를 위한 긴급 대응 SaaS
        </p>
      </footer>
    </div>
  )
}
