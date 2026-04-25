import type { User, NavItem, Notification, UserRole } from "./types";
import {
  Home,
  ClipboardList,
  BarChart,
  Search,
  Link,
  Wallet,
  Lock,
  LineChart,
  Settings,
  ShieldCheck,
  Building,
  HardHat,
  Eye,
  UserCheck,
} from "lucide-react";

export const users: User[] = [
  { id: "1", name: "한성우", email: "coo@metalfactory.co.kr", role: "ADMIN", company: "대한금속", avatar: "/avatars/01.png" },
  { id: "2", name: "김관리", email: "admin2@foodfactory.co.kr", role: "ADMIN", company: "한국식품", avatar: "/avatars/02.png" },
  { id: "3", name: "박작업", email: "op1@metalfactory.co.kr", role: "OPERATOR", company: "대한금속", avatar: "/avatars/03.png" },
  { id: "4", name: "이작업", email: "op2@foodfactory.co.kr", role: "OPERATOR", company: "한국식품", avatar: "/avatars/04.png" },
  { id: "5", name: "클레어 리", email: "auditor1@metalfactory.co.kr", role: "AUDITOR", company: "대한금속", avatar: "/avatars/05.png" },
  { id: "6", name: "차품질", email: "auditor2@foodfactory.co.kr", role: "AUDITOR", company: "한국식품", avatar: "/avatars/06.png" },
  { id: "7", name: "이뷰어", email: "viewer1@metalfactory.co.kr", role: "VIEWER", company: "대한금속", avatar: "/avatars/07.png" },
  { id: "8", name: "정뷰어", email: "viewer2@foodfactory.co.kr", role: "VIEWER", company: "한국식품", avatar: "/avatars/08.png" },
  { id: "9", name: "최보안", email: "ciso1@metalfactory.co.kr", role: "CISO", company: "대한금속", avatar: "/avatars/09.png" },
  { id: "10", name: "강보안", email: "ciso2@foodfactory.co.kr", role: "CISO", company: "한국식품", avatar: "/avatars/10.png" },
];

export const userRoles: { role: UserRole; name: string; icon: LucideIcon; color: string }[] = [
    { role: "ADMIN", name: "COO", icon: Building, color: "text-primary" },
    { role: "OPERATOR", name: "작업자", icon: HardHat, color: "text-blue-500" },
    { role: "AUDITOR", name: "품질이사", icon: UserCheck, color: "text-yellow-500" },
    { role: "VIEWER", name: "열람자", icon: Eye, color: "text-gray-500" },
    { role: "CISO", name: "CISO", icon: ShieldCheck, color: "text-destructive" },
];


export const navItems: NavItem[] = [
  { href: "/dashboard", label: "대시보드", icon: Home, roles: ["ADMIN", "OPERATOR", "AUDITOR", "VIEWER", "CISO"] },
  { href: "/log-entries", label: "데이터 로깅", icon: ClipboardList, roles: ["ADMIN", "OPERATOR", "AUDITOR"] },
  { href: "/audit-reports", label: "감사 리포트", icon: BarChart, roles: ["ADMIN", "AUDITOR"] },
  { href: "/dashboard/xai", label: "품질 이상탐지", icon: Search, roles: ["ADMIN", "AUDITOR"] },
  { href: "/dashboard/erp", label: "ERP 연동", icon: Link, roles: ["ADMIN"] },
  { href: "/roi-calculator", label: "ROI 계산기", icon: Wallet, roles: ["ADMIN", "OPERATOR", "AUDITOR", "VIEWER", "CISO"] },
  { href: "/dashboard/security", label: "보안 콘솔", icon: Lock, roles: ["CISO"] },
  { href: "/dashboard/performance", label: "성과 대시보드", icon: LineChart, roles: ["ADMIN", "AUDITOR"] },
];

export const adminNavItems: NavItem[] = [
  { href: "/admin/onboarding", label: "온보딩 관리", icon: Settings, roles: ["ADMIN"] },
  { href: "/admin/voucher", label: "바우처 관리", icon: Settings, roles: ["ADMIN"] },
];


export const kpiData = {
  logging: { value: 342, change: 12, unit: "건", trend: "up" },
  missingRate: { value: 3.8, change: -1.2, unit: "%", trend: "down", target: 5 },
  audit: { value: "8/2", change: null, unit: "건", trend: "neutral" },
  unapproved: { value: 3, change: 1, unit: "건", trend: "up", isBad: true },
};

export const notifications: Notification[] = [
    { id: "1", severity: "CRITICAL", message: "CNC-3 온도이상 감지. 즉시 확인 필요.", timestamp: "3분 전", isRead: false },
    { id: "2", severity: "WARNING", message: "프레스 라인 압력 경고. 기준치 15% 초과.", timestamp: "15분 전", isRead: false },
    { id: "3", severity: "INFO", message: "감사 리포트 '2026-Q2 삼성QA'가 생성되었습니다.", timestamp: "45분 전", isRead: false },
    { id: "4", severity: "INFO", message: "박작업 님이 12개 로그 항목을 승인했습니다.", timestamp: "1시간 전", isRead: true },
    { id: "5", severity: "WARNING", message: "ERP 동기화 실패. 스키마 불일치 발견.", timestamp: "3시간 전", isRead: true },
];

export const dailyMissingRateData = [
  { date: '4/13', rate: 4.5 },
  { date: '4/14', rate: 4.2 },
  { date: '4/15', rate: 5.1 },
  { date: '4/16', rate: 4.8 },
  { date: '4/17', rate: 3.9 },
  { date: '4/18', rate: 3.5 },
  { date: '4/19', rate: 3.8 },
];

export const lineStatusData = [
    { line: 'CNC 절삭', status: 'active', value: 95 },
    { line: '프레스', status: 'active', value: 92 },
    { line: '표면처리', status: 'maintenance', value: 100 },
];
