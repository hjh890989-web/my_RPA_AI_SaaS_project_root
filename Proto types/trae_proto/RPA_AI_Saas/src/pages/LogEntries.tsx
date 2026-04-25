import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Mic, 
  Video, 
  FileSpreadsheet, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  ArrowRight
} from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">제로터치 로깅</h1>
          <p className="text-slate-400">음성, 카메라, 엑셀 데이터를 AI가 실시간으로 구조화합니다.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="border-slate-800">
            <Filter className="w-4 h-4 mr-2" /> 필터
          </Button>
          <Button variant="mint" size="sm" onClick={() => navigate('/log-entries/review')}>
            검토 대기중 (12) <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>

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
        <div className="flex items-center space-x-2">
          <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-mint w-2/3 animate-pulse" />
          </div>
          <span className="text-[10px] font-mono text-slate-500">67%</span>
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
                  <Badge variant={
                    log.status === 'APPROVED' ? 'success' :
                    log.status === 'PENDING_REVIEW' ? 'warning' : 'info'
                  }>
                    {log.status === 'APPROVED' ? '승인완료' :
                     log.status === 'PENDING_REVIEW' ? '검토대기' : '분석중'}
                  </Badge>
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
