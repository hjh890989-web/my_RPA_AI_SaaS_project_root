"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";

import { useUser } from "@/contexts/user-context";
import { adminNavItems, navItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";
import { Logo } from "./logo";


export function MainSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  if (!user) return null;

  const filteredNavItems = navItems.filter(item => item.roles.includes(user.role));
  const filteredAdminNavItems = adminNavItems.filter(item => item.roles.includes(user.role));

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
        <SidebarHeader>
            <Logo className="p-2"/>
        </SidebarHeader>
        <SidebarContent className="p-2">
            <SidebarMenu>
                {filteredNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href} passHref legacyBehavior>
                            <SidebarMenuButton
                                asChild
                                isActive={pathname === item.href}
                                tooltip={item.label}
                            >
                                <a>
                                    <item.icon />
                                    <span>{item.label}</span>
                                </a>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            
            {filteredAdminNavItems.length > 0 && (
              <>
                <Separator className="my-2"/>
                <SidebarGroup>
                    <SidebarGroupLabel>관리자</SidebarGroupLabel>
                    <SidebarMenu>
                        {filteredAdminNavItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href} passHref legacyBehavior>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.href}
                                        tooltip={item.label}
                                    >
                                        <a>
                                            <item.icon />
                                            <span>{item.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
              </>
            )}
        </SidebarContent>
        <SidebarFooter>
            <Separator className="mb-2" />
            <Button variant="ghost" className="w-full justify-start text-left p-2">
                <div className="flex w-full items-center">
                    <div className="flex-1">
                        <p className="text-sm font-medium">{user.company}</p>
                        <p className="text-xs text-muted-foreground">대한금속</p>
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                </div>
            </Button>
        </SidebarFooter>
    </Sidebar>
  );
}
