let hasPrefetched = false;

const idleWindow = window as Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

function runOnIdle(task: () => void) {
  if (idleWindow.requestIdleCallback) {
    return idleWindow.requestIdleCallback(task, { timeout: 1200 });
  }

  return window.setTimeout(task, 300);
}

function clearIdle(handle: number) {
  if (idleWindow.cancelIdleCallback) {
    idleWindow.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
}

export function scheduleAppPrefetch(): () => void {
  if (hasPrefetched) {
    return () => undefined;
  }

  const handle = runOnIdle(() => {
    hasPrefetched = true;

    void import('@/components/charts/RevenueLineChart');
    void import('@/components/charts/UserGrowthBarChart');
    void import('@/components/charts/PlanRevenueBarChart');

    void import('@/pages/UsersPage');
    void import('@/pages/SubscriptionsPage');
    void import('@/pages/SettingsPage');
  });

  return () => clearIdle(handle);
}
