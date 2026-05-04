/**
 * @file Onboarding.tsx — 시스템 온보딩 가이드 (ADMIN 전용)
 * @description FactoryAI 도입을 위한 5단계 설정 프로세스를 안내하는 페이지.
 *   각 단계: 회사 정보 → 사용자/권한 → 데이터 소스 → ERP/MES → AI 모델 최적화
 *   현재 진행 중인 단계(in_progress)에 강조 표시와 "설정하기" 버튼이 노출됩니다.
 *
 * @ai-context steps 상수에 5단계 정의. status 값: completed, in_progress, pending.
 *   ADMIN 역할에서만 사이드바에 노출됩니다 (Layout.tsx의 adminNavigation 참조).
 */
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PageHeader } from '@/components/ui/PageHeader'

const steps = [
  { id: 1, title: '회사 정보 설정', description: '사업자 등록번호 및 공장 위치 정보 입력', status: 'completed' },
  { id: 2, title: '사용자 및 권한 설정', description: '5역할 RBAC 기반 팀원 초대 및 권한 할당', status: 'completed' },
  { id: 3, title: '데이터 소스 연결', description: '현장 카메라 및 마이크 센서 스트림 연동', status: 'in_progress' },
  { id: 4, title: 'ERP/MES 인터페이스', description: '기존 시스템과의 API 스키마 매핑', status: 'pending' },
  { id: 5, title: 'AI 모델 최적화', description: '현장 특화 용어 및 이미지 데이터 학습', status: 'pending' },
]

export default function Onboarding() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <PageHeader 
        title="시스템 온보딩 가이드" 
        description="FactoryAI 도입을 위한 5단계 설정 프로세스입니다."
      />

      <div className="space-y-4">
        {steps.map((step) => (
          <Card key={step.id} className={cn(
            "relative overflow-hidden transition-all",
            step.status === 'in_progress' && "border-mint ring-1 ring-mint/20"
          )}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2",
                    step.status === 'completed' ? "bg-success/20 border-success text-success" :
                    step.status === 'in_progress' ? "bg-mint/20 border-mint text-mint" :
                    "border-slate-700 text-slate-500"
                  )}>
                    {step.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : step.id}
                  </div>
                  <div>
                    <h3 className={cn(
                      "text-lg font-semibold",
                      step.status === 'pending' ? "text-slate-500" : "text-white"
                    )}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{step.description}</p>
                  </div>
                </div>
                {step.status === 'in_progress' && (
                  <Button variant="mint" size="sm">
                    설정하기 <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
            {step.status === 'in_progress' && (
              <div className="absolute bottom-0 left-0 h-1 bg-mint w-1/3 animate-pulse" />
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
