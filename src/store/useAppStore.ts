import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  activitySeed,
  apiKeysSeed,
  billingSeed,
  companySeed,
  notificationsSeed,
  postsSeed,
  securitySeed,
  subscriptionPlans,
  usersSeed
} from '@/data/seed';
import {
  AccentPreset,
  ActivityLog,
  ApiKeyItem,
  BillingEntry,
  CompanySettings,
  NotificationItem,
  PostItem,
  Role,
  SecuritySettings,
  SubscriptionPlan,
  ThemeMode,
  User
} from '@/types';

interface AppState {
  theme: ThemeMode;
  accentPreset: AccentPreset;
  isAuthenticated: boolean;
  currentUserRole: Role;
  users: User[];
  plans: SubscriptionPlan[];
  billing: BillingEntry[];
  posts: PostItem[];
  notifications: NotificationItem[];
  activity: ActivityLog[];
  company: CompanySettings;
  security: SecuritySettings;
  apiKeys: ApiKeyItem[];
  isLoading: boolean;
  hasError: boolean;
  toggleTheme: () => void;
  setAccentPreset: (preset: AccentPreset) => void;
  login: (role?: Role) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (hasError: boolean) => void;
  updateUserRole: (id: string, role: Role) => void;
  toggleUserStatus: (id: string) => void;
  bulkUpdateUserStatus: (ids: string[], status: User['status']) => void;
  addPost: (post: Omit<PostItem, 'id' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<PostItem>) => void;
  deletePost: (id: string) => void;
  updateCompany: (payload: CompanySettings) => void;
  updateSecurity: (payload: SecuritySettings) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'dark',
      accentPreset: 'ocean',
      isAuthenticated: false,
      currentUserRole: 'admin',
      users: usersSeed,
      plans: subscriptionPlans,
      billing: billingSeed,
      posts: postsSeed,
      notifications: notificationsSeed,
      activity: activitySeed,
      company: companySeed,
      security: securitySeed,
      apiKeys: apiKeysSeed,
      isLoading: false,
      hasError: false,
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
      setAccentPreset: (accentPreset) => set({ accentPreset }),
      login: (role = 'admin') => set({ isAuthenticated: true, currentUserRole: role }),
      logout: () => set({ isAuthenticated: false, currentUserRole: 'viewer' }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (hasError) => set({ hasError }),
      updateUserRole: (id, role) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, role } : user))
        })),
      toggleUserStatus: (id) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
          )
        })),
      bulkUpdateUserStatus: (ids, status) =>
        set((state) => ({
          users: state.users.map((user) => (ids.includes(user.id) ? { ...user, status } : user))
        })),
      addPost: (post) =>
        set((state) => ({
          posts: [
            {
              ...post,
              id: `p-${Math.floor(Math.random() * 9000) + 1000}`,
              updatedAt: new Date().toISOString().slice(0, 10)
            },
            ...state.posts
          ]
        })),
      updatePost: (id, payload) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, ...payload, updatedAt: new Date().toISOString().slice(0, 10) }
              : post
          )
        })),
      deletePost: (id) =>
        set((state) => ({
          posts: state.posts.filter((post) => post.id !== id)
        })),
      updateCompany: (company) => set({ company }),
      updateSecurity: (security) => set({ security }),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((item) => (item.id === id ? { ...item, read: true } : item))
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((item) => ({ ...item, read: true }))
        }))
    }),
    {
      name: 'saas-admin-state'
    }
  )
);
