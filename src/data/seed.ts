import {
  ActivityLog,
  ApiKeyItem,
  BillingEntry,
  CompanySettings,
  HealthIndicator,
  KPI,
  NotificationItem,
  PostItem,
  RevenuePoint,
  SecuritySettings,
  SubscriptionPlan,
  User
} from '@/types';

export const kpis: KPI[] = [
  { label: 'Total Users', value: '48,293', change: '+12.4%', trend: 'up' },
  { label: 'Monthly Revenue', value: '$1.28M', change: '+8.1%', trend: 'up' },
  { label: 'Growth Rate', value: '23.8%', change: '+1.7%', trend: 'up' },
  { label: 'Churn Rate', value: '2.9%', change: '-0.5%', trend: 'up' }
];

export const revenueSeries: RevenuePoint[] = [
  { month: 'Jan', revenue: 780000, users: 24000 },
  { month: 'Feb', revenue: 840000, users: 26200 },
  { month: 'Mar', revenue: 910000, users: 29000 },
  { month: 'Apr', revenue: 980000, users: 31500 },
  { month: 'May', revenue: 1120000, users: 36000 },
  { month: 'Jun', revenue: 1280000, users: 42800 }
];

export const systemHealth: HealthIndicator[] = [
  { name: 'API Gateway', status: 'healthy', uptime: '99.99%' },
  { name: 'Auth Service', status: 'healthy', uptime: '99.95%' },
  { name: 'Payments', status: 'warning', uptime: '99.2%' },
  { name: 'Storage', status: 'healthy', uptime: '99.98%' }
];

export const usersSeed: User[] = [
  {
    id: 'u-1001',
    name: 'Aisha Morgan',
    email: 'aisha@northops.io',
    role: 'admin',
    status: 'active',
    joinedAt: '2025-02-18',
    company: 'NorthOps',
    plan: 'Enterprise',
    location: 'London, UK'
  },
  {
    id: 'u-1002',
    name: 'Rohan Patel',
    email: 'rohan@flowbridge.ai',
    role: 'editor',
    status: 'active',
    joinedAt: '2024-11-01',
    company: 'FlowBridge',
    plan: 'Pro',
    location: 'Bengaluru, IN'
  },
  {
    id: 'u-1003',
    name: 'Maya Chen',
    email: 'maya@atlaspeak.com',
    role: 'viewer',
    status: 'inactive',
    joinedAt: '2024-07-14',
    company: 'AtlasPeak',
    plan: 'Basic',
    location: 'Seattle, US'
  },
  {
    id: 'u-1004',
    name: 'Ethan Park',
    email: 'ethan@quanthive.dev',
    role: 'editor',
    status: 'active',
    joinedAt: '2025-04-03',
    company: 'QuantHive',
    plan: 'Pro',
    location: 'Toronto, CA'
  },
  {
    id: 'u-1005',
    name: 'Sara Alvarez',
    email: 'sara@bluelattice.io',
    role: 'viewer',
    status: 'active',
    joinedAt: '2025-01-20',
    company: 'BlueLattice',
    plan: 'Basic',
    location: 'Madrid, ES'
  },
  {
    id: 'u-1006',
    name: 'Noah Kim',
    email: 'noah@fieldmesh.com',
    role: 'admin',
    status: 'inactive',
    joinedAt: '2024-09-12',
    company: 'FieldMesh',
    plan: 'Enterprise',
    location: 'Seoul, KR'
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  { name: 'Basic', price: '$39/mo', users: 1240, mrr: 48360, conversion: '4.2%' },
  { name: 'Pro', price: '$129/mo', users: 860, mrr: 110940, conversion: '8.9%' },
  { name: 'Enterprise', price: '$699/mo', users: 148, mrr: 103452, conversion: '14.4%' }
];

export const billingSeed: BillingEntry[] = [
  { id: 'inv-8421', customer: 'NorthOps', amount: '$2,100', date: '2026-05-30', status: 'paid' },
  { id: 'inv-8422', customer: 'FlowBridge', amount: '$490', date: '2026-05-29', status: 'pending' },
  { id: 'inv-8423', customer: 'AtlasPeak', amount: '$120', date: '2026-05-27', status: 'failed' },
  { id: 'inv-8424', customer: 'BlueLattice', amount: '$120', date: '2026-05-25', status: 'paid' }
];

export const postsSeed: PostItem[] = [
  {
    id: 'p-201',
    title: 'Q3 Product Rollout Notes',
    author: 'Aisha Morgan',
    status: 'published',
    updatedAt: '2026-05-31',
    content: 'The rollout includes workflow automations, bulk user import, and billing alerts.'
  },
  {
    id: 'p-202',
    title: 'Security Posture Update',
    author: 'Noah Kim',
    status: 'draft',
    updatedAt: '2026-05-29',
    content: 'Upcoming SSO enforcement and audit trail enhancements are being reviewed.'
  },
  {
    id: 'p-203',
    title: 'Customer Success Playbook',
    author: 'Rohan Patel',
    status: 'published',
    updatedAt: '2026-05-21',
    content: 'The playbook defines response SLAs, escalation paths, and success metrics.'
  }
];

export const notificationsSeed: NotificationItem[] = [
  {
    id: 'n-301',
    title: 'Spike in API latency',
    message: 'EU cluster API p95 crossed 420ms threshold.',
    level: 'warning',
    time: '5 min ago',
    read: false
  },
  {
    id: 'n-302',
    title: 'Large invoice paid',
    message: 'NorthOps settled invoice inv-8421 successfully.',
    level: 'info',
    time: '40 min ago',
    read: true
  },
  {
    id: 'n-303',
    title: 'Failed payment retries',
    message: 'AtlasPeak card retries exhausted.',
    level: 'critical',
    time: '2 hr ago',
    read: false
  }
];

export const activitySeed: ActivityLog[] = [
  { id: 'a-1', actor: 'Aisha Morgan', action: 'updated', target: 'company settings', timestamp: '2026-06-04 10:14' },
  { id: 'a-2', actor: 'Rohan Patel', action: 'published', target: 'Q3 Product Rollout Notes', timestamp: '2026-06-04 09:42' },
  { id: 'a-3', actor: 'Noah Kim', action: 'disabled', target: 'user u-1003', timestamp: '2026-06-04 09:10' },
  { id: 'a-4', actor: 'System', action: 'generated', target: 'daily billing digest', timestamp: '2026-06-04 08:00' }
];

export const companySeed: CompanySettings = {
  name: 'ApexStack Software',
  domain: 'apexstack.io',
  timezone: 'UTC+0',
  supportEmail: 'support@apexstack.io'
};

export const securitySeed: SecuritySettings = {
  ssoEnabled: true,
  mfaRequired: true,
  sessionTimeoutMins: 45
};

export const apiKeysSeed: ApiKeyItem[] = [
  { id: 'k-1', label: 'Production Key', value: 'sk_live_a8f7...39zc', createdAt: '2026-02-10' },
  { id: 'k-2', label: 'Staging Key', value: 'sk_test_c1b2...71nm', createdAt: '2026-01-04' }
];
