import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types';
import { Shield, UserCheck, Users, Building, ShieldAlert } from 'lucide-react';
import { cn } from '@/utils/cn';

export const RoleSwitcher: React.FC = () => {
  const { activeRole, switchRole } = useAuth();

  const rolesList: { id: Role; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'customer', label: 'Customer', icon: <UserCheck className="w-3.5 h-3.5" />, color: 'text-blue-400' },
    { id: 'agent', label: 'Support Agent', icon: <Shield className="w-3.5 h-3.5" />, color: 'text-emerald-400' },
    { id: 'manager', label: 'Team Manager', icon: <Users className="w-3.5 h-3.5" />, color: 'text-amber-400' },
    { id: 'org_admin', label: 'Org Admin', icon: <Building className="w-3.5 h-3.5" />, color: 'text-purple-400' },
    { id: 'super_admin', label: 'Super Admin', icon: <ShieldAlert className="w-3.5 h-3.5" />, color: 'text-rose-400' },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-850 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 hidden lg:inline-block">
        Role Mode:
      </span>
      <div className="flex items-center gap-1">
        {rolesList.map((r) => {
          const isActive = activeRole === r.id;
          return (
            <button
              key={r.id}
              onClick={() => switchRole(r.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all',
                isActive
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm border border-slate-200 dark:border-slate-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              )}
              title={`Switch UI view to ${r.label}`}
            >
              <span className={r.color}>{r.icon}</span>
              <span className="hidden sm:inline-block">{r.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
