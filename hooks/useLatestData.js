// No backend integration - return empty data
export function useLatestIppis(user, isAdmin) {
  return {
    data: { applications: [] },
    isLoading: false,
    isError: false,
    error: null,
  };
}

export function useLatestAccounts(user, isAdmin) {
  return {
    data: { accounts: [] },
    isLoading: false,
    isError: false,
    error: null,
  };
}

export function useLatestComplaints(user, isAdmin) {
  return {
    data: { complaints: [] },
    isLoading: false,
    isError: false,
    error: null,
  };
}
