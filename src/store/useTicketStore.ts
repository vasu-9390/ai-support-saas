import { create } from 'zustand';
import { Ticket, TicketStatus, TicketPriority } from '@/types';
import { MOCK_TICKETS } from '@/services/mock/mockData';

interface TicketState {
  tickets: Ticket[];
  selectedTicketId: string | null;
  statusFilter: TicketStatus | 'ALL';
  priorityFilter: TicketPriority | 'ALL';
  searchQuery: string;
  selectTicket: (id: string | null) => void;
  setStatusFilter: (status: TicketStatus | 'ALL') => void;
  setPriorityFilter: (priority: TicketPriority | 'ALL') => void;
  setSearchQuery: (query: string) => void;
  updateTicketStatus: (id: string, status: TicketStatus) => void;
  createTicket: (newTicket: Partial<Ticket>) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: MOCK_TICKETS,
  selectedTicketId: 'TCK-8901',
  statusFilter: 'ALL',
  priorityFilter: 'ALL',
  searchQuery: '',

  selectTicket: (id: string | null) => set({ selectedTicketId: id }),
  setStatusFilter: (status: TicketStatus | 'ALL') => set({ statusFilter: status }),
  setPriorityFilter: (priority: TicketPriority | 'ALL') => set({ priorityFilter: priority }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  updateTicketStatus: (id: string, status: TicketStatus) => {
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === id ? { ...t, status, updatedTime: new Date().toISOString() } : t
      ),
    }));
  },

  createTicket: (partial: Partial<Ticket>) => {
    const newTicket: Ticket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: partial.subject || 'New Support Inquiry',
      customer: partial.customer || MOCK_TICKETS[0].customer,
      category: partial.category || 'General Support',
      priority: partial.priority || 'MEDIUM',
      status: 'NEW',
      aiSummaryDetails: partial.aiSummaryDetails || {
        summary: 'Newly logged customer inquiry via ticket portal.',
        intent: 'General Inquiry',
        sentiment: 'neutral',
        priorityReason: 'Standard ticket priority assignment.',
        suggestedResponse: 'Hello! Thanks for reaching out. An agent or AI assistant is reviewing your ticket.',
        recommendedAction: 'Assign to available agent.',
        aiConfidence: 0.91,
      },
      createdTime: new Date().toISOString(),
      updatedTime: new Date().toISOString(),
      slaDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      channel: partial.channel || 'chat',
      messagesCount: 1,
    };

    set((state) => ({
      tickets: [newTicket, ...state.tickets],
      selectedTicketId: newTicket.id,
    }));
  },
}));
