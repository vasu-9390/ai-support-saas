export type Role = 'customer' | 'agent' | 'manager' | 'org_admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  organizationId: string;
  organizationName: string;
  department?: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Conversation & Chat
export type ChannelType = 'chat' | 'email' | 'voice' | 'whatsapp';
export type ConversationStatus = 'all' | 'unassigned' | 'assigned_to_me' | 'ai_handled' | 'human_handled' | 'escalated' | 'waiting' | 'resolved';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  plan: 'free' | 'pro' | 'business' | 'enterprise';
  avatarUrl?: string;
  sentiment: 'very_positive' | 'positive' | 'neutral' | 'frustrated' | 'negative';
  lifetimeValue: number;
  tags: string[];
  ordersCount: number;
  recentOrders: {
    id: string;
    date: string;
    amount: number;
    status: 'delivered' | 'processing' | 'shipped' | 'cancelled' | 'refunded';
    items: string[];
  }[];
  previousTicketsCount: number;
}

export interface ToolExecutionEvent {
  id: string;
  toolName: string;
  params: Record<string, unknown>;
  status: 'pending' | 'completed' | 'failed';
  result?: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'customer' | 'ai_agent' | 'human_agent' | 'system';
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
  attachments?: {
    id: string;
    fileName: string;
    fileUrl: string;
    fileSize: string;
    fileType: string;
  }[];
  toolExecutions?: ToolExecutionEvent[];
  isStreaming?: boolean;
  feedback?: 'helpful' | 'unhelpful';
}

export interface Conversation {
  id: string;
  customerId: string;
  customer: CustomerProfile;
  subject: string;
  status: ConversationStatus;
  priority: TicketPriority;
  channel: ChannelType;
  assignedAgentId?: string;
  assignedAgentName?: string;
  aiHandled: boolean;
  unreadCount: number;
  lastMessageText: string;
  lastMessageTime: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

// Tickets
export type TicketStatus = 'NEW' | 'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_CUSTOMER' | 'ESCALATED' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface AISummaryDetails {
  summary: string;
  intent: string;
  sentiment: 'very_positive' | 'positive' | 'neutral' | 'frustrated' | 'negative';
  priorityReason: string;
  suggestedResponse: string;
  recommendedAction: string;
  aiConfidence: number; // e.g. 0.94 -> 94%
}

export interface Ticket {
  id: string;
  subject: string;
  customer: CustomerProfile;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedAgent?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  aiSummaryDetails: AISummaryDetails;
  createdTime: string;
  updatedTime: string;
  slaDeadline: string;
  channel: ChannelType;
  messagesCount: number;
}

// AI Agent Configuration
export interface AgentTool {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  category: 'customer' | 'orders' | 'refunds' | 'ticketing' | 'escalation';
}

export interface AIAgentConfig {
  id: string;
  name: string;
  avatarUrl: string;
  systemInstructions: string;
  tone: 'professional' | 'empathetic' | 'concise' | 'friendly' | 'technical';
  personalityDescription: string;
  supportedLanguages: string[];
  knowledgeSources: string[];
  allowedTools: AgentTool[];
  escalationRules: {
    sentimentThreshold: number; // e.g. frustrated level
    triggerKeywords: string[];
    maxFailedAttempts: number;
    requireHumanForRefundsAbove: number;
  };
  businessHours: {
    enabled: boolean;
    timezone: string;
    start: string;
    end: string;
  };
  maxConversationLength: number;
  isActive: boolean;
}

// Knowledge Base
export interface KBArticle {
  id: string;
  title: string;
  category: string;
  content: string;
  fileType: 'pdf' | 'docx' | 'txt' | 'markdown' | 'article';
  fileName?: string;
  fileSize?: string;
  docStatus: 'draft' | 'published' | 'archived';
  processingStatus: 'queued' | 'processing' | 'indexed' | 'failed';
  chunkCount: number;
  tokenCount: number;
  embeddingStatus: 'ready' | 'syncing' | 'error';
  lastUpdated: string;
  tags: string[];
}

// Voice AI
export type VoiceCallState = 'IDLE' | 'LISTENING' | 'PROCESSING' | 'AI_SPEAKING' | 'ENDED';

export interface VoiceTranscriptItem {
  id: string;
  speaker: 'Customer' | 'AI Agent';
  text: string;
  timestamp: string;
  sentiment?: 'positive' | 'neutral' | 'frustrated';
}

export interface VoiceCallSession {
  id: string;
  customerName: string;
  customerPhone: string;
  state: VoiceCallState;
  durationSeconds: number;
  transcripts: VoiceTranscriptItem[];
  sentiment: 'positive' | 'neutral' | 'frustrated';
  summary?: string;
  startedAt: string;
}

// Dashboard & Analytics
export interface DashboardKPIs {
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  avgResponseTimeMin: number;
  avgResolutionTimeHours: number;
  aiResolutionRatePct: number;
  csatScorePct: number;
  escalatedTickets: number;
  activeConversations: number;
  voiceCallsToday: number;
}

export interface ChartDataPoint {
  date: string;
  total?: number;
  resolved?: number;
  open?: number;
  aiHandled?: number;
  humanHandled?: number;
  csat?: number;
  responseTime?: number;
  volume?: number;
}

// Notifications
export type NotificationType = 'new_ticket' | 'assignment' | 'escalation' | 'sla_warning' | 'new_message' | 'ai_failure' | 'system_alert';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  linkUrl?: string;
  priority: 'low' | 'medium' | 'high';
}

// Billing
export type PlanTier = 'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE';

export interface PlanDetails {
  id: PlanTier;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  conversationsLimit: number;
  voiceMinutesLimit: number;
  ticketsLimit: number;
  kbDocumentsLimit: number;
  membersLimit: number;
  features: string[];
}

export interface BillingUsage {
  currentPlan: PlanTier;
  billingCycle: 'monthly' | 'annual';
  nextBillingDate: string;
  conversationsUsed: number;
  conversationsLimit: number;
  voiceMinutesUsed: number;
  voiceMinutesLimit: number;
  ticketsUsed: number;
  ticketsLimit: number;
  kbDocsUsed: number;
  kbDocsLimit: number;
  membersUsed: number;
  membersLimit: number;
}
