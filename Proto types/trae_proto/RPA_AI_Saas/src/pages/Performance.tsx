import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Zap, 
  Award,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Activity,
  CheckCircle2
} from 'lucide-react'

const kpiStats = [
  { label: '종합 설비 효율 (OEE)', value: '88.4%', change: '+2.1%', trend: 'up', icon: Activity, color: 'text-info' },
  { label: '품질 합격률', value: '99.85%', change: '+0.12%', trend: 'up', icon: CheckCircle2, color: 'text-success' },
  { label: '시간당 생산량', value: '1,240', change: '+5.4%', trend: 'up', icon: Zap, color: 'text-accent' },
  { label: '다운타임 (월)', value: '4.2h', change: '-12%', trend: 'down', icon: Clock, color: 'text-critical' },
]

const performanceGoals = [
  { name: '품질 목표 달성', progress: 98, target: '99.9%', color: 'bg-mint' },
  { name: 'AI 구조화 정확도', progress: 94, target: '98.0%', color: 'bg-info' },
  { name: 'ERP 동기화 성공률', progress: 100, target: '100%', color: 'bg-success' },
  { name: '현장 작업 만족도', progress: 85, target: '90.0%', color: 'bg-warning' },
]

export default function Performance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">성과 분석 대시보드</h1>
          <p className="text-slate-400">공장 전체의 생산성 및 품질 KPI 달성 현황입니다.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-800 text-slate-300">
            리포트 내보내기
          </Button>
          <Button variant="mint">
            데이터 갱신
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center text-xs font-bold ${stat.trend === 'up' ? 'text-success' : 'text-critical'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trends Mockup */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-mint" />
              <CardTitle>생산 및 품질 트렌드 (최근 30일)</CardTitle>
            </div>
            <div className="flex space-x-2">
              <Badge variant="outline" className="text-[10px] border-slate-700">Daily</Badge>
              <Badge variant="mint" className="text-[10px]">Weekly</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-end justify-between space-x-2 pt-10">
              {[65, 72, 68, 85, 92, 88, 95, 82, 78, 90, 96, 88, 92, 98, 95].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group">
                  <div className="w-full relative">
                    <div 
                      className="w-full bg-slate-800 rounded-t-sm group-hover:bg-slate-700 transition-colors" 
                      style={{ height: `${val * 2}px` }}
                    >
                      <div 
                        className="absolute bottom-0 w-full bg-mint opacity-50 rounded-t-sm" 
                        style={{ height: `${val * 0.8}px` }} 
                      />
                    </div>
                  </div>
                  <span className="text-[8px] text-slate-600 mt-2 rotate-45">{i + 1}일</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-slate-800 mr-2 rounded-sm" />
                <span className="text-xs text-slate-400">생산량</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-mint/50 mr-2 rounded-sm" />
                <span className="text-xs text-slate-400">품질 합격률</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Goals & Achievements */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-warning" />
                <CardTitle>목표 달성률</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {performanceGoals.map((goal) => (
                <div key={goal.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">{goal.name}</span>
                    <span className="text-slate-500 text-xs">Target: {goal.target}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${goal.color} transition-all duration-1000`} style={{ width: `${goal.progress}%` }} />
                  </div>
                  <div className="flex justify-end">
                    <span className="text-[10px] font-bold text-white">{goal.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-primary/20 border-primary/30">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-accent" />
                <CardTitle>최근 주요 성과</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-1 rounded bg-accent/20 text-accent">
                    <TrendingUp className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">검수 시간 30% 단축</p>
                    <p className="text-xs text-slate-500">AI STT 도입 후 데이터 입력 효율 증대</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="mt-1 p-1 rounded bg-success/20 text-success">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">무사고 100일 달성</p>
                    <p className="text-xs text-slate-500">안전 모니터링 강화 결과</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
