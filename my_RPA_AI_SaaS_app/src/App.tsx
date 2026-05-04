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
import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'

// Code Splitting for Pages
const Landing = lazy(() => import('./pages/Landing'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const LogEntries = lazy(() => import('./pages/LogEntries'))
const LogReview = lazy(() => import('./pages/LogReview'))
const AuditReports = lazy(() => import('./pages/AuditReports'))
const XAI = lazy(() => import('./pages/XAI'))
const ERP = lazy(() => import('./pages/ERP'))
const Security = lazy(() => import('./pages/Security'))
const Performance = lazy(() => import('./pages/Performance'))
const ROICalculator = lazy(() => import('./pages/ROICalculator'))
const Onboarding = lazy(() => import('./pages/Onboarding'))
const Voucher = lazy(() => import('./pages/Voucher'))

/**
 * Fallback UI while lazy-loaded components are fetching
 */
function PageLoader() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-800 border-t-mint"></div>
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    </div>
  )
}

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
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Landing Page — 고객 Hook 단계 (최전면) */}
          <Route path="/" element={<Landing />} />
          
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
          <Route path="/dashboard/xai" element={<ProtectedRoute><Layout><XAI /></Layout></ProtectedRoute>} />
          <Route path="/dashboard/erp" element={<ProtectedRoute><Layout><ERP /></Layout></ProtectedRoute>} />
          <Route path="/dashboard/security" element={<ProtectedRoute><Layout><Security /></Layout></ProtectedRoute>} />
          <Route path="/dashboard/performance" element={<ProtectedRoute><Layout><Performance /></Layout></ProtectedRoute>} />
          <Route path="/roi-calculator" element={<ProtectedRoute><Layout><ROICalculator /></Layout></ProtectedRoute>} />
          <Route path="/log-entries" element={<ProtectedRoute><Layout><LogEntries /></Layout></ProtectedRoute>} />
          <Route path="/log-entries/review" element={<ProtectedRoute><Layout><LogReview /></Layout></ProtectedRoute>} />
          <Route path="/audit-reports" element={<ProtectedRoute><Layout><AuditReports /></Layout></ProtectedRoute>} />
          <Route path="/admin/onboarding" element={<ProtectedRoute><Layout><Onboarding /></Layout></ProtectedRoute>} />
          <Route path="/admin/voucher" element={<ProtectedRoute><Layout><Voucher /></Layout></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
