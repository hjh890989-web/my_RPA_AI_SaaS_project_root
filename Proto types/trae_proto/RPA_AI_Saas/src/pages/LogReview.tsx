import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Check, 
  X, 
  RotateCcw, 
  Edit3, 
  Eye, 
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react'

const pendingItems = [
  {
    id: 'LOG-002',
    type: 'Vision',
    source: '공정 C - 외관 검사',
    original: '제품 표면 스크래치 감지',
    aiStructured: {
      category: '품질결함',
      severity: 'Medium',
      action: '재검사 필요',
      value: '0.2mm Scratch'
    },
    confidence: 94.2,
    time: '5분 전'
  },
  {
    id: 'LOG-004',
    type: 'STT',
    source: '공정 B - 조립',
    original: '조립 라인 2번 모터 소음 발생, 점검 요망',
    aiStructured: {
      category: '설비점검',
      severity: 'High',
      action: '유지보수 티켓 생성',
      value: 'Motor Noise'
    },
    confidence: 88.5,
    time: '15분 전'
  }
]

export default function LogReview() {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-400 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> 목록으로
          </Button>
          <h1 className="text-2xl font-bold text-white">HITL 인간 승인</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <span className="font-mono">Page 1 of 12</span>
          <div className="flex space-x-1">
            <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-slate-800"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {pendingItems.map((item) => (
          <Card key={item.id} className="border-l-4 border-l-warning">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Original Data */}
                <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-900/50">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-slate-400 border-slate-700">{item.type}</Badge>
                    <span className="text-xs text-slate-500">{item.time}</span>
                  </div>
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Original Input</h3>
                  <p className="text-white text-lg font-medium leading-relaxed">"{item.original}"</p>
                  <div className="mt-6 p-4 rounded-lg bg-slate-950 border border-slate-800">
                    <p className="text-xs text-slate-500 mb-2">Metadata</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="text-slate-400">Source: <span className="text-slate-200">{item.source}</span></div>
                      <div className="text-slate-400">ID: <span className="text-slate-200">{item.id}</span></div>
                    </div>
                  </div>
                </div>

                {/* Right: AI Structured Data */}
                <div className="lg:col-span-7 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-mint" />
                      <span className="text-sm font-semibold text-white">AI Structured Result</span>
                    </div>
                    <Badge variant="mint" className="bg-mint/10 text-mint border-mint/20">
                      Confidence {item.confidence}%
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {Object.entries(item.aiStructured).map(([key, value]) => (
                      <div key={key} className="p-3 rounded-lg bg-slate-800/50 border border-slate-800 group relative">
                        <label className="text-[10px] text-slate-500 uppercase tracking-widest">{key}</label>
                        <p className="text-sm font-medium text-white mt-1">{value}</p>
                        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Edit3 className="w-3 h-3 text-slate-500 hover:text-mint" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                    <Button variant="outline" className="border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800">
                      <RotateCcw className="w-4 h-4 mr-2" /> Rollback
                    </Button>
                    <Button variant="outline" className="border-slate-800 text-critical hover:bg-critical/10">
                      <X className="w-4 h-4 mr-2" /> Reject
                    </Button>
                    <Button variant="mint">
                      <Check className="w-4 h-4 mr-2" /> Approve & ERP Sync
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
