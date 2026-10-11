import React, { useState } from 'react';
import { useTicketStore } from '@/store/useTicketStore';
import { Ticket, TicketStatus, TicketPriority } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { calculateSLARemaining, formatTimeAgo } from '@/utils/formatters';
import {
  Ticket as TicketIcon,
  Search,
  Filter,
  Plus,
  Sparkles,
  Clock,
  User,
  AlertTriangle,
  CheckCircle2,
  Brain,
  Kanban,
  Table as TableIcon,
  Send,
  Check,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const TicketManagementPage: React.FC = () => {
  const {
    tickets,
    selectedTicketId,
    statusFilter,
    priorityFilter,
    searchQuery,
    selectTicket,
    setStatusFilter,
    setPriorityFilter,
    setSearchQuery,
    updateTicketStatus,
    createTicket,
  } = useTicketStore();

  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newCategory, setNewCategory] = useState('Billing & Refunds');
  const [newPriority, setNewPriority] = useState<TicketPriority>('HIGH');

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.customer.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createTicket({
      subject: newSubject,
      category: newCategory,
      priority: newPriority,
    });
    setIsCreateOpen(false);
    setNewSubject('');
  };

  const getPriorityBadge = (p: TicketPriority) => {
    if (p === 'URGENT') return <Badge variant="danger">URGENT</Badge>;
    if (p === 'HIGH') return <Badge variant="warning">HIGH</Badge>;
    if (p === 'MEDIUM') return <Badge variant="info">MEDIUM</Badge>;
    return <Badge variant="neutral">LOW</Badge>;
  };

  const getStatusBadge = (s: TicketStatus) => {
    if (s === 'ESCALATED') return <Badge variant="danger">ESCALATED</Badge>;
    if (s === 'RESOLVED' || s === 'CLOSED') return <Badge variant="success">{s}</Badge>;
    if (s === 'IN_PROGRESS') return <Badge variant="purple">IN PROGRESS</Badge>;
    return <Badge variant="info">{s.replace('_', ' ')}</Badge>;
  };

  const kanbanStatuses: TicketStatus[] = ['NEW', 'OPEN', 'IN_PROGRESS', 'ESCALATED', 'RESOLVED'];

  return (
    <div className="space-y-6">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <TicketIcon className="w-6 h-6 text-indigo-500" /> Enterprise Ticket Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage SLA deadlines, AI confidence insights, and status workflows across all channels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Table vs Kanban Toggle */}
          <div className="flex items-center p-1 bg-slate-200 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('table')}
              className={cn('p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all', viewMode === 'table' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500')}
            >
              <TableIcon className="w-3.5 h-3.5" /> Table
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={cn('p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all', viewMode === 'kanban' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500')}
            >
              <Kanban className="w-3.5 h-3.5" /> Kanban
            </button>
          </div>

          <Button variant="primary" onClick={() => setIsCreateOpen(true)} icon={<Plus className="w-4 h-4" />}>
            Create Ticket
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Ticket ID, subject, customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ESCALATED">Escalated</option>
            <option value="RESOLVED">Resolved</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
          >
            <option value="ALL">All Priorities</option>
            <option value="URGENT">Urgent</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </Card>

      {/* Main View: Table vs Kanban */}
      {viewMode === 'table' ? (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Table Container */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-4 py-3">Ticket ID</th>
                      <th className="px-4 py-3">Customer / Subject</th>
                      <th className="px-4 py-3">Priority</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">SLA Deadline</th>
                      <th className="px-4 py-3 text-right">AI Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredTickets.map((t) => {
                      const sla = calculateSLARemaining(t.slaDeadline);
                      const isSelected = t.id === selectedTicket?.id;
                      return (
                        <tr
                          key={t.id}
                          onClick={() => selectTicket(t.id)}
                          className={cn(
                            'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer',
                            isSelected ? 'bg-indigo-50/50 dark:bg-indigo-950/30 font-medium' : ''
                          )}
                        >
                          <td className="px-4 py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{t.id}</td>
                          <td className="px-4 py-3">
                            <p className="font-bold text-slate-900 dark:text-slate-100">{t.subject}</p>
                            <p className="text-[11px] text-slate-400">{t.customer.name} ({t.customer.company})</p>
                          </td>
                          <td className="px-4 py-3">{getPriorityBadge(t.priority)}</td>
                          <td className="px-4 py-3">{getStatusBadge(t.status)}</td>
                          <td className="px-4 py-3">
                            <span className={cn('font-mono font-bold text-[11px]', sla.isUrgent ? 'text-red-500 animate-pulse' : 'text-slate-600 dark:text-slate-400')}>
                              ⏱ {sla.text}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className="font-bold text-emerald-500 font-mono">
                              {(t.aiSummaryDetails.aiConfidence * 100).toFixed(0)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* AI Ticket Details Inspector Panel (Requirement #12) */}
          <div>
            {selectedTicket && (
              <Card className="p-5 space-y-5 border-indigo-500/30 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white">AI Ticket Details</h3>
                  </div>
                  <Badge variant="purple">{(selectedTicket.aiSummaryDetails.aiConfidence * 100).toFixed(0)}% Confidence</Badge>
                </div>

                {/* AI Summary Box */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Executive Summary</span>
                  <p className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedTicket.aiSummaryDetails.summary}
                  </p>
                </div>

                {/* Customer Intent & Sentiment */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Customer Intent</span>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-1 block">
                      {selectedTicket.aiSummaryDetails.intent}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Sentiment</span>
                    <span className="text-xs font-bold text-amber-500 capitalize mt-1 block">
                      {selectedTicket.aiSummaryDetails.sentiment}
                    </span>
                  </div>
                </div>

                {/* Priority Reason */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Priority Reason</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    "{selectedTicket.aiSummaryDetails.priorityReason}"
                  </p>
                </div>

                {/* Suggested Response Generator */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>AI Suggested Response</span>
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  </span>
                  <div className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    {selectedTicket.aiSummaryDetails.suggestedResponse}
                  </div>
                </div>

                {/* Recommended Action */}
                <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-[11px] font-bold text-emerald-500 uppercase block">Recommended Next Action</span>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {selectedTicket.aiSummaryDetails.recommendedAction}
                  </p>
                </div>

                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => updateTicketStatus(selectedTicket.id, 'RESOLVED')}
                  icon={<Check className="w-4 h-4" />}
                >
                  Accept & Mark Ticket Resolved
                </Button>
              </Card>
            )}
          </div>
        </div>
      ) : (
        /* KANBAN BOARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {kanbanStatuses.map((status) => {
            const columnTickets = tickets.filter((t) => t.status === status);
            return (
              <div key={status} className="bg-slate-100 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 min-w-[220px]">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs uppercase text-slate-700 dark:text-slate-300">{status.replace('_', ' ')}</h4>
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {columnTickets.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {columnTickets.map((t) => (
                    <Card key={t.id} className="p-4 space-y-2 cursor-pointer hover:border-indigo-500 transition-all" onClick={() => selectTicket(t.id)}>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-indigo-500">{t.id}</span>
                        {getPriorityBadge(t.priority)}
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-2">{t.subject}</h5>
                      <p className="text-[11px] text-slate-400">{t.customer.name}</p>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Create Ticket */}
      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Log New Support Ticket">
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Ticket Subject"
            placeholder="e.g. Invoice discrepancy on Order #ORD-98231"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            required
          />
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
              <option value="Billing & Refunds">Billing & Refunds</option>
              <option value="Technical & API">Technical & API</option>
              <option value="Voice Infrastructure">Voice Infrastructure</option>
              <option value="Account Management">Account Management</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Priority</label>
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as any)}
              className="w-full p-2.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>
          <Button type="submit" variant="primary" className="w-full">
            Submit Ticket
          </Button>
        </form>
      </Modal>
    </div>
  );
};
