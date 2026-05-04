/**
 * @file Landing.tsx — FactoryAI 랜딩페이지 (고객 Hook 단계)
 * @description CTA를 통해 Login/Dashboard로 진입하게 유도하는 최전면 마케팅 페이지.
 *   전략 유형: C유형(결과 지향형) + B유형(기술 몰입형) 혼합
 *   - Hero Section: 핵심 가치 제안 + 이중 CTA
 *   - Social Proof: 로고 월 + 수치 증명
 *   - Input-Output Diagram: 복잡성을 숨긴 마법 같은 흐름
 *   - Feature Cards: 혜택 중심 서술
 *   - Before/After: ROI 비교
 *   - Safety Trust: 안전 장치 강조
 *   - Final CTA: 반복 배치된 행동 유도
 */
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Mic, Camera, FileText, Shield, BarChart3, Zap,
  ArrowRight, ChevronRight, CheckCircle2, Lock,
  Eye, Activity, TrendingUp, Factory, Database, Brain,
  Clock, AlertTriangle, Play
} from 'lucide-react'
import './landing.css'

/* ── Scroll-triggered fade-in hook ── */
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

/* ── Navbar (fixed, glassmorphism on scroll) ── */
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
      <button className="nav-cta" onClick={onCTA}>무료 체험 시작 →</button>
    </nav>
  )
}

