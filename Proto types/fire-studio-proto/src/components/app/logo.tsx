import { Factory } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  iconClassName?: string;
};

export function Logo({ className, iconClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 text-foreground", className)}>
      <Factory className={cn("text-primary", iconClassName)} />
      <span className="font-bold">FactoryAI</span>
    </div>
  );
}
