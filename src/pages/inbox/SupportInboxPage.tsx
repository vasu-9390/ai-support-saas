import React, { useState } from 'react';
import { useConversationStore } from '@/store/useConversationStore';
import { CustomerDetailPanel } from '@/components/chat/CustomerDetailPanel';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { formatTimeAgo, formatTime } from '@/utils/formatters';
import {
  Inbox,
  Search,
  UserCheck,
  Bot,
  Shield,
  Send,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Paperclip,
  Mic,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  PlusCircle,
  Clock,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { ConversationStatus, TicketPriority } from '@/types';
import { cn } from '@/utils/cn';

export const SupportInboxPage: React.FC = () => {
  const {
    conversations,
    selectedConversationId,
    activeFilter,
    searchQuery,
    messages,
    isAiTyping,
    selectConversation,
    setFilter,
    setSearchQuery,
    sendMessage,
    submitFeedback,
    escalateToHuman,
  } = useConversationStore();

  const [inputMessage, setInputMessage] = useState('');
  const [internalNoteMode, setInternalNoteMode] = useState(false);

  const selectedConv = conversations.find((c) => c.id === selectedConversationId) || conversations[0];
  const activeMessages = selectedConv ? messages[selectedConv.id] || [] : [];

  const handleSend = () => {
    if (!inputMessage.trim() || !selectedConv) return;
    sendMessage(selectedConv.id, inputMessage, 'human_agent');
    setInputMessage('');
  };

  const filteredConversations = conversations.filter((c) => {
    if (activeFilter === 'unassigned') return !c.assignedAgentId;
    if (activeFilter === 'assigned_to_me') return c.assignedAgentId === 'usr_agent_1';
    if (activeFilter === 'ai_handled') return c.aiHandled;
    if (activeFilter === 'human_handled') return !c.aiHandled;
    if (activeFilter === 'escalated') return c.status === 'escalated';
    if (activeFilter === 'resolved') return c.status === 'resolved';
    return true;
  }).filter((c) =>
    c.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterTabs: { id: ConversationStatus; label: string; count: number }[] = [
    { id: 'all', label: 'All Conversations', count: conversations.length },
    { id: 'unassigned', label: 'Unassigned', count: conversations.filter((c) => !c.assignedAgentId).length },
    { id: 'assigned_to_me', label: 'Assigned to Me', count: conversations.filter((c) => c.assignedAgentId === 'usr_agent_1').length },
    { id: 'ai_handled', label: 'AI Handled', count: conversations.filter((c) => c.aiHandled).length },
    { id: 'escalated', label: 'Escalated', count: conversations.filter((c) => c.status === 'escalated').length },
    { id: 'resolved', label: 'Resolved', count: conversations.filter((c) => c.status === 'resolved').length },
  ];

  return (
    <div className="h-[calc(100vh-7rem)] flex border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xl">
      {/* LEFT COLUMN: Conversation List & Filter Navigation */}
      <div className="w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-950/40 shrink-0">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-lg text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-indigo-500" /> Support Inbox
            </h2>
            <Badge variant="purple" size="sm">{filteredConversations.length} Active</Badge>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by customer or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Filter Tabs Horizontal List */}
        <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 flex gap-1 overflow-x-auto scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5',
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800'
              )}
            >
              <span>{tab.label}</span>
              <span className={cn('text-[10px] px-1.5 py-0.2 rounded-full font-bold', activeFilter === tab.id ? 'bg-indigo-800 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400')}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Conversation Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
          {filteredConversations.map((c) => {
            const isSelected = c.id === selectedConv?.id;
            return (
              <div
                key={c.id}
                onClick={() => selectConversation(c.id)}
                className={cn(
                  'p-4 transition-all cursor-pointer flex gap-3 relative',
                  isSelected
                    ? 'bg-white dark:bg-slate-800/80 border-l-4 border-indigo-600 shadow-sm'
                    : 'hover:bg-slate-100/60 dark:hover:bg-slate-800/30'
                )}
              >
                <img
                  src={c.customer.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
                  alt={c.customer.name}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{c.customer.name}</h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{formatTimeAgo(c.lastMessageTime)}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">{c.subject}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.lastMessageText}</p>
                  
                  <div className="flex items-center gap-1.5 pt-1">
                    {c.aiHandled ? (
                      <Badge variant="purple" size="sm" icon={<Bot className="w-3 h-3" />}>AI Handled</Badge>
                    ) : (
                      <Badge variant="info" size="sm" icon={<UserCheck className="w-3 h-3" />}>Agent</Badge>
                    )}
                    {c.priority === 'URGENT' && (
                      <Badge variant="danger" size="sm" icon={<AlertTriangle className="w-3 h-3" />}>URGENT</Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CENTER COLUMN: Live Chat & Conversation Stream */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-900">
        {selectedConv ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={selectedConv.customer.avatarUrl}
                  alt={selectedConv.customer.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                      {selectedConv.customer.name}
                    </h3>
                    <Badge variant={selectedConv.status === 'escalated' ? 'danger' : 'success'} size="sm">
                      {selectedConv.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 truncate">{selectedConv.subject}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => escalateToHuman(selectedConv.id)}
                  icon={<AlertTriangle className="w-3.5 h-3.5 text-amber-500" />}
                >
                  Escalate
                </Button>
                <Button
                  size="sm"
                  variant="success"
                  icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                >
                  Mark Resolved
                </Button>
              </div>
            </div>

            {/* Chat Stream Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40 dark:bg-slate-950/30">
              {activeMessages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isAi = msg.sender === 'ai_agent';
                return (
                  <div key={msg.id} className={cn('flex gap-3', isCustomer ? 'justify-end' : 'justify-start')}>
                    {!isCustomer && (
                      <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs text-white', isAi ? 'bg-indigo-600' : 'bg-slate-800')}>
                        {isAi ? <Bot className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                      </div>
                    )}

                    <div className="max-w-lg space-y-1.5">
                      <div className="flex items-center gap-2 px-1">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-400">{formatTime(msg.timestamp)}</span>
                      </div>

                      <div
                        className={cn(
                          'p-4 rounded-2xl text-sm leading-relaxed shadow-sm',
                          isCustomer
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : isAi
                            ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                            : 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-slate-900 dark:text-slate-100 rounded-tl-none'
                        )}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>

                        {/* Tool Executions log badge */}
                        {msg.toolExecutions && msg.toolExecutions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-1">
                            {msg.toolExecutions.map((t) => (
                              <div key={t.id} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 font-mono text-xs text-indigo-600 dark:text-indigo-400 flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                                  Tool `{t.toolName}`
                                </span>
                                <span className="text-emerald-500 font-bold text-[10px]">✓ {t.status}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Feedback buttons */}
                      {isAi && (
                        <div className="flex items-center gap-2 pt-1 px-1">
                          <span className="text-[10px] text-slate-400">AI Response Rating:</span>
                          <button
                            onClick={() => submitFeedback(msg.id, 'helpful')}
                            className={cn('p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-xs', msg.feedback === 'helpful' ? 'text-emerald-500 font-bold' : 'text-slate-400')}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => submitFeedback(msg.id, 'unhelpful')}
                            className={cn('p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 text-xs', msg.feedback === 'unhelpful' ? 'text-red-500 font-bold' : 'text-slate-400')}
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isAiTyping && (
                <div className="flex items-center gap-2 text-xs text-indigo-500 font-mono p-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Aria AI Agent is formulating response...
                </div>
              )}
            </div>

            {/* Reply Input Bar */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInternalNoteMode(false)}
                    className={cn('px-2.5 py-1 rounded-lg text-xs font-semibold', !internalNoteMode ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'text-slate-400')}
                  >
                    Reply to Customer
                  </button>
                  <button
                    onClick={() => setInternalNoteMode(true)}
                    className={cn('px-2.5 py-1 rounded-lg text-xs font-semibold', internalNoteMode ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400' : 'text-slate-400')}
                  >
                    🔒 Internal Note
                  </button>
                </div>
              </div>

              <div className="flex items-end gap-2">
                <textarea
                  rows={2}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder={internalNoteMode ? 'Write internal note visible only to support team...' : 'Type your message or AI Copilot suggestion...'}
                  className={cn(
                    'flex-1 p-3 text-sm rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none',
                    internalNoteMode ? 'border-amber-400 bg-amber-50/20' : 'border-slate-200 dark:border-slate-700'
                  )}
                />
                <Button variant="primary" onClick={handleSend} icon={<Send className="w-4 h-4" />}>
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
            Select a conversation to view chat stream
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Customer Details Panel */}
      {selectedConv && <CustomerDetailPanel customer={selectedConv.customer} />}
    </div>
  );
};
