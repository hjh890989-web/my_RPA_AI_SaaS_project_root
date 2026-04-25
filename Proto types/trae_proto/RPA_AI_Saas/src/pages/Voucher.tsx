/**
 * @file Voucher.tsx — 정부 바우처 관리 (ADMIN 전용)
 * @description 스마트공장 보급확산 사업 지원금 및 집행 현황을 관리하는 페이지.
 *   - 상단: 6단계 스테퍼 (임시저장 → 신청 → 선정 → 협약 → 정산 → 종료)
 *   - 좌측: 예산 집행 현황 (총 사업비 2,500만원, 자부담 800만원, 소진율 45%)
 *   - 우측: 최근 증빙 서류 목록 + 업로드 버튼
 *
 * @ai-context voucherSteps 상수에 6단계 정의. currentStep으로 현재 단계 하이라이트.
 *   ADMIN 역할에서만 사이드바에 노출됩니다 (Layout.tsx의 adminNavigation 참조).
 */
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Wallet, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const voucherSteps = [
  { id: 'DRAFT', label: '임시저장', date: '2026-04-10' },
  { id: 'SUBMITTED', label: '신청완료', date: '2026-04-15' },
  { id: 'SELECTED', label: '선정완료', date: '2026-04-20' },
  { id: 'ACTIVE', label: '협약중', date: '현재' },
  { id: 'SETTLED', label: '정산중', date: '-' },
  { id: 'CLOSED', label: '종료', date: '-' },
]

export default function Voucher() {
  const currentStep = 'ACTIVE'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">정부 바우처 관리</h1>
        <p className="text-slate-400">스마트공장 보급확산 사업 지원금 및 집행 현황입니다.</p>
      </div>

      {/* Stepper */}
      <Card>
        <CardContent className="p-8">
          <div className="relative">
            <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800" />
            <div className="relative flex justify-between">
              {voucherSteps.map((step, index) => {
                const isCompleted = voucherSteps.findIndex(s => s.id === currentStep) >= index
                const isCurrent = step.id === currentStep
                
                return (
                  <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                      isCurrent ? "bg-mint border-mint text-slate-950 shadow-[0_0_15px_rgba(78,205,196,0.5)]" :
                      isCompleted ? "bg-slate-800 border-mint text-mint" :
                      "bg-slate-900 border-slate-700 text-slate-500"
                    )}>
                      {isCompleted && !isCurrent ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                    </div>
                    <div className="mt-3 text-center">
                      <p className={cn(
                        "text-xs font-bold",
                        isCurrent ? "text-mint" : isCompleted ? "text-slate-300" : "text-slate-500"
                      )}>{step.label}</p>
                      <p className="text-[10px] text-slate-500 mt-1">{step.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>예산 집행 현황</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-slate-500 mb-2">총 사업비</p>
                <h3 className="text-4xl font-bold text-mint">2,500<span className="text-lg ml-1">만원</span></h3>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">자부담 (32%)</p>
                <h3 className="text-4xl font-bold text-white">800<span className="text-lg ml-1">만원</span></h3>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">바우처 소진율</span>
                <span className="text-white">45%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-mint w-[45%]" />
              </div>
            </div>

            <div className="flex items-center p-4 rounded-lg bg-info/10 border border-info/20 text-info text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              다음 차수 정산 서류 제출 기한이 5일 남았습니다. (5/1 까지)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>최근 증빙 서류</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-800">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-xs text-slate-300">세금계산서_042{i}.pdf</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs text-mint">
                  보기
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full border-slate-800 text-slate-400 mt-4">
              증빙 서류 업로드
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
