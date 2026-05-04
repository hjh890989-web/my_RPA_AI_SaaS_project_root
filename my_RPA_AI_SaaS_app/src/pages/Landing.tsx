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
  return (
    <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">Factory<span style={{ color: '#EF4444' }}>Rescue</span></div>
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
            지금 즉시 <span style={{ color: '#EF4444' }}>FactoryAI 구조대</span>를 투입하십시오.
          </h1>

          <p className="landing-subhead" style={{ margin: '24px auto 0' }}>
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
            <Siren className="w-5 h-5 text-red-500 animate-pulse" />
            <p className="section-subtitle" style={{ margin: 0, fontWeight: 600, color: '#EF4444', fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              RED ALERT: 현장 발령 경보
            </p>
            <Siren className="w-5 h-5 text-red-500 animate-pulse" />
          </div>
          <h2 className="section-title">지금 귀하의 공장은 고립 상태입니다</h2>
          <div className="feature-grid" style={{ marginTop: 40 }}>
            <div className="feature-card alert-card">
              <div className="feature-icon-box" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <Flame style={{ width: 24, height: 24, color: '#EF4444' }} />
              </div>
              <h3 style={{ color: '#fff' }}>[코드명: SPOF] 운영본부장의 공포</h3>
              <p>"핵심 스케줄러가 퇴사한다면? 공장은 즉시 마비됩니다. 억지로 도입한 키오스크는 현장에서 외면받고 데이터는 텅 비어갑니다."</p>
            </div>
            <div className="feature-card alert-card">
              <div className="feature-icon-box" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <Crosshair style={{ width: 24, height: 24, color: '#EF4444' }} />
              </div>
              <h3 style={{ color: '#fff' }}>[코드명: AUDIT] 품질이사의 수치심</h3>
              <p>"원청사의 기습 감사 통보. 며칠 밤을 새워 엑셀을 꿰맞춰도 돌아오는 건 '데이터 조작 의심'과 '벤더 탈락'이라는 극도의 수치심뿐입니다."</p>
            </div>
            <div className="feature-card alert-card">
              <div className="feature-icon-box" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <AlertTriangle style={{ width: 24, height: 24, color: '#EF4444' }} />
              </div>
              <h3 style={{ color: '#fff' }}>[코드명: BUDGET] 재무이사의 불신</h3>
              <p>"수억 원을 쏟아부은 과거 스마트공장 도입은 철저히 실패했습니다. 명확한 절감 액수와 든든한 지원금 없이는 단 1원도 결재할 수 없습니다."</p>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ RESCUE GEARS (Core Solutions) ════════════ */}
      <section className="landing-section section-dark">
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
              <div className="feature-icon-box" style={{ background: 'rgba(78,205,196,0.1)' }}>
                <Mic style={{ width: 24, height: 24, color: '#4ECDC4' }} />
              </div>
              <h3>장갑을 벗지 마십시오 (패시브 레이더)</h3>
              <p>현장 소음을 뚫는 STT와 Vision AI가 작업자의 움직임을 은밀히 포착합니다. 작업자는 아무것도 입력할 필요가 없습니다.</p>
              <div className="feature-stat"><Zap style={{ width: 14, height: 14 }} /> 현장 반발 저항 0% 달성</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <Shield style={{ width: 24, height: 24, color: '#3B82F6' }} />
              </div>
              <h3>10초 방탄 쉴드 (실사 완벽 방어)</h3>
              <p>기습 감사가 시작되면 버튼 하나만 누르십시오. 파편화된 Lot가 시간순으로 정렬된 Traceability PDF가 10초 만에 사출됩니다.</p>
              <div className="feature-stat"><CheckCircle2 style={{ width: 14, height: 14 }} /> 벤더 탈락 리스크 즉시 소멸</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(245,158,11,0.1)' }}>
                <Activity style={{ width: 24, height: 24, color: '#F59E0B' }} />
              </div>
              <h3>무중단 오토파일럿 (SPOF 제거)</h3>
              <p>특정 스케줄러가 내일 당장 사직서를 내도 공장은 멈추지 않습니다. 그들의 머릿속 노하우는 이미 시스템에 복제되어 있습니다.</p>
              <div className="feature-stat"><TrendingUp style={{ width: 14, height: 14 }} /> 공장 가동 마비 공포 제거</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(34,197,94,0.1)' }}>
                <Briefcase style={{ width: 24, height: 24, color: '#22C55E' }} />
              </div>
              <h3>CFO 전용 구호 자금 (정부 바우처)</h3>
              <p>예산 결재의 벽을 뚫어드립니다. 정부 예산 활용 컨설팅과 서류 작업을 100% 턴키 대행하여 자부담을 80% 줄입니다.</p>
              <div className="feature-stat"><BarChart3 style={{ width: 14, height: 14 }} /> 비용 리스크 없는 안전한 구출</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(168,85,247,0.1)' }}>
                <Database style={{ width: 24, height: 24, color: '#A855F7' }} />
              </div>
              <h3>비파괴형 무중단 침투 시스템</h3>
              <p>기존 ERP를 뜯어고치는 무모한 수술은 하지 않습니다. Read-Only 커넥터로 조용하고 안전하게 데이터만 동기화합니다.</p>
              <div className="feature-stat"><ArrowRight style={{ width: 14, height: 14 }} /> IT 도입 실패 매몰 비용 제로</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(239,68,68,0.1)' }}>
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
      <section className="landing-section section-dark">
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

      {/* ════════════ FINAL CTA (Emergency Broadcast) ════════════ */}
      <section className="final-cta-section" style={{ background: 'linear-gradient(180deg, #050a14 0%, #150909 50%, #050a14 100%)' }}>
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
