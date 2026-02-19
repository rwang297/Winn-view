/**
 * Client-side mock API for frontend-only development
 * Replaces all backend API calls with fake data
 */

// Mock database (in-memory storage)
const mockData = {
  accounts: [],
  ippisApplications: [],
  complaints: [],
  accountOpeningB: [],
  accountMandateC: [],
  referenceFormsD: [],
  adminAllowlist: [],
};

// Helper to generate unique IDs
function generateId() {
  return 'id-' + Math.random().toString(36).substr(2, 9);
}

// Helper to get current timestamp
function getCurrentTimestamp() {
  return new Date().toISOString();
}

const mockApi = {
  // ========== ACCOUNTS ==========
  createAccount: async (payload) => {
    const account = {
      accountId: generateId(),
      ...payload,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    mockData.accounts.push(account);
    return account;
  },

  getAccounts: async () => {
    return mockData.accounts;
  },

  // ========== IPPIS APPLICATIONS ==========
  createIppisApplication: async (payload) => {
    const application = {
      ippisId: generateId(),
      ...payload,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    mockData.ippisApplications.push(application);
    return application;
  },

  getIppisApplications: async (limit = 5, sortBy = 'created_at', sortDir = 'desc') => {
    let sorted = [...mockData.ippisApplications];
    
    if (sortBy === 'created_at') {
      sorted.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return sortDir === 'desc' ? dateB - dateA : dateA - dateB;
      });
    }
    
    return sorted.slice(0, limit);
  },

  // ========== ACCOUNT OPENING SECTION B ==========
  saveAccountOpeningB: async (payload) => {
    const section = {
      sectionBId: generateId(),
      ...payload,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    mockData.accountOpeningB.push(section);
    return section;
  },

  // ========== ACCOUNT MANDATE SECTION C ==========
  saveAccountMandateC: async (payload) => {
    const section = {
      sectionCId: generateId(),
      ...payload,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    mockData.accountMandateC.push(section);
    return section;
  },

  // ========== REFERENCE FORMS SECTION D ==========
  saveReferenceFormsD: async (payload) => {
    const section = {
      sectionDId: generateId(),
      ...payload,
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    mockData.referenceFormsD.push(section);
    return section;
  },

  // ========== COMPLAINTS ==========
  createComplaint: async (payload) => {
    const complaint = {
      complaintId: generateId(),
      ...payload,
      status: 'open',
      created_at: getCurrentTimestamp(),
      updated_at: getCurrentTimestamp(),
    };
    mockData.complaints.push(complaint);
    return complaint;
  },

  getComplaints: async () => {
    return mockData.complaints;
  },

  // ========== ADMIN ALLOWLIST ==========
  getAdminAllowlist: async (userId = null) => {
    if (userId) {
      // Check if user is admin
      const isAdmin = mockData.adminAllowlist.some((a) => a.userId === userId);
      return { isAdmin, userId };
    }
    return mockData.adminAllowlist;
  },

  addToAdminAllowlist: async (userId) => {
    const entry = {
      id: generateId(),
      userId,
      created_at: getCurrentTimestamp(),
    };
    mockData.adminAllowlist.push(entry);
    return entry;
  },

  removeFromAdminAllowlist: async (userId) => {
    mockData.adminAllowlist = mockData.adminAllowlist.filter((a) => a.userId !== userId);
    return { success: true };
  },

  // ========== ADMIN METRICS ==========
  getAdminMetrics: async () => {
    return {
      totalAccounts: mockData.accounts.length,
      totalIppisApplications: mockData.ippisApplications.length,
      totalComplaints: mockData.complaints.length,
      accountsThisMonth: mockData.accounts.filter((a) => {
        const createdDate = new Date(a.created_at);
        const now = new Date();
        return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
      }).length,
      complaintsResolved: mockData.complaints.filter((c) => c.status === 'resolved').length,
    };
  },

  // ========== ADMIN TRENDS ==========
  getAdminTrends: async () => {
    // Generate mock trend data for the past 7 days
    const trends = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      trends.push({
        date: dateStr,
        accountsCreated: Math.floor(Math.random() * 10),
        complaintsReceived: Math.floor(Math.random() * 5),
      });
    }
    return { trends };
  },

  // ========== FILE UPLOAD ==========
  uploadFile: async (payload) => {
    // Generate fake URL for uploaded file
    const fakeUrl = `https://example.com/uploads/${generateId()}/file`;
    return {
      url: fakeUrl,
      mimeType: payload.mimeType || 'application/octet-stream',
    };
  },

  presignUpload: async () => {
    return {
      secureSignature: 'fake-signature-' + generateId(),
      secureExpire: Math.floor(Date.now() / 1000) + 3600,
    };
  },

  // ========== UTILITY: Clear all mock data ==========
  clearAll: () => {
    mockData.accounts = [];
    mockData.ippisApplications = [];
    mockData.complaints = [];
    mockData.accountOpeningB = [];
    mockData.accountMandateC = [];
    mockData.referenceFormsD = [];
    mockData.adminAllowlist = [];
  },

  // ========== UTILITY: Get all mock data (for debugging) ==========
  getAllData: () => mockData,
};

export default mockApi;
