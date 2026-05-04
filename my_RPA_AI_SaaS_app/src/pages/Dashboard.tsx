/**
 * @file Dashboard.tsx — 현장 운영 대시보드 (메인 페이지)
 * @description 로그인 후 최초 진입 페이지. 실시간 공장 운영 현황을 한눈에 보여줍니다.
 *   - 상단: 4개 KPI 통계 카드 (오늘의 로그, AI 구조화율, 검토 대기, 이상 징후)
 *   - 좌측: 실시간 로깅 피드 (STT/Vision/Manual 구분)
 *   - 우측: 시스템 상태 (AI 가동률, ERP 동기화, 경보)
 *
 * @ai-context KPI 데이터는 `stats` 상수에, 로그 피드는 `recentLogs` 상수에 정의되어 있습니다.
 *   두 데이터 모두 현재 하드코딩된 Mock입니다. API 연동 시 useSWR/useQuery로 교체하세요.
 *   userRole은 localStorage에서 읽으며, 현재 역할별 분기 로직은 미구현 상태입니다.
 *
 * @see LogEntries.tsx — "전체보기" 링크 대상
 * @see LogReview.tsx — 각 로그 항목 클릭 시 이동 대상
 */
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, AlertCircle, CheckCircle2, Clock, Activity, Mic, Video, Database, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ProgressBar } from '@/components/ui/ProgressBar'

const stats = [
  { label: '오늘의 로그', value: '1,284', change: '+12.5%', icon: Activity, color: 'text-info' },
  { label: 'AI 구조화 완료', value: '98.2%', change: '+0.4%', icon: CheckCircle2, color: 'text-success' },
  { label: '검토 대기중', value: '12', change: '-2', icon: Clock, color: 'text-warning' },
  { label: '이상 징후 감지', value: '3', change: '신규', icon: AlertCircle, color: 'text-critical' },
]

const recentLogs = [
  { id: 1, type: 'STT', source: '공정 A - 용접부', status: 'structuring', time: '2분 전' },
  { id: 2, type: 'Vision', source: '공정 C - 외관 검사', status: 'pending', time: '5분 전' },
  { id: 3, type: 'Manual', source: 'ERP 동기화', status: 'completed', time: '15분 전' },
]

export default function Dashboard() {
  const { userRole } = useAuth()
  const displayRole = userRole || 'VIEWER'

  return (
    <div className="space-y-6">
      <PageHeader 
        title="현장 운영 대시보드" 
        description="실시간 데이터 수집 및 AI 구조화 현황입니다."
        actions={
          <>
            <Button variant="outline" className="border-slate-800 text-slate-300">
              기간 설정
            </Button>
            <Button variant="mint">
              새 로그 생성
            </Button>
          </>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Feed */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>실시간 로깅 피드</CardTitle>
            <Link to="/log-entries" className="text-sm text-slate-400 hover:text-mint transition-colors flex items-center">
              전체보기 <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLogs.map((log) => (
                <Link 
                  key={log.id} 
                  to="/log-entries/review"
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 border border-slate-800/50 hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-full bg-slate-900 border border-slate-800">
                      {log.type === 'STT' && <Mic className="w-4 h-4 text-info" />}
                      {log.type === 'Vision' && <Video className="w-4 h-4 text-accent" />}
                      {log.type === 'Manual' && <Database className="w-4 h-4 text-mint" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{log.source}</p>
                      <p className="text-xs text-slate-500">{log.type} • {log.time}</p>
                    </div>
                  </div>
                  <StatusBadge status={log.status} />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>시스템 상태</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">AI 모델 가동률</span>
                <span className="text-white font-medium">94%</span>
              </div>
              <ProgressBar value={94} colorClass="bg-mint" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">ERP 동기화 상태</span>
                <span className="text-success font-medium">정상</span>
              </div>
              <ProgressBar value={100} colorClass="bg-success" />
            </div>

            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">활성 경보</h4>
              <div className="flex items-start space-x-3 text-sm p-3 rounded-lg bg-critical/10 border border-critical/20 text-critical">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <p>공정 B 카메라 연결이 불안정합니다. (ERR_042)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
