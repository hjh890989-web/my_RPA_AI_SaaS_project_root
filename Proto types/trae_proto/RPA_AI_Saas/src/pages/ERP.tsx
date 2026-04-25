import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table'
import { 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Link2, 
  Settings2,
  ArrowRightLeft,
  FileSpreadsheet
} from 'lucide-react'

const erpConnections = [
  { id: 'sap-01', name: 'SAP S/4HANA', type: 'Main ERP', status: 'connected', lastSync: '10분 전', syncRate: '99.9%' },
  { id: 'oracle-01', name: 'Oracle NetSuite', type: 'Sub ERP', status: 'connected', lastSync: '1시간 전', syncRate: '98.5%' },
  { id: 'excel-01', name: 'Legacy Excel DB', type: 'Legacy', status: 'warning', lastSync: '1일 전', syncRate: '85.2%' },
]

const mappingData = [
  { factoryField: 'lot_number', erpField: 'BATCH_ID', type: 'String', status: 'mapped' },
  { factoryField: 'defect_type', erpField: 'QC_CODE', type: 'Enum', status: 'mapped' },
  { factoryField: 'inspector_id', erpField: 'EMP_NO', type: 'String', status: 'mapped' },
  { factoryField: 'inspection_date', erpField: 'TRANS_DATE', type: 'DateTime', status: 'mapped' },
  { factoryField: 'pass_fail', erpField: 'RESULT_VAL', type: 'Boolean', status: 'pending' },
]

const syncLogs = [
  { id: 'sync-125', time: '2026-04-25 14:20:01', system: 'SAP', items: 124, status: 'success' },
  { id: 'sync-124', time: '2026-04-25 14:15:42', system: 'Oracle', items: 42, status: 'success' },
  { id: 'sync-123', time: '2026-04-25 14:10:15', system: 'SAP', items: 15, status: 'error', error: 'Field mismatch' },
  { id: 'sync-122', time: '2026-04-25 13:55:22', system: 'SAP', items: 230, status: 'success' },
]

export default function ERP() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">ERP 연동 관리</h1>
          <p className="text-slate-400">외부 ERP 시스템과의 데이터 동기화 및 필드 매핑을 관리합니다.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-800 text-slate-300">
            <Settings2 className="w-4 h-4 mr-2" /> 연동 설정
          </Button>
          <Button variant="mint">
            <RefreshCw className="w-4 h-4 mr-2" /> 전체 동기화 실행
          </Button>
        </div>
      </div>

      {/* Connection Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {erpConnections.map((conn) => (
          <Card key={conn.id} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-slate-800">
                  {conn.type === 'Legacy' ? <FileSpreadsheet className="w-5 h-5 text-warning" /> : <Database className="w-5 h-5 text-info" />}
                </div>
                <Badge variant={conn.status === 'connected' ? 'success' : 'warning'}>
                  {conn.status === 'connected' ? '연결됨' : '점검 필요'}
                </Badge>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{conn.name}</h3>
                <p className="text-sm text-slate-500">{conn.type}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">최근 동기화</p>
                  <p className="text-sm font-medium text-slate-300">{conn.lastSync}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">데이터 정합성</p>
                  <p className="text-sm font-medium text-mint">{conn.syncRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Mapping Table */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="w-5 h-5 text-mint" />
              <CardTitle>필드 매핑 현황</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400">
              매핑 편집
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>FactoryAI 필드</TableHead>
                  <TableHead>ERP 필드 (Mapping)</TableHead>
                  <TableHead>데이터 타입</TableHead>
                  <TableHead>상태</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mappingData.map((row) => (
                  <TableRow key={row.factoryField}>
                    <TableCell className="font-medium text-slate-300">{row.factoryField}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-slate-400">
                        <Link2 className="w-3 h-3 mr-2 text-slate-600" />
                        {row.erpField}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-500 text-xs">{row.type}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === 'mapped' ? 'success' : 'warning'}>
                        {row.status === 'mapped' ? '완료' : '미연결'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sync Logs */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-5 h-5 text-info" />
              <CardTitle>최근 동기화 로그</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {syncLogs.map((log) => (
                <div key={log.id} className="p-3 rounded-lg bg-slate-800/30 border border-slate-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">{log.system} System</span>
                    <Badge variant={log.status === 'success' ? 'success' : 'destructive'} className="text-[10px] px-1.5 py-0">
                      {log.status === 'success' ? 'SUCCESS' : 'FAILED'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-500">{log.time}</p>
                      <p className="text-sm text-slate-300">{log.items} entries synced</p>
                    </div>
                    {log.status === 'error' && (
                      <div className="flex items-center text-critical text-[10px]">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {log.error}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-xs text-slate-500 hover:text-white">
                전체 로그 보기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
