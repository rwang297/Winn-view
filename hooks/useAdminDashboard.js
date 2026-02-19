// No backend integration - return empty data
export function useAdminDashboard(user, isAdmin) {
  return {
    metrics: null,
    trends: [],
    loading: false
  };
}
