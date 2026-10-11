import React, { useState } from 'react';
import { useTicketStore } from '@/store/useTicketStore';
import { useConversationStore } from '@/store/useConversationStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { KPICard } from '@/components/dashboard/KPICard';
import {
  Sparkles,
  Ticket,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Smile,
  BookOpen,
  Send,
  Edit3,
  Check,
  User,
  History,
  Zap,
} from 'lucide-react';

export const AgentWorkspacePage: React.FC = () => {
  const { tickets } = useTicketStore();
  const { conversations, sendMessage } = useConversationStore();
  const [copilotResponse, setCopilotResponse] = useState(
    'Hi Sarah! I have reviewed your shipment tracking for Order #ORD-98231 and verified that it is currently out for priority delivery today by 3:00 PM. I have also issued a $100 goodwill credit to your statement.'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  const activeTicket = tickets[0];

  const handleAcceptAndSend = () => {
    sendMessage('conv-101', copilotResponse, 'human_agent');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" /> Support Agent Workspace & AI Copilot
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time assistant suggesting answers, knowledge articles, order lookup, and 1-click execution.
          </p>
        </div>

        <Badge variant="emerald" size="md">
          <Zap className="w-3.5 h-3.5 mr-1" /> Copilot Active (98% match)
        </Badge>
      </div>

      {/* KPI Cards for Support Agent */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Assigned Tickets" value="14" change="+2 today" icon={<Ticket className="w-4 h-4 text-indigo-500" />} />
        <KPICard title="SLA Warnings" value="2" change="Action needed" changeType="negative" icon={<AlertTriangle className="w-4 h-4 text-rose-500" />} />
        <KPICard title="My CSAT Score" value="98.4%" change="+1.2%" icon={<Smile className="w-4 h-4 text-emerald-500" />} />
        <KPICard title="Avg Response Time" value="1.1m" change="-20s" icon={<Clock className="w-4 h-4 text-blue-500" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Active Workspace & Active Ticket View */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Active Ticket Workspace" subtitle={`Working on ${activeTicket.id} - ${activeTicket.subject}`}>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{activeTicket.customer.name}</h4>
                  <p className="text-xs text-slate-400">{activeTicket.customer.email} • {activeTicket.customer.company}</p>
                </div>
                <Badge variant="purple">{activeTicket.customer.plan.toUpperCase()}</Badge>
              </div>

              {/* Customer message snippet */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                <span className="font-bold text-indigo-500">Customer Message:</span>
                <p>"Order #ORD-98231 has been delayed and I need an invoice copy and status confirmation immediately."</p>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: AI COPILOT DRAWER (Requirement #13) */}
        <div className="space-y-6">
          <Card
            title={
              <span className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <Sparkles className="w-5 h-5 text-amber-400" /> AI Copilot Suggestions
              </span>
            }
            subtitle="Auto-generated responses based on RAG knowledge"
          >
            <div className="space-y-4">
              {/* Suggested Response Box */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Response</span>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={copilotResponse}
                    onChange={(e) => setCopilotResponse(e.target.value)}
                    className="w-full p-3 text-xs bg-slate-950 border border-slate-700 rounded-xl text-white font-sans"
                  />
                ) : (
                  <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                    {copilotResponse}
                  </div>
                )}

                {/* Copilot Action Buttons (Requirement #13) */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                    icon={<Edit3 className="w-3.5 h-3.5" />}
                  >
                    {isEditing ? 'Done Editing' : 'Edit Suggestion'}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleAcceptAndSend}
                    icon={<Send className="w-3.5 h-3.5" />}
                  >
                    {sentNotice ? 'Sent! ✓' : 'Accept & Send'}
                  </Button>
                </div>
              </div>

              {/* Matched Knowledge Base Articles */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> KB Article Matches
                </span>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">KB-101: Enterprise Refund Policy</span>
                  <p className="text-[11px] text-slate-400">Match score: 98%. Goodwill credits up to $150 permitted without escalation.</p>
                </div>
              </div>

              {/* Similar Resolved Tickets */}
              <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-emerald-400" /> Similar Tickets
                </span>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">#TCK-7820 (Resolved 3d ago)</span>
                  <p className="text-[11px] text-slate-400">Resolution: Issued goodwill credit and verified shipment location.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