/* ── Main Landing Component ── */
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
            중소 제조 현장 특화 AI · 지금 바로 도입 가능
          </div>

          <h1 className="landing-headline" style={{ marginTop: 28 }}>
            기록은 AI가,<br />
            <span className="gradient-text">판단은 사람이.</span>
          </h1>

          <p className="landing-subhead" style={{ margin: '24px auto 0' }}>
            음성 한마디, 카메라 한 대면 공장 데이터가 자동으로 쌓입니다.<br />
            FactoryAI는 기존 ERP를 건드리지 않고, AI가 수집·구조화하고<br />
            사람이 최종 승인하는 <strong style={{ color: '#fff' }}>HITL(Human-in-the-Loop)</strong> 시스템입니다.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <button className="cta-primary" onClick={goLogin}>
              <Play style={{ width: 18, height: 18 }} />
              무료 데모 체험하기
            </button>
            <button className="cta-secondary" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              어떻게 작동하나요?
              <ChevronRight style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Stats bar */}
          <div className="stats-bar">
            <div className="stat-item">
              <div className="stat-value">95%</div>
              <div className="stat-label">데이터 입력 시간 단축</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">99.8%</div>
              <div className="stat-label">불량 탐지 정확도</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">3.2개월</div>
              <div className="stat-label">평균 손익분기점</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">0건</div>
              <div className="stat-label">AI 단독 실행 원칙</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SOCIAL PROOF: LOGO WALL ════════════ */}
      <section className="landing-section section-dark" style={{ paddingTop: 60, paddingBottom: 60 }}>
        <FadeSection>
          <p style={{ textAlign: 'center', fontSize: 13, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
            국내 제조 현장에서 검증된 기술
          </p>
          <div className="logo-wall">
            {['한국생산기술연구원', '중소벤처기업부', 'KOTRA', 'SAP Partner', '스마트공장추진단'].map((name) => (
              <div className="logo-item" key={name}>
                <div className="logo-icon-box">
                  <Factory style={{ width: 16, height: 16, color: '#64748b' }} />
                </div>
                {name}
              </div>
            ))}
          </div>
        </FadeSection>
      </section>

      {/* ════════════ INPUT-OUTPUT DIAGRAM ════════════ */}
      <section className="landing-section section-darker" id="features">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>How It Works</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            넣으면, 나옵니다.
          </h2>
          <p className="section-subtitle">
            복잡한 세팅 없이 현장 데이터를 입력하면,<br />
            AI가 구조화하고 사람이 승인하여 즉시 ERP에 반영됩니다.
          </p>

          <div className="io-diagram" style={{ marginTop: 48 }}>
            <div className="io-box io-input">
              <div className="io-box-title" style={{ color: '#3B82F6' }}>INPUT</div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 12 }}>
                <Mic style={{ width: 20, height: 20, color: '#3B82F6' }} />
                <Camera style={{ width: 20, height: 20, color: '#3B82F6' }} />
                <FileText style={{ width: 20, height: 20, color: '#3B82F6' }} />
              </div>
              <div className="io-box-desc">음성 · 카메라 · Excel<br />현장 데이터 수집</div>
            </div>

            <div className="io-arrow">→</div>

            <div className="io-box io-engine">
              <div className="io-box-title" style={{ color: '#4ECDC4' }}>⚡ FactoryAI Engine</div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 12 }}>
                <Brain style={{ width: 20, height: 20, color: '#4ECDC4' }} />
                <Eye style={{ width: 20, height: 20, color: '#4ECDC4' }} />
              </div>
              <div className="io-box-desc">AI 구조화 + XAI 이상탐지<br />+ HITL 인간 승인</div>
            </div>

            <div className="io-arrow">→</div>

            <div className="io-box io-output">
              <div className="io-box-title" style={{ color: '#22C55E' }}>OUTPUT</div>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 12 }}>
                <Database style={{ width: 20, height: 20, color: '#22C55E' }} />
                <BarChart3 style={{ width: 20, height: 20, color: '#22C55E' }} />
              </div>
              <div className="io-box-desc">ERP 자동 동기화<br />감사 리포트 · ROI 대시보드</div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ FEATURE CARDS (Benefit-oriented) ════════════ */}
      <section className="landing-section section-dark">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Core Benefits</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>
            기능이 아닌, 결과를 말합니다
          </h2>
          <p className="section-subtitle">
            FactoryAI가 제공하는 것은 소프트웨어가 아니라, 측정 가능한 변화입니다.
          </p>

          <div className="feature-grid">
            {/* Card 1 */}
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <Mic style={{ width: 24, height: 24, color: '#3B82F6' }} />
              </div>
              <h3>말하면 기록됩니다</h3>
              <p>작업자가 말하거나 카메라 앞에 서기만 하면 AI가 데이터를 자동으로 구조화합니다. 클립보드와 수기 작성이 사라집니다.</p>
              <div className="feature-stat"><Zap style={{ width: 14, height: 14 }} /> 데이터 입력 시간 95% 감소</div>
            </div>

            {/* Card 2 */}
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(78,205,196,0.1)' }}>
                <Eye style={{ width: 24, height: 24, color: '#4ECDC4' }} />
              </div>
              <h3>불량을 미리 잡습니다</h3>
              <p>XAI(설명 가능 AI) 이상탐지가 불량 징후를 사전에 포착하고, 왜 이상인지 근거를 함께 보여줍니다.</p>
              <div className="feature-stat"><CheckCircle2 style={{ width: 14, height: 14 }} /> 불량 탐지 정확도 99.8%</div>
            </div>

            {/* Card 3 */}
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(245,158,11,0.1)' }}>
                <Shield style={{ width: 24, height: 24, color: '#F59E0B' }} />
              </div>
              <h3>AI가 마음대로 못 합니다</h3>
              <p>모든 AI 판단은 반드시 사람의 승인을 거쳐야 합니다. "AI 단독 실행 0건" 원칙으로 현장의 안전을 보장합니다.</p>
              <div className="feature-stat"><Lock style={{ width: 14, height: 14 }} /> HITL 승인 프로토콜 적용</div>
            </div>

            {/* Card 4 */}
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(34,197,94,0.1)' }}>
                <Database style={{ width: 24, height: 24, color: '#22C55E' }} />
              </div>
              <h3>기존 ERP 그대로 씁니다</h3>
              <p>SAP, Oracle 등 기존 ERP 시스템을 교체하지 않습니다. 비파괴형 브릿지로 옆에서 데이터만 동기화합니다.</p>
              <div className="feature-stat"><Activity style={{ width: 14, height: 14 }} /> ERP 교체 비용 0원</div>
            </div>

            {/* Card 5 */}
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(239,68,68,0.1)' }}>
                <FileText style={{ width: 24, height: 24, color: '#EF4444' }} />
              </div>
              <h3>감사는 원클릭으로 끝</h3>
              <p>로트별 데이터를 자동으로 취합해 PDF 감사 리포트를 생성합니다. 수주 감사 준비에 걸리는 시간이 90% 줄어듭니다.</p>
              <div className="feature-stat"><Clock style={{ width: 14, height: 14 }} /> 리포트 생성 3분 → 5초</div>
            </div>

            {/* Card 6 */}
            <div className="feature-card">
              <div className="feature-icon-box" style={{ background: 'rgba(168,85,247,0.1)' }}>
                <BarChart3 style={{ width: 24, height: 24, color: '#A855F7' }} />
              </div>
              <h3>도입 효과를 숫자로 증명</h3>
              <p>내장 ROI 계산기로 도입 비용 대비 절감액을 실시간 산출합니다. CFO를 위한 결재 근거가 자동 생성됩니다.</p>
              <div className="feature-stat"><TrendingUp style={{ width: 14, height: 14 }} /> 평균 ROI 680%</div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ BEFORE / AFTER COMPARISON ════════════ */}
      <section className="landing-section section-darker">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Before &amp; After</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>도입 전후, 숫자가 말합니다</h2>

          <div className="comparison-grid">
            <div className="comparison-card comparison-before">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Before</div>
              <div className="comparison-value" style={{ color: '#EF4444' }}>4.5%</div>
              <div className="comparison-label">평균 불량률</div>
              <div className="comparison-items">
                <div className="comparison-item"><AlertTriangle style={{ width: 14, height: 14, color: '#EF4444' }} /> 수기 기록 → 누락 빈번</div>
                <div className="comparison-item"><AlertTriangle style={{ width: 14, height: 14, color: '#EF4444' }} /> 감사 준비 2~3주 소요</div>
                <div className="comparison-item"><AlertTriangle style={{ width: 14, height: 14, color: '#EF4444' }} /> ERP 이중 입력 필수</div>
              </div>
            </div>

            <div className="comparison-divider">
              <div className="comparison-arrow-icon"><ArrowRight style={{ width: 18, height: 18 }} /></div>
              <span>FactoryAI<br />도입</span>
            </div>

            <div className="comparison-card comparison-after">
              <div style={{ fontSize: 13, fontWeight: 600, color: '#4ECDC4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>After</div>
              <div className="comparison-value" style={{ color: '#4ECDC4' }}>0.5%</div>
              <div className="comparison-label">평균 불량률</div>
              <div className="comparison-items">
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 제로터치 자동 로깅</div>
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 원클릭 감사 리포트 (5초)</div>
                <div className="comparison-item"><CheckCircle2 style={{ width: 14, height: 14, color: '#4ECDC4' }} /> 비파괴형 ERP 동기화</div>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ SAFETY & TRUST ════════════ */}
      <section className="landing-section section-dark">
        <FadeSection>
          <p className="section-subtitle" style={{ marginBottom: 0, marginTop: 0, fontWeight: 600, color: '#4ECDC4', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Safety &amp; Trust</p>
          <h2 className="section-title" style={{ marginTop: 12 }}>제조 현장의 불안을 제거합니다</h2>
          <p className="section-subtitle">AI 도입이 두려우신가요? FactoryAI는 처음부터 '안전'을 위해 설계되었습니다.</p>

          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon" style={{ background: 'rgba(78,205,196,0.1)' }}>
                <Shield style={{ width: 20, height: 20, color: '#4ECDC4' }} />
              </div>
              <div>
                <h4>AI 단독 실행 0건</h4>
                <p>모든 AI 결과는 사람이 최종 승인</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon" style={{ background: 'rgba(59,130,246,0.1)' }}>
                <Eye style={{ width: 20, height: 20, color: '#3B82F6' }} />
              </div>
              <div>
                <h4>XAI 설명 가능 AI</h4>
                <p>이상 판단 근거를 투명하게 제시</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon" style={{ background: 'rgba(245,158,11,0.1)' }}>
                <Lock style={{ width: 20, height: 20, color: '#F59E0B' }} />
              </div>
              <div>
                <h4>역할 기반 접근 통제</h4>
                <p>5단계 RBAC 권한 분리</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon" style={{ background: 'rgba(34,197,94,0.1)' }}>
                <Database style={{ width: 20, height: 20, color: '#22C55E' }} />
              </div>
              <div>
                <h4>비파괴형 ERP 연동</h4>
                <p>기존 시스템을 전혀 수정하지 않음</p>
              </div>
            </div>
          </div>
        </FadeSection>
      </section>

      {/* ════════════ FINAL CTA ════════════ */}
      <section className="final-cta-section">
        <FadeSection>
          <h2 className="section-title">지금 바로 체험해 보세요</h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            설치 없이, 비용 없이. 브라우저에서 바로 FactoryAI의<br />
            실제 대시보드를 체험하실 수 있습니다.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 40, flexWrap: 'wrap' }}>
            <button className="cta-primary" onClick={goLogin}>
              무료 데모 시작하기
              <ArrowRight style={{ width: 18, height: 18 }} />
            </button>
          </div>
          <p style={{ marginTop: 20, fontSize: 13, color: '#475569' }}>
            가입 불필요 · 즉시 체험 · 5가지 역할별 데모
          </p>
        </FadeSection>
      </section>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="landing-footer">
        <p>© 2026 FactoryAI — 중소 제조공장을 위한 AI 기반 생산관리 SaaS</p>
        <p style={{ marginTop: 8, fontSize: 12, color: '#334155' }}>
          "AI 단독 실행 0건" 원칙 기반 HITL 시스템
        </p>
      </footer>
    </div>
  )
}
