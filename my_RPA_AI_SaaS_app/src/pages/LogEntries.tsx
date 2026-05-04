/**
 * @file LogEntries.tsx — 제로터치 로깅 (데이터 인입 + AI 구조화)
 * @description 음성(STT), 카메라(Vision), 엑셀 데이터를 AI가 실시간 구조화하는 핵심 업무 페이지.
 *   - 3가지 입력 방식 카드 (각각 /log-entries/review로 연결)
 *   - 실시간 AI 분석 진행 상태 바
 *   - 최근 인입 데이터 목록 (탭 필터: ALL/STT/VISION/EXCEL)
 *
 * @ai-context Mock 데이터는 `mockLogs` 상수에 정의. status 값: AI_ANALYZING, PENDING_REVIEW, APPROVED.
 *   activeTab 상태로 필터링 UI를 제공하나, 실제 필터링 로직은 미구현 (Mock 고정).
 *   navigate를 통해 /log-entries/review로 이동하며, 현재 로그 ID를 전달하지 않음.
 *
 * @see LogReview.tsx — HITL 인간 승인 페이지 (이 페이지에서 이동)
 */
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Mic, 
  Video, 
  FileSpreadsheet, 
  Filter,
  Loader2,
  ArrowRight
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { PageHeader } from '@/components/ui/PageHeader'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { StatusBadge } from '@/components/ui/StatusBadge'

const mockLogs = [
  { id: 'LOG-001', type: 'STT', source: '공정 A - 용접부', content: '용접 온도 1,250도 유지 확인, 노즐 교체 필요...', status: 'AI_ANALYZING', time: '14:20:15' },
  { id: 'LOG-002', type: 'Vision', source: '공정 C - 외관 검사', content: '제품 표면 스크래치 0.2mm 감지, 불량 가능성...', status: 'PENDING_REVIEW', time: '14:18:02' },
  { id: 'LOG-003', type: 'Excel', source: '자재 관리', content: '스테인리스 강판 500kg 입고 완료', status: 'APPROVED', time: '14:05:33' },
  { id: 'LOG-004', type: 'STT', source: '공정 B - 조립', content: '조립 라인 2번 모터 소음 발생, 점검 요망', status: 'PENDING_REVIEW', time: '13:55:10' },
]

export default function LogEntries() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('ALL')

  return (
    <div className="space-y-6">
      <PageHeader 
        title="제로터치 로깅" 
        description="음성, 카메라, 엑셀 데이터를 AI가 실시간으로 구조화합니다."
        actions={
          <>
            <Button variant="outline" size="sm" className="border-slate-800">
              <Filter className="w-4 h-4 mr-2" /> 필터
            </Button>
            <Button variant="mint" size="sm" onClick={() => navigate('/log-entries/review')}>
              검토 대기중 (12) <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </>
        }
      />

      {/* Input Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/log-entries/review" className="bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/20 cursor-pointer group transition-all">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/20 text-info group-hover:scale-110 transition-transform">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">음성 로깅 (STT)</h3>
              <p className="text-xs text-slate-500">실시간 현장 음성 기록</p>
            </div>
          </CardContent>
        </Link>
        <Link to="/log-entries/review" className="bg-accent/10 border border-accent/20 rounded-xl hover:bg-accent/20 cursor-pointer group transition-all">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-accent/20 text-accent group-hover:scale-110 transition-transform">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">비전 로깅 (Vision)</h3>
              <p className="text-xs text-slate-500">카메라 기반 이상 탐지</p>
            </div>
          </CardContent>
        </Link>
        <Link to="/log-entries/review" className="bg-mint/10 border border-mint/20 rounded-xl hover:bg-mint/20 cursor-pointer group transition-all">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="p-3 rounded-full bg-mint/20 text-mint group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white">엑셀 업로드</h3>
              <p className="text-xs text-slate-500">대량 데이터 구조화</p>
            </div>
          </CardContent>
        </Link>
      </div>

      {/* Floating AI Status Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-4">
          <Loader2 className="w-4 h-4 text-mint animate-spin" />
          <span className="text-sm font-medium text-slate-300">AI가 3개의 신규 데이터를 분석 중입니다...</span>
        </div>
        <div className="flex items-center space-x-2 w-40">
          <ProgressBar value={67} colorClass="bg-mint" className="flex-1" />
          <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap ml-2">67%</span>
        </div>
      </div>

      {/* Log List */}
      <Card>
        <CardHeader className="border-b border-slate-800 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">최근 인입 데이터</CardTitle>
            <div className="flex bg-slate-800 rounded-lg p-1">
              {['ALL', 'STT', 'VISION', 'EXCEL'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-3 py-1 text-xs font-medium rounded-md transition-all",
                    activeTab === tab ? "bg-slate-700 text-white shadow-sm" : "text-slate-500 hover:text-slate-300"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800">
            {mockLogs.map(log => (
              <Link 
                key={log.id} 
                to="/log-entries/review"
                className="p-4 hover:bg-slate-800/30 transition-colors flex items-start justify-between cursor-pointer border-b border-slate-800 last:border-0"
              >
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    {log.type === 'STT' && <Mic className="w-4 h-4 text-info" />}
                    {log.type === 'Vision' && <Video className="w-4 h-4 text-accent" />}
                    {log.type === 'Excel' && <FileSpreadsheet className="w-4 h-4 text-mint" />}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono text-slate-500">{log.id}</span>
                      <span className="text-xs font-medium text-white">{log.source}</span>
                      <span className="text-[10px] text-slate-600">{log.time}</span>
                    </div>
                    <p className="text-sm text-slate-400 line-clamp-1">{log.content}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <StatusBadge status={log.status} />
                  {log.status === 'PENDING_REVIEW' && (
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-mint hover:text-mint hover:bg-mint/10" onClick={() => navigate('/log-entries/review')}>
                      검토 <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
