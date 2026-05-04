import React from 'react'
import { Badge } from './badge'

export type StatusType = 'APPROVED' | 'PENDING_REVIEW' | 'ANALYZING' | 'COMPLETED' | 'PENDING' | 'STRUCTURING' | string

export interface StatusBadgeProps {
  status: StatusType
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (s: string) => {
    switch (s.toUpperCase()) {
      case 'APPROVED':
      case 'COMPLETED':
        return { variant: 'success', label: s.toUpperCase() === 'APPROVED' ? '승인완료' : '완료' }
      case 'PENDING_REVIEW':
      case 'PENDING':
        return { variant: 'warning', label: s.toUpperCase() === 'PENDING_REVIEW' ? '검토대기' : '검토중' }
      case 'ANALYZING':
      case 'STRUCTURING':
        return { variant: 'info', label: s.toUpperCase() === 'ANALYZING' ? '분석중' : 'AI 분석중' }
      default:
        return { variant: 'default', label: s }
    }
  }

  const config = getStatusConfig(status)

  return (
    <Badge variant={config.variant as any}>
      {config.label}
    </Badge>
  )
}
