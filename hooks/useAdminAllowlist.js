// No backend integration - return empty data with no-op mutations
export function useAdminAllowlist(user, isAdmin) {
  return {
    allowlistData: { emails: [] },
    allowlistLoading: false,
    refetchAllowlist: () => {},
    addAdmin: {
      mutate: () => {},
      isPending: false,
    },
    removeAdmin: {
      mutate: () => {},
      isPending: false,
    },
  };
}
