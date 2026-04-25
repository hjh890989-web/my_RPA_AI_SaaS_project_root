import type { LucideIcon } from "lucide-react";

export type UserRole = "ADMIN" | "OPERATOR" | "AUDITOR" | "VIEWER" | "CISO";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
  avatar: string;
};

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  roles: UserRole[];
};

export type NotificationSeverity = "CRITICAL" | "WARNING" | "INFO";

export type Notification = {
  id: string;
  severity: NotificationSeverity;
  message: string;
  timestamp: string;
  isRead: boolean;
};
