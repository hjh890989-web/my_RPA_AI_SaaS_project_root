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
