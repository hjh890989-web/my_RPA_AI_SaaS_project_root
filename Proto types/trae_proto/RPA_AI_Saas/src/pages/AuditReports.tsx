import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Download, 
  Search, 
  Calendar,
  Filter,
  MoreVertical,
  CheckCircle2,
  Clock,
  FileWarning
} from 'lucide-react'

const reports = [
  { id: 'REP-2026-04-A', title: '4월 3주차 품질 감사 리포트', type: 'WEEKLY', status: 'READY', date: '2026-04-21', auditor: '클레어 리' },
  { id: 'REP-2026-04-B', title: '공정 B 설비 이상 분석 보고서', type: 'INCIDENT', status: 'DRAFT', date: '2026-04-20', auditor: '클레어 리' },
  { id: 'REP-2026-03-Q', title: '2026년 1분기 정기 감사 보고서', type: 'QUARTERLY', status: 'ARCHIVED', date: '2026-04-01', auditor: '시스템 자동생성' },
]

export default function AuditReports() {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">감사 리포트</h1>
          <p className="text-slate-400">품질 감사 및 AI 분석 결과 보고서를 관리하고 PDF로 발행합니다.</p>
        </div>
        <Button variant="mint" size="sm">
          <FileText className="w-4 h-4 mr-2" /> 신규 리포트 생성
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-slate-900/50 border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">총 발행 리포트</div>
          <div className="text-2xl font-bold text-white">124</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">이번 달 감사 건수</div>
          <div className="text-2xl font-bold text-mint">12</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">결측치 탐지</div>
          <div className="text-2xl font-bold text-warning">3</div>
        </Card>
        <Card className="p-4 bg-slate-900/50 border-slate-800">
          <div className="text-xs text-slate-500 uppercase font-bold mb-1">최종 승인율</div>
          <div className="text-2xl font-bold text-success">99.2%</div>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="리포트 제목 또는 ID 검색" 
                className="bg-slate-950 border border-slate-800 rounded-md pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-mint w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="border-slate-800 text-slate-400">
              <Filter className="w-4 h-4 mr-2" /> 상세 필터
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon" className="text-slate-500"><Calendar className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-800">
            {reports.map((report) => (
              <Link 
                key={report.id} 
                to="/log-entries/review"
                className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors group cursor-pointer border-b border-slate-800 last:border-0"
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    report.type === 'INCIDENT' ? "bg-critical/10 text-critical" :
                    report.type === 'WEEKLY' ? "bg-info/10 text-info" : "bg-primary/20 text-primary"
                  )}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-semibold text-white group-hover:text-mint transition-colors">{report.title}</h3>
                      <Badge variant="outline" className="text-[10px] h-4 px-1.5 border-slate-700 text-slate-500">{report.type}</Badge>
                    </div>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500">
                      <span>ID: {report.id}</span>
                      <span>•</span>
                      <span>감사자: {report.auditor}</span>
                      <span>•</span>
                      <span>발행일: {report.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1.5 mr-4">
                    {report.status === 'READY' ? (
                      <><CheckCircle2 className="w-3 h-3 text-success" /><span className="text-xs text-success">발행가능</span></>
                    ) : report.status === 'DRAFT' ? (
                      <><Clock className="w-3 h-3 text-warning" /><span className="text-xs text-warning">작성중</span></>
                    ) : (
                      <><FileWarning className="w-3 h-3 text-slate-500" /><span className="text-xs text-slate-500">아카이브</span></>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="h-8 border-slate-800 text-slate-400 hover:text-mint">
                    <Download className="w-3 h-3 mr-2" /> PDF
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600"><MoreVertical className="w-4 h-4" /></Button>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
