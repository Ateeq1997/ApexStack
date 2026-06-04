import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAppStore } from '@/store/useAppStore';
import { Role } from '@/types';

const LoginPage = lazy(() => import('@/pages/LoginPage').then((module) => ({ default: module.LoginPage })));
const DashboardPage = lazy(() => import('@/pages/DashboardPage').then((module) => ({ default: module.DashboardPage })));
const UsersPage = lazy(() => import('@/pages/UsersPage').then((module) => ({ default: module.UsersPage })));
const UserProfilePage = lazy(() => import('@/pages/UserProfilePage').then((module) => ({ default: module.UserProfilePage })));
const SubscriptionsPage = lazy(() => import('@/pages/SubscriptionsPage').then((module) => ({ default: module.SubscriptionsPage })));
const ContentPage = lazy(() => import('@/pages/ContentPage').then((module) => ({ default: module.ContentPage })));
const NotificationsPage = lazy(() => import('@/pages/NotificationsPage').then((module) => ({ default: module.NotificationsPage })));
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((module) => ({ default: module.SettingsPage })));
const UnauthorizedPage = lazy(() => import('@/pages/UnauthorizedPage').then((module) => ({ default: module.UnauthorizedPage })));

function RouteFallback() {
  return (
    <div className="space-y-3 p-4 md:p-6">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-[hsl(var(--accent-soft))]" />
      <div className="h-40 animate-pulse rounded-xl bg-[hsl(var(--accent-soft))]" />
      <div className="h-40 animate-pulse rounded-xl bg-[hsl(var(--accent-soft))]" />
    </div>
  );
}

function LazyPage({ children }: { children: JSX.Element }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

function ProtectedLayout() {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  return isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />;
}

function RoleGate({ children, allowedRoles }: { children: JSX.Element; allowedRoles: Role[] }) {
  const role = useAppStore((state) => state.currentUserRole);
  return allowedRoles.includes(role) ? children : <Navigate to="/unauthorized" replace />;
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LazyPage><LoginPage /></LazyPage>
  },
  {
    path: '/unauthorized',
    element: <LazyPage><UnauthorizedPage /></LazyPage>
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <LazyPage><DashboardPage /></LazyPage> },
      {
        path: 'users',
        element: <RoleGate allowedRoles={['admin', 'editor']}><LazyPage><UsersPage /></LazyPage></RoleGate>
      },
      {
        path: 'users/:userId',
        element: <RoleGate allowedRoles={['admin', 'editor']}><LazyPage><UserProfilePage /></LazyPage></RoleGate>
      },
      {
        path: 'subscriptions',
        element: <RoleGate allowedRoles={['admin', 'editor']}><LazyPage><SubscriptionsPage /></LazyPage></RoleGate>
      },
      {
        path: 'content',
        element: <RoleGate allowedRoles={['admin', 'editor']}><LazyPage><ContentPage /></LazyPage></RoleGate>
      },
      { path: 'notifications', element: <LazyPage><NotificationsPage /></LazyPage> },
      {
        path: 'settings',
        element: <RoleGate allowedRoles={['admin']}><LazyPage><SettingsPage /></LazyPage></RoleGate>
      },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />
  }
]);
