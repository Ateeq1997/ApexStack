export type ThemeMode = 'light' | 'dark';
export type AccentPreset = 'ocean' | 'emerald' | 'amber';

export type Role = 'admin' | 'editor' | 'viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
  joinedAt: string;
  company: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  location: string;
}

export interface KPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface RevenuePoint {
  month: string;
  revenue: number;
  users: number;
}

export interface HealthIndicator {
  name: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
}

export interface SubscriptionPlan {
  name: 'Basic' | 'Pro' | 'Enterprise';
  price: string;
  users: number;
  mrr: number;
  conversion: string;
}

export interface BillingEntry {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: 'paid' | 'pending' | 'failed';
}

export interface PostItem {
  id: string;
  title: string;
  author: string;
  status: 'draft' | 'published';
  updatedAt: string;
  content: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  time: string;
  read: boolean;
}

export interface ActivityLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
}

export interface CompanySettings {
  name: string;
  domain: string;
  timezone: string;
  supportEmail: string;
}

export interface SecuritySettings {
  ssoEnabled: boolean;
  mfaRequired: boolean;
  sessionTimeoutMins: number;
}

export interface ApiKeyItem {
  id: string;
  label: string;
  value: string;
  createdAt: string;
}
