import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RoiCalculatorPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
       <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">🏭 FactoryAI ROI Calculator</h1>
        <Button asChild variant="outline">
            <Link href="/login">로그인</Link>
        </Button>
       </header>
      <Card>
        <CardHeader>
          <CardTitle>ROI Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is a placeholder for the public ROI calculator page.</p>
        </CardContent>
      </Card>
    </div>
  );
}
