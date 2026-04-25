"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/user-context";
import { userRoles } from "@/lib/mock-data";
import type { UserRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/app/logo";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        variant: "destructive",
        title: "로그인 실패",
        description: "이메일 또는 비밀번호가 올바르지 않습니다.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (role: UserRole) => {
    login(role);
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
      <Card className="w-full max-w-[420px] border-2 bg-card shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <CardHeader className="text-center">
          <Logo className="mx-auto mb-2 h-auto w-auto text-2xl" iconClassName="h-7 w-7" />
          <CardTitle className="text-2xl font-bold">FactoryAI</CardTitle>
          <CardDescription className="text-muted-foreground">스마트 공장 AI 관리 플랫폼</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="email" 
                placeholder="이메일" 
                className="h-12 pl-10 text-base bg-background border-input focus:border-primary"
                disabled={isLoading}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                type="password" 
                placeholder="비밀번호" 
                className="h-12 pl-10 text-base bg-background border-input focus:border-primary"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-bold text-white bg-button-gradient transition-transform hover:scale-102 hover:shadow-glow"
              disabled={isLoading}
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="relative w-full text-center">
            <span className="px-2 text-xs uppercase text-muted-foreground bg-card">데모 퀵 로그인</span>
            <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 border-t border-border/50 -z-10"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full">
            {userRoles.map(({ role, name, color }) => (
              <Button
                key={role}
                variant="ghost"
                onClick={() => handleQuickLogin(role)}
                className={cn("h-auto py-2 flex flex-col items-center gap-1", color)}
              >
                <span>{name}</span>
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
