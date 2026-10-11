import React from 'react';
import { CustomerProfile } from '@/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatTimeAgo } from '@/utils/formatters';
import { Mail, Phone, Building, Tag, ShoppingBag, History, Heart, Shield, Sparkles, ExternalLink } from 'lucide-react';

interface CustomerDetailPanelProps {
  customer: CustomerProfile;
}

export const CustomerDetailPanel: React.FC<CustomerDetailPanelProps> = ({ customer }) => {
  const sentimentVariant = {
    very_positive: 'emerald',
    positive: 'success',
    neutral: 'neutral',
    frustrated: 'danger',
    negative: 'danger',
  }[customer.sentiment] as 'emerald' | 'success' | 'neutral' | 'danger';

  return (
    <aside className="w-80 border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto p-5 space-y-6 flex-shrink-0">
      {/* Customer Avatar & Header */}
      <div className="text-center space-y-3 pb-5 border-b border-slate-200 dark:border-slate-800">
        <img
          src={customer.avatarUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150'}
          alt={customer.name}
          className="w-16 h-16 rounded-2xl mx-auto object-cover ring-4 ring-indigo-500/20 shadow-md"
        />
        <div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">{customer.name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{customer.company}</p>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="purple" size="sm">
            {customer.plan.toUpperCase()} PLAN
          </Badge>
          <Badge variant={sentimentVariant} size="sm">
            <Heart className="w-3 h-3 mr-1" />
            {customer.sentiment.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {/* Customer Lifetime Value & Metrics */}
      <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-center">
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Lifetime Value</span>
          <span className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
            {formatCurrency(customer.lifetimeValue)}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Orders Count</span>
          <span className="text-base font-extrabold text-slate-900 dark:text-slate-100">
            {customer.ordersCount} Orders
          </span>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate">{customer.email}</span>
          </div>
          {customer.phone && (
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{customer.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <span>{customer.company}</span>
          </div>
        </div>
      </div>

      {/* Customer Tags */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5" /> Customer Tags
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {customer.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Orders History */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-1.5"><ShoppingBag className="w-3.5 h-3.5" /> Order History</span>
          <span className="text-[10px] text-indigo-500 font-mono">Synced</span>
        </h4>
        <div className="space-y-2">
          {customer.recentOrders.map((ord) => (
            <div
              key={ord.id}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{ord.id}</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">{formatCurrency(ord.amount)}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{ord.items.join(', ')}</p>
              <div className="flex items-center justify-between text-[10px] pt-1 text-slate-400">
                <span className="capitalize text-emerald-500 font-medium">Status: {ord.status}</span>
                <span>{formatTimeAgo(ord.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Copilot Action */}
      <Button variant="outline" size="sm" className="w-full" icon={<ExternalLink className="w-3.5 h-3.5" />}>
        View Full CRM Profile
      </Button>
    </aside>
  );
};
