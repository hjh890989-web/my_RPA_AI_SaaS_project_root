"use client";

import { Bell, PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notifications } from "@/lib/mock-data";
import type { NotificationSeverity } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUser } from "@/contexts/user-context";
import { UserNav } from "./user-nav";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Logo } from "./logo";

const severityColors: Record<NotificationSeverity, string> = {
  CRITICAL: "bg-destructive",
  WARNING: "bg-yellow-500",
  INFO: "bg-blue-500",
};

export function Header() {
    const { user } = useUser();
    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="md:hidden" />
                <Logo className="hidden md:flex text-lg" />
            </div>

            <div className="flex w-full items-center justify-end gap-4">
                <span className="text-sm text-muted-foreground font-medium hidden sm:inline">{user?.company}</span>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                            {unreadCount}
                        </span>
                        )}
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 md:w-96">
                        <DropdownMenuLabel>알림</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.map((notification) => (
                                <DropdownMenuItem key={notification.id} className={cn("flex items-start gap-3", notification.isRead && "opacity-50")}>
                                    <div className={cn("mt-1 h-2 w-2 rounded-full flex-shrink-0", severityColors[notification.severity])} />
                                    <div className="flex-grow">
                                        <p className="text-sm">{notification.message}</p>
                                        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <UserNav />
            </div>
        </header>
    );
}
