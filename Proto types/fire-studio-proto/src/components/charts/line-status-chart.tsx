"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { lineStatusData } from '@/lib/mock-data';

const statusColors: { [key: string]: string } = {
  active: 'hsl(var(--primary))',
  maintenance: 'hsl(var(--destructive))',
  idle: 'hsl(var(--muted-foreground))',
};

export function LineStatusChart() {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>라인별 가동 상태</CardTitle>
        <CardDescription>현재 각 생산 라인의 가동률</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lineStatusData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="line" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="%" />
              <Tooltip
                cursor={{ fill: 'hsla(var(--card), 0.5)' }}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {lineStatusData.map((entry, index) => (
                  <rect key={`bar-${index}`} fill={statusColors[entry.status]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
