/**
 * @file XAI.tsx — XAI 품질 이상탐지 (Explainable AI)
 * @description AI가 탐지한 이상 징후의 근거(Decision Logic)를 투명하게 보여주는 페이지.
 *   - 메인: 이상 징후 상세 + AI 판단 로직 (형태 분석, 환경 변수)
 *   - 사이드: 탐지 정확도 추이 차트 + 학습 데이터셋 상태
 *   - 하단: 수동 판단 모드 / 승인 및 리포트 발행 버튼
 *
 * @ai-context 이상 탐지 데이터는 모두 인라인 하드코딩. Confidence 98.2%, Latency 42ms 등.
 *   바 차트는 CSS div 기반으로 구현되어 있으며, 실제 차트 라이브러리(recharts 등) 미사용.
 */
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Zap, 
  BrainCircuit, 
  Target, 
  Info, 
  AlertTriangle,
  ArrowRight,
  BarChart2,
  CheckCircle
} from 'lucide-react'

export default function XAI() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">XAI 품질 이상탐지</h1>
          <p className="text-slate-400">AI가 판단한 이상 징후의 근거를 확인하고 품질을 관리합니다.</p>
        </div>
        <Button variant="mint" size="sm">
          분석 모델 업데이트
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis Card */}
        <Card className="lg:col-span-2 border-l-4 border-l-critical">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-critical" />
              <CardTitle>최근 이상 징후 분석</CardTitle>
            </div>
            <Badge variant="destructive">Critical</Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-500 uppercase mb-2">Detected Event</h3>
              <p className="text-white text-lg">"공정 B 용접부에서 미세 균열(Micro-crack) 패턴 0.85mm 발견"</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white">AI Decision Logic (XAI)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-800">
                  <div className="flex items-center space-x-2 text-info mb-2">
                    <BrainCircuit className="w-4 h-4" />
                    <span className="text-xs font-bold">형태 분석</span>
                  </div>
                  <p className="text-sm text-slate-300">균열의 기하학적 형태가 과거 불량 데이터(Batch #402)와 92% 일치합니다.</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-800">
                  <div className="flex items-center space-x-2 text-warning mb-2">
                    <Zap className="w-4 h-4" />
                    <span className="text-xs font-bold">환경 변수</span>
                  </div>
                  <p className="text-sm text-slate-300">해당 시점의 주변 온도가 기준치보다 4.2도 높게 형성되었습니다.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex space-x-4">
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase">Confidence</p>
                  <p className="text-lg font-bold text-mint">98.2%</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-slate-500 uppercase">Latency</p>
                  <p className="text-lg font-bold text-white">42ms</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="border-slate-800">수동 판단 모드</Button>
                <Button variant="mint">승인 및 리포트 발행</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar: Statistics & Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">탐지 정확도 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-32 flex items-end space-x-2">
                {[40, 60, 45, 90, 85, 95, 98].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary/20 rounded-t-sm relative group">
                    <div className="absolute bottom-0 w-full bg-mint rounded-t-sm transition-all group-hover:bg-mint/80" style={{ height: `${h}%` }} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-slate-500">
                <span>04/19</span>
                <span>Today</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">학습 데이터셋 상태</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">총 학습 로그</span>
                <span className="text-white font-mono">1.2M+</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">품질 레이블링</span>
                <span className="text-success font-mono">99.9%</span>
              </div>
              <Button variant="outline" className="w-full border-slate-800 text-xs py-1 h-8">
                데이터셋 상세 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
