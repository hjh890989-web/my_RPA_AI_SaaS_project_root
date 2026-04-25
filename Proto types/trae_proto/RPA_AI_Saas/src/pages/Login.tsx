import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, User, Camera, FileSearch, Eye, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

const roles = [
  { id: 'ADMIN', name: '한성우 COO', icon: Shield, desc: '전체 관리, ERP, 대시보드' },
  { id: 'OPERATOR', name: '박작업', icon: Camera, desc: '음성/카메라 로깅' },
  { id: 'AUDITOR', name: '클레어 리 품질이사', icon: FileSearch, desc: '감사 리포트, XAI 검토' },
  { id: 'VIEWER', name: '이뷰어', icon: Eye, desc: '읽기 전용' },
  { id: 'CISO', name: '최보안', icon: Lock, desc: '보안 콘솔, 감사 로그' },
]

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = (role: string) => {
    // In a real app, we would set the auth state here
    localStorage.setItem('userRole', role)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">FactoryAI</h1>
          <p className="text-slate-400">중소 제조공장을 위한 AI 기반 생산관리 시스템</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 text-left">Quick Login</h2>
          <div className="space-y-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleLogin(role.id)}
                className="w-full flex items-center p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-mint hover:bg-slate-800 transition-all group text-left"
              >
                <div className="p-2 rounded-md bg-slate-900 group-hover:bg-primary/20 transition-colors">
                  <role.icon className="w-5 h-5 text-mint" />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-white">{role.name}</div>
                  <div className="text-xs text-slate-500">{role.id} • {role.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-600">
          "AI 단독 실행 0건" 원칙 기반 HITL 시스템
        </div>
      </div>
    </div>
  )
}
