// No backend integration - return false for isAdmin
export function useAdminCheck(user) {
  return {
    isAdmin: false,
    meLoading: false
  };
}
