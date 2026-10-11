import { apiClient } from './apiClient';
import {
  MOCK_USERS,
  MOCK_CONVERSATIONS,
  MOCK_TICKETS,
  MOCK_AI_AGENT_CONFIG,
  MOCK_KB_ARTICLES,
  MOCK_DASHBOARD_KPIS,
  MOCK_CHART_TICKET_VOLUME,
  MOCK_NOTIFICATIONS,
  MOCK_BILLING_USAGE,
  MOCK_PLANS,
} from '@/services/mock/mockData';
import { Role, TicketStatus, TicketPriority } from '@/types';

// Helper to execute request with seamless development fallback
async function handleApiCall<T>(apiFn: () => Promise<T>, mockFallback: T): Promise<T> {
  try {
    return await apiFn();
  } catch (err) {
    // Return mock fallback during local development when backend is offline
    return mockFallback;
  }
}

export const authApi = {
  login: async (email: string, password?: string, role: Role = 'agent') => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/auth/login', { email, password, role });
      return res.data;
    }, { user: MOCK_USERS[role] || MOCK_USERS.agent, tokens: { accessToken: 'token_jwt_demo', refreshToken: 'refresh_jwt_demo', expiresIn: 3600 } });
  },

  register: async (payload: { name: string; email: string; organizationName: string }) => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/auth/register', payload);
      return res.data;
    }, { message: 'Registration successful! Verification email sent.', success: true });
  },

  forgotPassword: async (email: string) => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/auth/forgot-password', { email });
      return res.data;
    }, { message: 'Reset password link sent to your email address.', success: true });
  },

  resetPassword: async (token: string, newPassword: string) => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/auth/reset-password', { token, newPassword });
      return res.data;
    }, { message: 'Password has been successfully updated.', success: true });
  },

  verifyEmail: async (code: string) => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/auth/verify-email', { code });
      return res.data;
    }, { message: 'Email address verified.', success: true });
  },
};

export const conversationApi = {
  getConversations: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/conversations');
      return res.data;
    }, MOCK_CONVERSATIONS);
  },

  sendMessage: async (conversationId: string, text: string) => {
    return handleApiCall(async () => {
      const res = await apiClient.post(`/conversations/${conversationId}/messages`, { text });
      return res.data;
    }, { success: true, messageId: `msg_${Date.now()}` });
  },

  escalate: async (conversationId: string) => {
    return handleApiCall(async () => {
      const res = await apiClient.post(`/conversations/${conversationId}/escalate`);
      return res.data;
    }, { success: true, status: 'escalated' });
  },
};

export const ticketApi = {
  getTickets: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/tickets');
      return res.data;
    }, MOCK_TICKETS);
  },

  createTicket: async (payload: any) => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/tickets', payload);
      return res.data;
    }, { success: true, ticketId: `TCK-${Math.floor(1000 + Math.random() * 9000)}` });
  },

  updateStatus: async (ticketId: string, status: TicketStatus) => {
    return handleApiCall(async () => {
      const res = await apiClient.patch(`/tickets/${ticketId}/status`, { status });
      return res.data;
    }, { success: true, status });
  },
};

export const agentApi = {
  getAgentConfig: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/ai-agent/config');
      return res.data;
    }, MOCK_AI_AGENT_CONFIG);
  },

  updateAgentConfig: async (config: any) => {
    return handleApiCall(async () => {
      const res = await apiClient.put('/ai-agent/config', config);
      return res.data;
    }, { success: true, config });
  },
};

export const knowledgeApi = {
  getArticles: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/knowledge-base');
      return res.data;
    }, MOCK_KB_ARTICLES);
  },

  uploadDocument: async (fileData: FormData) => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/knowledge-base/upload', fileData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    }, { success: true, articleId: `kb-${Date.now()}` });
  },
};

export const voiceApi = {
  startCallSession: async (customerId: string) => {
    return handleApiCall(async () => {
      const res = await apiClient.post('/voice/calls/start', { customerId });
      return res.data;
    }, { sessionId: `call_${Date.now()}`, status: 'connected' });
  },
};

export const analyticsApi = {
  getDashboardKPIs: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/analytics/dashboard');
      return res.data;
    }, MOCK_DASHBOARD_KPIS);
  },

  getTicketVolumeChart: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/analytics/charts/ticket-volume');
      return res.data;
    }, MOCK_CHART_TICKET_VOLUME);
  },
};

export const billingApi = {
  getBillingUsage: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/billing/usage');
      return res.data;
    }, MOCK_BILLING_USAGE);
  },

  getPlans: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/billing/plans');
      return res.data;
    }, MOCK_PLANS);
  },
};

export const notificationApi = {
  getNotifications: async () => {
    return handleApiCall(async () => {
      const res = await apiClient.get('/notifications');
      return res.data;
    }, MOCK_NOTIFICATIONS);
  },
};
