import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Calculator, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap, 
  ChevronRight,
  Download,
  PieChart,
  BarChart,
  CheckCircle2
} from 'lucide-react'

export default function ROICalculator() {
  const [laborCost, setLaborCost] = useState(3500)
  const [monthlyVolume, setMonthlyVolume] = useState(50000)
  const [errorRate, setErrorRate] = useState(4.5)

  // Mock calculations
  const currentCost = (laborCost * 5) + (monthlyVolume * (errorRate / 100) * 15)
  const aiCost = (laborCost * 1.5) + (monthlyVolume * 0.005 * 15) + 2000
  const savings = currentCost - aiCost
  const roiPercent = (savings / 2000) * 100

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-mint/10 text-mint mb-2">
          <Calculator className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-white tracking-tight">FactoryAI ROI 계산기</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          현재 공정 데이터를 입력하고 FactoryAI 도입 시 예상되는 비용 절감액과 생산성 향상 지표를 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <Card className="lg:col-span-1 border-slate-800 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-lg">공정 데이터 입력</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">평균 인건비 (월/인당)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="number" 
                  value={laborCost}
                  onChange={(e) => setLaborCost(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-mint transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">월간 생산량 (Units)</label>
              <div className="relative">
                <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="number" 
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-mint transition-colors"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">현재 불량률 (%)</label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="number" 
                  step="0.1"
                  value={errorRate}
                  onChange={(e) => setErrorRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-mint transition-colors"
                />
              </div>
            </div>
            <Button variant="mint" className="w-full mt-4">
              분석 리포트 생성 <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-400">예상 월간 절감액</p>
                <h3 className="text-3xl font-bold text-white mt-2">
                  ${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </h3>
                <div className="flex items-center mt-2 text-success text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span>현재 대비 64% 절감</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-mint/10 border-mint/20">
              <CardContent className="p-6">
                <p className="text-sm font-medium text-slate-400">투자 대비 수익률 (ROI)</p>
                <h3 className="text-3xl font-bold text-mint mt-2">
                  {roiPercent.toLocaleString(undefined, { maximumFractionDigits: 1 })}%
                </h3>
                <div className="flex items-center mt-2 text-slate-400 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>손익분기점: 3.2개월</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>세부 분석 지표</CardTitle>
              <Button variant="outline" size="sm" className="border-slate-800">
                <Download className="w-4 h-4 mr-2" /> PDF 내보내기
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Cost Comparison Chart Mockup */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <h4 className="text-sm font-semibold text-slate-300">비용 비교 (Monthly)</h4>
                    <div className="flex space-x-4 text-[10px] uppercase font-bold text-slate-500">
                      <div className="flex items-center"><div className="w-2 h-2 bg-slate-700 mr-1 rounded-full" /> 기존</div>
                      <div className="flex items-center"><div className="w-2 h-2 bg-mint mr-1 rounded-full" /> FactoryAI</div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>인건비 (검수/기록)</span>
                        <span className="text-slate-500">$17,500 vs $5,250</span>
                      </div>
                      <div className="h-4 flex rounded-full overflow-hidden bg-slate-800">
                        <div className="h-full bg-slate-700 w-full" />
                        <div className="h-full bg-mint w-[30%]" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>불량 처리 비용</span>
                        <span className="text-slate-500">$33,750 vs $3,750</span>
                      </div>
                      <div className="h-4 flex rounded-full overflow-hidden bg-slate-800">
                        <div className="h-full bg-slate-700 w-full" />
                        <div className="h-full bg-mint w-[11%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="space-y-2">
                    <div className="flex items-center text-mint">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      <span className="text-xs font-bold uppercase">생산성</span>
                    </div>
                    <p className="text-sm text-slate-300">데이터 입력 시간 95% 단축</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-info">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      <span className="text-xs font-bold uppercase">품질</span>
                    </div>
                    <p className="text-sm text-slate-300">불량 탐지 정확도 99.8% 달성</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-accent">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      <span className="text-xs font-bold uppercase">리스크</span>
                    </div>
                    <p className="text-sm text-slate-300">휴먼 에러 발생률 0% 수렴</p>
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
