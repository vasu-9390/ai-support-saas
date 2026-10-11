import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/utils/cn';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  subtitle?: string;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon,
  subtitle,
}) => {
  return (
    <Card className="p-5 flex flex-col justify-between hover:border-indigo-500/50 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</span>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
          {icon}
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {value}
          </span>
          {change && (
            <span
              className={cn(
                'text-xs font-bold px-1.5 py-0.5 rounded-md',
                changeType === 'positive'
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  : changeType === 'negative'
                  ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              )}
            >
              {change}
            </span>
          )}
        </div>
        {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
      </div>
    </Card>
  );
};
