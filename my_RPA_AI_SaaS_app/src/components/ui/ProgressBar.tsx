import React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressBarProps {
  value: number | string
  colorClass?: string
  trackColorClass?: string
  className?: string
}

export function ProgressBar({ 
  value, 
  colorClass = 'bg-mint', 
  trackColorClass = 'bg-slate-800',
  className 
}: ProgressBarProps) {
  return (
    <div className={cn("h-2 rounded-full overflow-hidden", trackColorClass, className)}>
      <div 
        className={cn("h-full transition-all duration-500", colorClass)} 
        style={{ width: typeof value === 'number' ? `${value}%` : value }} 
      />
    </div>
  )
}
