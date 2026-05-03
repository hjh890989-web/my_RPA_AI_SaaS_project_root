/**
 * @file App.tsx — FactoryAI 애플리케이션 루트 라우터
 * @description 모든 페이지 라우팅을 관리하는 최상위 컴포넌트입니다.
 *   - 인증되지 않은 라우트: /login
 *   - 인증된 라우트: Layout 래퍼를 통해 사이드바/헤더 포함
 *   - ADMIN 전용 라우트: /admin/onboarding, /admin/voucher
 *
 * @ai-context 라우트를 추가/수정할 때 이 파일을 수정합니다.
 *   Layout 컴포넌트가 children으로 각 페이지를 감쌉니다.
 *   현재 인증 보호(ProtectedRoute)가 구현되지 않았으므로,
 *   모든 라우트에 직접 접근이 가능합니다.
 *
 * @see Layout.tsx — 사이드바 및 헤더 렌더링
 * @see Login.tsx — 역할 기반 Quick Login
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import LogEntries from './pages/LogEntries'
import LogReview from './pages/LogReview'
import AuditReports from './pages/AuditReports'
import XAI from './pages/XAI'
import ERP from './pages/ERP'
import Security from './pages/Security'
import Performance from './pages/Performance'
import ROICalculator from './pages/ROICalculator'
import Onboarding from './pages/Onboarding'
import Voucher from './pages/Voucher'

/**
 * 애플리케이션 루트 컴포넌트.
 * BrowserRouter로 클라이언트 사이드 라우팅을 구성하며,
 * "/" 접근 시 자동으로 "/login"으로 리다이렉트합니다.
 *
 * @returns {JSX.Element} 전체 라우트 트리를 포함하는 Router 컴포넌트
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/dashboard/xai" element={<Layout><XAI /></Layout>} />
        <Route path="/dashboard/erp" element={<Layout><ERP /></Layout>} />
        <Route path="/dashboard/security" element={<Layout><Security /></Layout>} />
        <Route path="/dashboard/performance" element={<Layout><Performance /></Layout>} />
        <Route path="/roi-calculator" element={<Layout><ROICalculator /></Layout>} />
        <Route path="/log-entries" element={<Layout><LogEntries /></Layout>} />
        <Route path="/log-entries/review" element={<Layout><LogReview /></Layout>} />
        <Route path="/audit-reports" element={<Layout><AuditReports /></Layout>} />
        <Route path="/admin/onboarding" element={<Layout><Onboarding /></Layout>} />
        <Route path="/admin/voucher" element={<Layout><Voucher /></Layout>} />
        
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App
