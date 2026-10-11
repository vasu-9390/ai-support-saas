import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard,
  Inbox,
  Ticket,
  Bot,
  BookOpen,
  Mic,
  BarChart3,
  CreditCard,
  Settings,
  Sparkles,
  UserCheck,
  Shield,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { activeRole, user, canAccessAnalytics, canManageBilling, canManageAgent } = useAuth();

  const navItems = [
    {
      label: 'Main Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      allowed: true,
    },
    {
      label: 'AI Support Inbox',
      path: '/inbox',
      icon: <Inbox className="w-5 h-5" />,
      allowed: true,
      badge: '3',
    },
    {
      label: 'Ticket Management',
      path: '/tickets',
      icon: <Ticket className="w-5 h-5" />,
      allowed: true,
    },
    {
      label: 'Agent Workspace & Copilot',
      path: '/workspace',
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      allowed: ['agent', 'manager', 'org_admin', 'super_admin'].includes(activeRole),
    },
    {
      label: 'AI Agent Control Panel',
      path: '/ai-agent',
      icon: <Bot className="w-5 h-5 text-indigo-400" />,
      allowed: canManageAgent,
    },
    {
      label: 'Knowledge Base (RAG)',
      path: '/knowledge-base',
      icon: <BookOpen className="w-5 h-5" />,
      allowed: true,
    },
    {
      label: 'Voice AI Studio',
      path: '/voice-ai',
      icon: <Mic className="w-5 h-5 text-emerald-400" />,
      allowed: true,
      badge: 'LIVE',
    },
    {
      label: 'Enterprise Analytics',
      path: '/analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      allowed: canAccessAnalytics,
    },
    {
      label: 'Billing & Usage',
      path: '/billing',
      icon: <CreditCard className="w-5 h-5" />,
      allowed: canManageBilling,
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: <Settings className="w-5 h-5" />,
      allowed: true,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 bottom-0 left-0 z-40 w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-300 lg:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Logo */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-white flex items-center gap-1">
                SynthSupport <span className="text-xs text-indigo-400 font-semibold px-1.5 py-0.5 rounded bg-indigo-950/80 border border-indigo-800/80">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 font-mono">Enterprise Voice & Chat</p>
            </div>
          </NavLink>
        </div>

        {/* Current Active Role Badge */}
        <div className="px-4 py-3 bg-slate-950/50 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-400 font-medium capitalize">
              Role: <strong className="text-slate-100">{activeRole.replace('_', ' ')}</strong>
            </span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
            {activeRole === 'customer' ? 'End User' : 'Staff'}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems
            .filter((item) => item.allowed)
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group',
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 group-hover:text-indigo-400 transition-colors">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      'px-1.5 py-0.5 text-[10px] font-bold rounded-md',
                      item.badge === 'LIVE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-indigo-500/20 text-indigo-300'
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
        </nav>

        {/* User Footer Profile Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={user?.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-700"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
};
