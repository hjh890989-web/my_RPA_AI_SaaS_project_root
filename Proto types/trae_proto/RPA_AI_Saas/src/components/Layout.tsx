/**
 * @file Layout.tsx — FactoryAI 메인 레이아웃 (사이드바 + 헤더 + 콘텐츠)
 * @description 인증된 모든 페이지의 공통 레이아웃을 제공합니다.
 *   - 좌측 사이드바: 네비게이션 메뉴 (ADMIN 역할 시 추가 메뉴 노출)
 *   - 상단 헤더: 시스템 상태 표시, 모바일 메뉴 토글
 *   - 메인 영역: children으로 전달받은 페이지 컴포넌트 렌더링
 *
 * @ai-context 메뉴 항목을 추가/수정할 때 `navigation` 또는 `adminNavigation` 배열을 수정합니다.
 *   현재 인증 상태는 localStorage('userRole')에서 직접 읽으며,
 *   향후 AuthContext로 전환이 필요합니다.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 라우트에 의해 전달되는 페이지 컴포넌트
 */
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  ClipboardList, 
  BarChart3, 
  ShieldCheck, 
  Database, 
  Calculator, 
  UserCircle, 
  LogOut, 
  Menu, 
  X, 
  Settings,
  AlertTriangle,
  History
} from 'lucide-react'
import { cn } from '@/lib/utils'

/** 기본 네비게이션 메뉴 항목. 모든 역할에게 표시됩니다. */
const navigation = [
  { name: '대시보드', href: '/dashboard', icon: LayoutDashboard },
  { name: '로깅 엔트리', href: '/log-entries', icon: ClipboardList },
  { name: 'XAI 분석', href: '/dashboard/xai', icon: BarChart3 },
  { name: '감사 리포트', href: '/audit-reports', icon: History },
  { name: 'ERP 연동', href: '/dashboard/erp', icon: Database },
  { name: '보안 콘솔', href: '/dashboard/security', icon: ShieldCheck },
  { name: '성과 분석', href: '/dashboard/performance', icon: BarChart3 },
  { name: 'ROI 계산기', href: '/roi-calculator', icon: Calculator },
]

/** ADMIN 역할 전용 추가 메뉴 항목. userRole === 'ADMIN'일 때만 사이드바에 추가됩니다. */
const adminNavigation = [
  { name: '온보딩 관리', href: '/admin/onboarding', icon: Settings },
  { name: '바우처 관리', href: '/admin/voucher', icon: Calculator },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const userRole = localStorage.getItem('userRole') || 'VIEWER'

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  const allNav = [...navigation, ...(userRole === 'ADMIN' ? adminNavigation : [])]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Desktop Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <span className="text-xl font-bold text-mint tracking-tight">FactoryAI</span>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {allNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors group",
                  location.pathname === item.href 
                    ? "bg-primary text-white" 
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5",
                  location.pathname === item.href ? "text-mint" : "text-slate-500 group-hover:text-slate-300"
                )} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center p-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <UserCircle className="w-5 h-5 text-slate-400" />
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{userRole}</p>
                <p className="text-xs text-slate-500 truncate">Online</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:text-critical hover:bg-slate-800 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              로그아웃
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col lg:pl-64">
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-40">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 lg:hidden"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse mr-2" />
              <span className="text-xs font-medium text-slate-300">System Normal</span>
            </div>
            {/* Notifications, etc. */}
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
