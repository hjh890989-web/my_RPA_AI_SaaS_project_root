import React from 'react'
import { Card, CardContent } from './card'
import { Badge } from './badge'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface StatCardProps {
  label: string
  value: string | number
  change: string
  icon: LucideIcon
  color?: string
}

export function StatCard({ label, value, change, icon: Icon, color = 'text-info' }: StatCardProps) {
  const isPositive = change.startsWith('+')
  const isNegative = change.startsWith('-')
  const isNew = change === '신규'

  const badgeVariant = isPositive ? 'success' : isNegative ? 'warning' : isNew ? 'destructive' : 'info'

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={cn("p-2 rounded-lg bg-slate-800/50", color)}>
            <Icon className="w-5 h-5" />
          </div>
          <Badge variant={badgeVariant as any}>
            {change}
          </Badge>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
