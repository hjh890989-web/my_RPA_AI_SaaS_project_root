import { kpiData } from "@/lib/mock-data";
import { KpiCard } from "@/components/app/kpi-card";
import { DailyMissingRateChart } from "@/components/charts/daily-missing-rate-chart";
import { LineStatusChart } from "@/components/charts/line-status-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="로깅" 
          value={kpiData.logging.value} 
          unit={kpiData.logging.unit} 
          change={kpiData.logging.change} 
          trend={kpiData.logging.trend} 
        />
        <KpiCard 
          title="결측률" 
          value={kpiData.missingRate.value} 
          unit={kpiData.missingRate.unit} 
          change={kpiData.missingRate.change} 
          trend={kpiData.missingRate.trend}
          isBad={false} 
        />
        <KpiCard 
          title="감사" 
          value={kpiData.audit.value} 
          unit={kpiData.audit.unit} 
          change={kpiData.audit.change} 
          trend={kpiData.audit.trend} 
        />
        <KpiCard 
          title="미승인" 
          value={kpiData.unapproved.value} 
          unit={kpiData.unapproved.unit} 
          change={kpiData.unapproved.change} 
          trend={kpiData.unapproved.trend}
          isBad={true}
        />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <DailyMissingRateChart />
        <LineStatusChart />
      </div>
    </div>
  );
}
