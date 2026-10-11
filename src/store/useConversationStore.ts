import { create } from 'zustand';
import { Conversation, ChatMessage, ConversationStatus, ToolExecutionEvent } from '@/types';
import { MOCK_CONVERSATIONS } from '@/services/mock/mockData';

interface ConversationState {
  conversations: Conversation[];
  selectedConversationId: string | null;
  activeFilter: ConversationStatus;
  searchQuery: string;
  messages: Record<string, ChatMessage[]>;
  isAiTyping: boolean;
  selectConversation: (id: string) => void;
  setFilter: (filter: ConversationStatus) => void;
  setSearchQuery: (query: string) => void;
  sendMessage: (conversationId: string, text: string, sender?: 'customer' | 'human_agent') => Promise<void>;
  submitFeedback: (messageId: string, feedback: 'helpful' | 'unhelpful') => void;
  escalateToHuman: (conversationId: string) => void;
}

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-101': [
    {
      id: 'm1',
      conversationId: 'conv-101',
      sender: 'customer',
      senderName: 'Sarah Jenkins',
      text: 'Hi, order #ORD-98231 was supposed to be delivered yesterday. The courier status has not updated and there is a charge discrepancy on my invoice.',
      timestamp: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
    },
    {
      id: 'm2',
      conversationId: 'conv-101',
      sender: 'ai_agent',
      senderName: 'Aria (AI Agent)',
      text: 'Hello Sarah! I am checking order #ORD-98231 for you right now.',
      timestamp: new Date(Date.now() - 39 * 60 * 1000).toISOString(),
      toolExecutions: [
        {
          id: 'tool_1',
          toolName: 'getOrderStatus',
          params: { orderId: 'ORD-98231' },
          status: 'completed',
          result: 'Location: Regional Hub. Scheduled delivery today at 3:00 PM.',
          timestamp: new Date(Date.now() - 39 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: 'm3',
      conversationId: 'conv-101',
      sender: 'customer',
      senderName: 'Sarah Jenkins',
      text: 'Can someone please confirm if a goodwill credit will be applied? This delayed our project launch.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    },
    {
      id: 'm4',
      conversationId: 'conv-101',
      sender: 'human_agent',
      senderName: 'Alex Rivera (Support Agent)',
      text: 'Hi Sarah, Alex here from Tier-2 support. I have verified your order with our carrier and applied a $100 goodwill credit directly to your account statement.',
      timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
      feedback: 'helpful',
    },
  ],
  'conv-102': [
    {
      id: 'm10',
      conversationId: 'conv-102',
      sender: 'customer',
      senderName: 'David Miller',
      text: 'How do I authenticate incoming webhooks from SynthSupport?',
      timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    },
    {
      id: 'm11',
      conversationId: 'conv-102',
      sender: 'ai_agent',
      senderName: 'Aria (AI Agent)',
      text: `Incoming webhooks are signed using HMAC SHA-256. 

Check the \`x-synth-signature\` header and verify:

\`\`\`javascript
const crypto = require('crypto');
const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
const digest = hmac.update(rawBody).digest('hex');
const isValid = crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
\`\`\`
`,
      timestamp: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
      toolExecutions: [
        {
          id: 'tool_kb',
          toolName: 'searchKB',
          params: { query: 'webhook hmac authentication' },
          status: 'completed',
          result: 'Matched article KB-102 with 98% confidence.',
          timestamp: new Date(Date.now() - 24 * 60 * 1000).toISOString(),
        },
      ],
      feedback: 'helpful',
    },
  ],
};

export const useConversationStore = create<ConversationState>((set, get) => ({
  conversations: MOCK_CONVERSATIONS,
  selectedConversationId: 'conv-101',
  activeFilter: 'all',
  searchQuery: '',
  messages: INITIAL_MESSAGES,
  isAiTyping: false,

  selectConversation: (id: string) => {
    set({ selectedConversationId: id });
    // Reset unread count
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, unreadCount: 0 } : c
      ),
    }));
  },

  setFilter: (filter: ConversationStatus) => set({ activeFilter: filter }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  sendMessage: async (conversationId: string, text: string, sender = 'human_agent') => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      sender,
      senderName: sender === 'human_agent' ? 'Alex Rivera (Support Agent)' : 'Customer',
      text,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: [...(state.messages[conversationId] || []), newMessage],
      },
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessageText: text,
              lastMessageTime: newMessage.timestamp,
              updatedAt: newMessage.timestamp,
            }
          : c
      ),
    }));

    // If customer sent message, simulate streaming AI response after 1.2s
    if (sender === 'customer') {
      set({ isAiTyping: true });
      setTimeout(() => {
        const toolExecution: ToolExecutionEvent = {
          id: `tool_${Date.now()}`,
          toolName: 'searchKB',
          params: { query: text.slice(0, 30) },
          status: 'completed',
          result: 'Retrieved context from AI Knowledge Base',
          timestamp: new Date().toISOString(),
        };

        const aiResponse: ChatMessage = {
          id: `msg_ai_${Date.now()}`,
          conversationId,
          sender: 'ai_agent',
          senderName: 'Aria (AI Agent)',
          text: `Thank you for your message! I have analyzed your request regarding "${text.slice(0, 40)}...". I am accessing our vector store and order engine to assist you right now.`,
          timestamp: new Date().toISOString(),
          toolExecutions: [toolExecution],
          isStreaming: false,
        };

        set((state) => ({
          isAiTyping: false,
          messages: {
            ...state.messages,
            [conversationId]: [...(state.messages[conversationId] || []), aiResponse],
          },
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessageText: aiResponse.text,
                  lastMessageTime: aiResponse.timestamp,
                }
              : c
          ),
        }));
      }, 1400);
    }
  },

  submitFeedback: (messageId: string, feedback: 'helpful' | 'unhelpful') => {
    set((state) => {
      const updatedMessages = { ...state.messages };
      for (const convId in updatedMessages) {
        updatedMessages[convId] = updatedMessages[convId].map((m) =>
          m.id === messageId ? { ...m, feedback } : m
        );
      }
      return { messages: updatedMessages };
    });
  },

  escalateToHuman: (conversationId: string) => {
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, status: 'escalated', priority: 'URGENT', aiHandled: false }
          : c
      ),
    }));
  },
}));
