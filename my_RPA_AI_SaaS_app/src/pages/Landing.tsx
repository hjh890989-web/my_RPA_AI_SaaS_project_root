/**
 * @file Landing.tsx — FactoryAI 랜딩페이지 (고객 Hook 단계)
 * @description CTA를 통해 Login/Dashboard로 진입하게 유도하는 최전면 마케팅 페이지.
 *   전략 유형: C유형(결과 지향형) + B유형(기술 몰입형) 혼합
 */
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic, Camera, FileText, Shield, BarChart3, Zap,
  ArrowRight, ChevronRight, CheckCircle2, Lock,
  Eye, Activity, TrendingUp, Factory, Database, Brain,
  Clock, AlertTriangle, Play, FileCheck, Calculator, Briefcase
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
      <div className="nav-logo">Factory<span>AI</span></div>
      <button className="nav-cta" onClick={onCTA}>Traceability 진단 받기 →</button>
    </nav>
  )
}

export default function Landing() {
  const navigate = useNavigate()
  const goLogin = () => navigate('/login')

  return (
    <div style={{ background: '#060b18', color: '#e2e8f0', overflowX: 'hidden' }}>
      <Navbar onCTA={goLogin} />

      {/* ════════════ HERO SECTION ════════════ */}
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
            중소·중견 제조 현장 특화 AI · 정부 바우처 최대 80% 지원
          </div>

          <h1 className="landing-headline" style={{ marginTop: 28 }}>
            현장의 수기 입력은 <span style={{ color: '#EF4444' }}>Zero</span>로,<br />
            원청사 감사 방어율은 <span className="gradient-text">100%</span>로.
          </h1>

          <p className="landing-subhead" style={{ margin: '24px auto 0' }}>
            장갑 벗을 필요 없는 <strong>무입력 패시브 로깅(STT/Vision)</strong>부터<br />
            글로벌 벤더(삼성, 현대차) 실사를 완벽 방어하는 <strong>10초 원클릭 감사 리포트</strong>까지.<br />
            FactoryAI는 퇴사 리스크(SPOF)를 지우고 생산 연속성을 극대화하는 <strong style={{ color: '#fff' }}>Traceability 브릿지 솔루션</strong>입니다.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <button className="cta-primary" onClick={goLogin}>
              <Play style={{ width: 18, height: 18 }} />
              무상 진단 데모 신청
            </button>
            <button className="cta-secondary" onClick={() => navigate('/roi-calculator')}>
              <Calculator style={{ width: 18, height: 18 }} />
              B2B ROI 시뮬레이션
            </button>
          </div>

          {/* Stats bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value">0건</div>
              <div className="stat-label">작업자 수동 입력</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">10초</div>
              <div className="stat-label">감사 증빙 PDF 생성</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">최대 80%</div>
              <div className="stat-label">바우처 도입 지원금</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">100%</div>
              <div className="stat-label">ERP 레거시 비파괴 보장</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SOCIAL PROOF: LOGO WALL ════════════ */}
      <section className="landing-section section-dark" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <FadeSection>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
            글로벌 원청사 실사 통과 및 정부 지원사업 검증 완료
          </p>
          <div className="logo-wall">
            {['스마트제조혁신추진단', '중소벤처기업부 공식 바우처', 'EU CBAM 대응 파트너', 'S/H사 실사 통과 레퍼런스', '영림원/더존 연동 인증'].map((name) => (
              <div className="logo-item" key={name}>
                <div className="logo-icon-box">
                  <Shield style={{ width: 16, height: 16, color: '#64748b' }} />
                </div>
                {name}
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ════════════ TARGET PERSONA PAIN POINTS ════════════ */}
      <section className="landing-section section-darker">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#EF4444', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Are you facing these nightmares?</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>이런 '단일 장애점(SPOF)'을 겪고 계신가요?</h2>
          <div className="feature-grid" style={{ marginTop: 40 }}>
            <div className="feature-card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
              <div className="feature-icon-box" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <Factory style={{ width: 24, height: 24, color: '#EF4444' }} />
              </div>
              <h3 style={{ color: '#fff' }}>운영본부장 (COO)의 공포</h3>
              <p>"핵심 스케줄러가 퇴사하면 공장 가동이 마비됩니다. 현장 작업자들은 장갑 벗고 키오스크 입력하는 걸 전면 거부하고 매일 갈등만 생깁니다."</p>
            </div>
            <div className="feature-card" style={{ borderColor: 'rgba(245,158,11,0.2)' }}>
              <div className="feature-icon-box" style={{ background: 'rgba(245,158,11,0.1)' }}>
                <FileCheck style={{ width: 24, height: 24, color: '#F59E0B' }} />
              </div>
              <h3 style={{ color: '#fff' }}>품질관리이사 (CQO)의 수치심</h3>
              <p>"원청사 기습 실사라도 뜨면 파편화된 엑셀을 모으느라 밤을 샙니다. 숫자가 조금만 안 맞아도 데이터 조작 의심을 받고 벤더 탈락 위기에 처합니다."</p>
            </div>
            <div className="feature-card" style={{ borderColor: 'rgba(59,130,246,0.2)' }}>
              <div className="feature-icon-box" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <Briefcase style={{ width: 24, height: 24, color: '#3B82F6' }} />
              </div>
              <h3 style={{ color: '#fff' }}>재무이사 (CFO)의 회의감</h3>
              <p>"과거 수억 원을 들인 스마트공장 구축이 실패한 경험이 있습니다. 장밋빛 AI에 또 예산을 낭비하고 싶지 않으며, 명확한 비용 절감 근거가 필요합니다."</p>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ FEATURE CARDS (Core Solutions) ════════════ */}
      <section className="landing-section section-dark">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>The FactoryAI Solution</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            압도적 기술력으로 '입력 노동'을 해고하십시오
          </h2>
          <p className="section-subtitle">
            기존 스마트공장 키오스크의 실패를 반복하지 마세요.
          </p>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <Mic style={{ width: 24, height: 24, color: '#3B82F6' }} />
              </div>
              <h3>장갑 벗을 필요 없는 패시브 로깅</h3>
              <p>현장 소음을 뚫는 STT와 Vision AI로 작업자의 수동 터치 없이 공정 상태를 100% 디지털화합니다.</p>
              <div className="feature-stat"><Zap style={{ width: 14, height: 14 }} /> 현장 입력 거부감 0%</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(78,205,196,0.1)' }}>
                <FileCheck style={{ width: 24, height: 24, color: '#4ECDC4' }} />
              </div>
              <h3>원청사 실사 완벽 방어 (10초 PDF)</h3>
              <p>파편화된 Lot 데이터를 시간순 병합. 글로벌 벤더가 요구하는 Traceability 증빙 리포트를 원클릭 추출합니다.</p>
              <div className="feature-stat"><CheckCircle2 style={{ width: 14, height: 14 }} /> 품질 감사 밤샘 90% 단축</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(245,158,11,0.1)' }}>
                <Activity style={{ width: 24, height: 24, color: '#F59E0B' }} />
              </div>
              <h3>스케줄러 의존 리스크(SPOF) 파괴</h3>
              <p>특정 숙련자의 머릿속 노하우를 시스템화하여, 누가 담당해도 공정이 차질 없이 돌아가는 연속성을 확보합니다.</p>
              <div className="feature-stat"><TrendingUp style={{ width: 14, height: 14 }} /> 납기 지연 리스크 원천 차단</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(34,197,94,0.1)' }}>
                <Briefcase style={{ width: 24, height: 24, color: '#22C55E' }} />
              </div>
              <h3>CFO를 위한 바우처 행정 턴키 대행</h3>
              <p>정부 예산 활용 컨설팅부터 복잡한 서류 작업까지 100% 대행. 초기 도입 자부담을 최대 80% 감축합니다.</p>
              <div className="feature-stat"><BarChart3 style={{ width: 14, height: 14 }} /> 결재 저항 제거 및 즉각 ROI 산출</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(168,85,247,0.1)' }}>
                <Database style={{ width: 24, height: 24, color: '#A855F7' }} />
              </div>
              <h3>비파괴형 레거시(ERP) 브릿지</h3>
              <p>기존 영림원/더존 ERP 데이터베이스를 파괴하지 않고, Read-Only 커넥터와 Excel Batch로 가볍게 덧붙여 작동합니다.</p>
              <div className="feature-stat"><ArrowRight style={{ width: 14, height: 14 }} /> 도입 실패 매몰 비용 제로</div>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <Lock style={{ width: 24, height: 24, color: '#EF4444' }} />
              </div>
              <h3>극도의 보안, 완벽한 통제권</h3>
              <p>CISO의 우려를 씻어내는 망 분리 원칙 준수. 외부 클라우드 유출 없이 완벽한 온프레미스 제어가 가능합니다.</p>
              <div className="feature-stat"><Shield style={{ width: 14, height: 14 }} /> 핵심 노하우 유출 방어 100%</div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ BEFORE / AFTER COMPARISON ════════════ */}
      <section className="landing-section section-darker">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Before &amp; After</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>스마트공장의 '착각'에서 벗어나십시오</h2>

          <div className="comparison-grid">
            <div className="comparison-card comparison-before">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>기존 스마트공장</div>
              <div className="comparison-value" style={{ color: '#EF4444', fontSize: '28px' }}>데이터 무덤</div>
              <div className="comparison-label">기초 수준 고착률 75.5%</div>
              <div className="comparison-items">
                <div className="comparison-item"><AlertTriangle style={{ width: 14, height: 14, color: '#EF4444' }} /> 작업자가 키오스크 입력을 거부함</div>
                <div className="comparison-item"><AlertTriangle style={{ width: 14, height: 14, color: '#EF4444' }} /> 감사 전날, 엑셀을 밤새워 수기 조작함</div>
                <div className="comparison-item"><AlertTriangle style={{ width: 14, height: 14, color: '#EF4444' }} /> 담당자 퇴사 시 시스템 전체가 멈춤</div>
              </div>
            </div>

            <div className="comparison-divider">
              <div className="comparison-arrow-icon"><ArrowRight style={{ width: 18, height: 18 }} /></div>
              <span>FactoryAI<br />도입</span>
            </div>

            <div className="comparison-card comparison-after">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#4ECDC4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>FactoryAI 브릿지</div>
              <div className="comparison-value" style={{ color: '#4ECDC4', fontSize: '28px' }}>생산 무중단</div>
              <div className="comparison-label">벤더 탈락 리스크 제로</div>
              <div className="comparison-items">
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 음성/카메라 패시브 로깅 (무입력)</div>
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 조작 불가능한 10초 감사 PDF 자동 생성</div>
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 특정인 의존 없는 시스템 스케줄링</div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="final-cta-section">
        <FadeSection>
          <h2 className="section-title">즉각적인 구원을 경험하십시오</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            수기 입력의 굴레와 벤더 감사의 공포에서 지금 바로 벗어나세요.<br />
            정부 예산이 소진되기 전에 도입 상담을 시작하십시오.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <button className="cta-primary" onClick={goLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 32px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Traceability 무상 진단 데모</span>
              <span style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.8, marginTop: '4px' }}>10초 PDF 생성 체험하기</span>
            </button>
            <button className="cta-secondary" onClick={() => navigate('/roi-calculator')} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 32px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>B2B ROI 시뮬레이션 진단</span>
              <span style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.8, marginTop: '4px' }}>맞춤형 야근 절감/바우처 확인</span>
            </button>
            <button className="cta-secondary" onClick={goLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 32px', borderColor: '#F59E0B', color: '#F59E0B' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>정부 바우처 턴키 예약</span>
              <span style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.8, marginTop: '4px' }}>행정 서류 100% 무상 대행 (선착순)</span>
            </button>
          </div>
          <p style={{ marginTop: 24, fontSize: 13, color: '#475569' }}>
            중소기업 AI 도입 컨설팅 전문 · 제조 AX 정부 지원금 사업 수행기관
          </p>
        </FadeSection>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="landing-footer">
        <p>© 2026 FactoryAI — 제조업 Traceability AI 브릿지 솔루션</p>
        <p style={{ marginTop: 8, fontSize: 12, color: '#334155' }}>
          수기 입력 제로화 및 원청사 감사 방어를 위한 AI 자동화 SaaS
        </p>
      </footer>
    </div>
  )
}
