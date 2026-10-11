import React, { useState } from 'react';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  MOCK_DASHBOARD_KPIS,
  MOCK_CHART_TICKET_VOLUME,
  MOCK_CHART_CSAT,
} from '@/services/mock/mockData';
import {
  Ticket,
  CheckCircle2,
  Clock,
  Sparkles,
  Smile,
  AlertTriangle,
  MessageSquare,
  Mic,
  TrendingUp,
  Filter,
  RefreshCw,
  Zap,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [teamFilter, setTeamFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const agentPerformanceData = [
    { name: 'Alex Rivera', resolved: 142, csat: 98, avgTime: '1.2h' },
    { name: 'Aria (AI Agent)', resolved: 890, csat: 96, avgTime: '0.1h' },
    { name: 'Marcus Vance', resolved: 98, csat: 95, avgTime: '2.4h' },
    { name: 'Emily Watson', resolved: 112, csat: 97, avgTime: '1.8h' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Title & Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Executive Operations Dashboard
            <Badge variant="emerald">Live Real-Time</Badge>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Overview of ticket throughput, AI resolution rates, voice calls, and SLA performance metrics.
          </p>
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range Picker */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="24h">Today (24h)</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>

          {/* Team Selector */}
          <select
            value={teamFilter}
            onChange={(e) => setTeamFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium focus:outline-none"
          >
            <option value="all">All Teams</option>
            <option value="tier1">Tier-1 AI Support</option>
            <option value="tier2">Tier-2 Technical</option>
            <option value="billing">Billing Operations</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Grid - All 10 Required Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard
          title="Total Tickets"
          value={MOCK_DASHBOARD_KPIS.totalTickets.toLocaleString()}
          change="+12.4%"
          changeType="positive"
          icon={<Ticket className="w-4 h-4 text-indigo-500" />}
          subtitle="All channels combined"
        />
        <KPICard
          title="Open Tickets"
          value={MOCK_DASHBOARD_KPIS.openTickets}
          change="-4.1%"
          changeType="positive"
          icon={<Clock className="w-4 h-4 text-amber-500" />}
          subtitle="Pending agent action"
        />
        <KPICard
          title="Resolved Tickets"
          value={MOCK_DASHBOARD_KPIS.resolvedTickets.toLocaleString()}
          change="+18.2%"
          changeType="positive"
          icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          subtitle="Successfully closed"
        />
        <KPICard
          title="AI Resolution Rate"
          value={`${MOCK_DASHBOARD_KPIS.aiResolutionRatePct}%`}
          change="+5.8%"
          changeType="positive"
          icon={<Sparkles className="w-4 h-4 text-purple-500" />}
          subtitle="Autopilot closed without human"
        />
        <KPICard
          title="Customer Satisfaction"
          value={`${MOCK_DASHBOARD_KPIS.csatScorePct}%`}
          change="+1.2%"
          changeType="positive"
          icon={<Smile className="w-4 h-4 text-emerald-400" />}
          subtitle="Based on CSAT surveys"
        />
        <KPICard
          title="Avg Response Time"
          value={`${MOCK_DASHBOARD_KPIS.avgResponseTimeMin}m`}
          change="-32s"
          changeType="positive"
          icon={<Zap className="w-4 h-4 text-blue-500" />}
          subtitle="Time to initial response"
        />
        <KPICard
          title="Avg Resolution Time"
          value={`${MOCK_DASHBOARD_KPIS.avgResolutionTimeHours}h`}
          change="-15m"
          changeType="positive"
          icon={<TrendingUp className="w-4 h-4 text-teal-500" />}
          subtitle="First contact resolution"
        />
        <KPICard
          title="Escalated Tickets"
          value={MOCK_DASHBOARD_KPIS.escalatedTickets}
          change="-2"
          changeType="positive"
          icon={<AlertTriangle className="w-4 h-4 text-rose-500" />}
          subtitle="Human review required"
        />
        <KPICard
          title="Active Conversations"
          value={MOCK_DASHBOARD_KPIS.activeConversations}
          icon={<MessageSquare className="w-4 h-4 text-indigo-400" />}
          subtitle="Live streaming now"
        />
        <KPICard
          title="Voice Calls Today"
          value={MOCK_DASHBOARD_KPIS.voiceCallsToday}
          change="+14"
          changeType="positive"
          icon={<Mic className="w-4 h-4 text-emerald-500" />}
          subtitle="WebRTC PSTN sessions"
        />
      </div>

      {/* Interactive Charts Section using Recharts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Ticket Volume & Resolution Trends (AreaChart) */}
        <Card title="Ticket Volume & Resolution Trends" subtitle="Daily ticket ingestion vs resolved tickets">
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_TICKET_VOLUME}>
                <defs>
                  <linearGradient id="totalColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="resolvedColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend />
                <Area type="monotone" dataKey="total" name="Total Tickets" stroke="#6366f1" fillOpacity={1} fill="url(#totalColor)" />
                <Area type="monotone" dataKey="resolved" name="Resolved Tickets" stroke="#10b981" fillOpacity={1} fill="url(#resolvedColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* AI vs Human Resolution Distribution (BarChart) */}
        <Card title="AI vs Human Resolution Share" subtitle="Autopilot resolution volume comparison">
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_CHART_TICKET_VOLUME}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Legend />
                <Bar dataKey="aiHandled" name="AI Handled (Autopilot)" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="humanHandled" name="Human Agent Handled" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Second Row Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Customer Satisfaction CSAT Trend (LineChart) */}
        <Card title="Customer Satisfaction CSAT Trend (%)" subtitle="Weekly satisfaction rating tracking">
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_CSAT}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis domain={[90, 100]} stroke="#94a3b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="csat" name="CSAT Score (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Support Agent & AI Agent Performance Leaderboard */}
        <Card title="Agent & AI Performance Breakdown" subtitle="Resolved count and average CSAT score">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {agentPerformanceData.map((agent, i) => (
              <div key={i} className="py-3.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                    {agent.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{agent.name}</p>
                    <p className="text-[10px] text-slate-400">Avg Resolution: {agent.avgTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="font-extrabold text-slate-900 dark:text-white block">{agent.resolved}</span>
                    <span className="text-[10px] text-slate-400">Tickets</span>
                  </div>
                  <Badge variant="success">{agent.csat}% CSAT</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
