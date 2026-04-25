/**
 * @file Security.tsx — 보안 콘솔
 * @description 시스템 보안 상태 모니터링 및 액세스 제어 관리 페이지 (CISO 주요 사용).
 *   - 상단: 4개 보안 KPI (보안 점수, 활성 세션, 차단 시도, 마지막 스캔)
 *   - 좌측: 실시간 액세스 로그 테이블 (사용자, 작업, IP, 상태)
 *   - 우측: 영역별 위협 탐지 + RBAC 역할 현황
 *
 * @ai-context Mock 데이터: securityStats(4개), accessLogs(5개), threatLevels(4개).
 *   "긴급 락다운" 버튼은 UI만 존재하며 실제 기능 미구현.
 *   Table 컴포넌트를 사용하는 2개 페이지 중 하나 (다른 하나: ERP.tsx).
 */
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Users, 
  AlertTriangle, 
  ShieldAlert,
  Fingerprint,
  Activity,
  UserCheck,
  Globe
} from 'lucide-react'

const securityStats = [
  { label: '보안 점수', value: '98/100', status: 'excellent', icon: ShieldCheck, color: 'text-success' },
  { label: '활성 세션', value: '24', status: 'normal', icon: Users, color: 'text-info' },
  { label: '차단된 시도 (24h)', value: '156', status: 'blocked', icon: ShieldAlert, color: 'text-critical' },
  { label: '마지막 스캔', value: '15분 전', status: 'recent', icon: Activity, color: 'text-mint' },
]

const accessLogs = [
  { id: 1, user: 'admin@factoryai.com', role: 'ADMIN', action: 'System Config Change', time: '10분 전', ip: '192.168.1.10', status: 'success' },
  { id: 2, user: 'worker_a@factory.com', role: 'WORKER', action: 'Log Entry Created', time: '25분 전', ip: '10.0.5.42', status: 'success' },
  { id: 3, user: 'unknown_user', role: 'NONE', action: 'Failed Login Attempt', time: '42분 전', ip: '45.12.33.122', status: 'critical' },
  { id: 4, user: 'manager_b@factory.com', role: 'MANAGER', action: 'Report Exported', time: '1시간 전', ip: '192.168.1.15', status: 'success' },
  { id: 5, user: 'worker_c@factory.com', role: 'WORKER', action: 'Manual Override', time: '2시간 전', ip: '10.0.5.45', status: 'warning' },
]

const threatLevels = [
  { region: 'External Access', level: 'Low', count: 12, color: 'bg-success' },
  { region: 'API Integrity', level: 'Stable', count: 0, color: 'bg-mint' },
  { region: 'User Behavior', level: 'Anomalous', count: 2, color: 'bg-warning' },
  { region: 'Data Encryption', level: 'Active', count: 0, color: 'bg-info' },
]

export default function Security() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">보안 콘솔</h1>
          <p className="text-slate-400">시스템 보안 상태 모니터링 및 액세스 제어를 관리합니다.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-800 text-slate-300">
            <Fingerprint className="w-4 h-4 mr-2" /> 인증 설정
          </Button>
          <Button variant="destructive">
            <Lock className="w-4 h-4 mr-2" /> 긴급 락다운
          </Button>
        </div>
      </div>

      {/* Security Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {securityStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-slate-800 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <Badge variant={stat.status === 'excellent' ? 'success' : stat.status === 'blocked' ? 'destructive' : 'info'}>
                  {stat.status.toUpperCase()}
                </Badge>
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
        {/* Access Logs */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-info" />
              <CardTitle>실시간 액세스 로그</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400">
              로그 다운로드
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>사용자</TableHead>
                  <TableHead>작업</TableHead>
                  <TableHead>IP 주소</TableHead>
                  <TableHead>시간</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accessLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div>
                        <p className="text-sm font-medium text-slate-300">{log.user}</p>
                        <p className="text-[10px] text-slate-500">{log.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-400">{log.action}</TableCell>
                    <TableCell className="text-xs text-slate-500 font-mono">{log.ip}</TableCell>
                    <TableCell className="text-xs text-slate-500">{log.time}</TableCell>
                    <TableCell>
                      <Badge variant={log.status === 'success' ? 'success' : log.status === 'warning' ? 'warning' : 'destructive'}>
                        {log.status === 'success' ? '정상' : log.status === 'warning' ? '주의' : '위험'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Threat Detection & Role Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-warning" />
                <CardTitle>영역별 위협 탐지</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatLevels.map((item) => (
                  <div key={item.region} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">{item.region}</span>
                      <span className={`font-medium ${item.level === 'Anomalous' ? 'text-warning' : 'text-slate-300'}`}>
                        {item.level}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color} ${item.level === 'Anomalous' ? 'w-3/4' : 'w-full'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5 text-mint" />
                <CardTitle>역할 기반 접근 제어 (RBAC)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                  <span className="text-xs text-slate-400">최고 관리자 (Admin)</span>
                  <Badge variant="outline" className="text-[10px] border-slate-700">2 명</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                  <span className="text-xs text-slate-400">품질 관리자 (Manager)</span>
                  <Badge variant="outline" className="text-[10px] border-slate-700">5 명</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-800/50">
                  <span className="text-xs text-slate-400">현장 작업자 (Worker)</span>
                  <Badge variant="outline" className="text-[10px] border-slate-700">42 명</Badge>
                </div>
                <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-white mt-2">
                  권한 설정 바로가기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
