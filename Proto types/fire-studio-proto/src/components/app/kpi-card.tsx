import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiCardProps = {
  title: string;
  value: string | number;
  unit: string;
  change: number | null;
  trend: "up" | "down" | "neutral";
  isBad?: boolean;
};

export function KpiCard({ title, value, unit, change, trend, isBad = false }: KpiCardProps) {
  const isPositive = trend === 'up' && !isBad;
  const isNegative = trend === 'down' && !isBad;
  const isWarning = trend === 'up' && isBad;

  const trendColor = isPositive ? "text-green-400" : isNegative ? "text-red-400" : isWarning ? "text-red-400" : "text-muted-foreground";

  return (
    <Card className="bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}<span className="text-2xl text-muted-foreground ml-1">{unit}</span></div>
        {change !== null && (
          <p className={cn("text-sm text-muted-foreground mt-1 flex items-center", trendColor)}>
            {trend === 'up' && <ArrowUp className="h-4 w-4" />}
            {trend === 'down' && <ArrowDown className="h-4 w-4" />}
            {trend !== 'neutral' && `${Math.abs(change)}%`}
            {trend === 'neutral' && 'No change'}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
