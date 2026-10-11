import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { KPICard } from '@/components/dashboard/KPICard';
import { MOCK_CHART_TICKET_VOLUME, MOCK_CHART_CSAT } from '@/services/mock/mockData';
import { BarChart3, TrendingUp, Sparkles, Mic, Calendar, Download } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [range, setRange] = useState('30d');

  const channelDistributionData = [
    { name: 'AI Chat Widget', value: 58, color: '#6366f1' },
    { name: 'Voice AI PSTN', value: 24, color: '#10b981' },
    { name: 'Email Helpdesk', value: 12, color: '#f59e0b' },
    { name: 'WhatsApp Bot', value: 6, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-500" /> Enterprise Analytics & Insights
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Detailed breakdown of AI resolution efficiency, channel volume, voice call minutes, and CSAT scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <button className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-200">
            <Download className="w-3.5 h-3.5" /> Export Report (CSV)
          </button>
        </div>
      </div>

      {/* Required Analytics Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Total Conversations" value="8,450" change="+14%" icon={<BarChart3 className="w-4 h-4 text-indigo-500" />} />
        <KPICard title="AI Resolution Rate" value="78.4%" change="+4.2%" icon={<Sparkles className="w-4 h-4 text-purple-500" />} />
        <KPICard title="Human Escalation Rate" value="8.2%" change="-1.5%" changeType="positive" icon={<TrendingUp className="w-4 h-4 text-emerald-500" />} />
        <KPICard title="AI Intent Accuracy" value="97.8%" change="+0.6%" icon={<Sparkles className="w-4 h-4 text-emerald-400" />} />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Line Chart: Response & Resolution Times */}
        <Card title="Average Resolution & Response Time (Minutes)" subtitle="SLA response trend over time">
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_CHART_CSAT}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }} />
                <Legend />
                <Line type="monotone" dataKey="responseTime" name="Avg Response (Min)" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart: Channel Distribution */}
        <Card title="Support Channel Breakdown (%)" subtitle="AI Chat vs Voice vs Helpdesk">
          <div className="h-72 w-full pt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', fontSize: '12px' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
