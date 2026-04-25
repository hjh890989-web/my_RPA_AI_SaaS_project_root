"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, ReferenceLine, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { dailyMissingRateData } from '@/lib/mock-data';

export function DailyMissingRateChart() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>일별 결측률 추이</CardTitle>
        <CardDescription>최근 7일간의 데이터 결측률</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={dailyMissingRateData}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <ReferenceLine y={5} label={{ value: "목표 5%", position: 'insideTopRight', fill: 'hsl(var(--destructive))', fontSize: 12 }} stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="rate" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
