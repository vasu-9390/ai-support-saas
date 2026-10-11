import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import {
  Settings as SettingsIcon,
  User,
  Building,
  Users,
  Shield,
  Bot,
  BookOpen,
  Share2,
  Mic,
  Bell,
  Lock,
  Key,
  Webhook,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const SettingsPage: React.FC = () => {
  const { user, activeRole } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'org', label: 'Organization', icon: <Building className="w-4 h-4" /> },
    { id: 'team', label: 'Team Members', icon: <Users className="w-4 h-4" /> },
    { id: 'roles', label: 'Roles & Permissions', icon: <Shield className="w-4 h-4" /> },
    { id: 'ai-agent', label: 'AI Agent Sync', icon: <Bot className="w-4 h-4" /> },
    { id: 'channels', label: 'Channels & Twilio', icon: <Share2 className="w-4 h-4" /> },
    { id: 'security', label: 'Security & SAML SSO', icon: <Lock className="w-4 h-4" /> },
    { id: 'api-keys', label: 'API Keys & Webhooks', icon: <Webhook className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-indigo-500" /> Platform Settings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Configure account profile, team roles, channel webhooks, and security configurations.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation Tabs (Requirement #16) */}
        <Card className="p-3 space-y-1 h-fit">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2.5',
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </Card>

        {/* Tab Content Box */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card title="User Profile Settings" subtitle="Update your personal account details">
              <div className="space-y-4 max-w-md">
                <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
                <Input label="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Button variant="primary" onClick={handleSave}>
                  {saved ? 'Changes Saved ✓' : 'Save Profile'}
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 'org' && (
            <Card title="Organization Details" subtitle="Manage enterprise organization workspace">
              <div className="space-y-4 max-w-md">
                <Input label="Organization Name" value="Acme Enterprise" readOnly />
                <Input label="Organization ID" value="org_acme_98231" readOnly />
                <Badge variant="purple">ENTERPRISE TIER WORKSPACE</Badge>
              </div>
            </Card>
          )}

          {activeTab === 'roles' && (
            <Card title="Role-Based Access Control (RBAC)" subtitle="Permission matrix for Customer, Agent, Manager, Org Admin, Super Admin">
              <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <span className="font-bold">Customer</span>
                  <span className="text-slate-400">Can view self tickets and chat with AI Agent</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="font-bold">Support Agent</span>
                  <span className="text-slate-400">Can reply to tickets, access AI Copilot, view customer CRM</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="font-bold">Team Manager</span>
                  <span className="text-slate-400">Can view analytics, manage AI Agent prompt, assign tickets</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="font-bold">Org Admin</span>
                  <span className="text-slate-400">Can manage billing, webhooks, API keys, and team seats</span>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <span className="font-bold text-rose-500">Super Admin</span>
                  <span className="text-slate-400">Full system override, cross-tenant telemetry & global infrastructure</span>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'api-keys' && (
            <Card title="API Keys & Webhooks Manager" subtitle="Manage secret endpoint tokens for integrations">
              <div className="space-y-4">
                <div className="p-3.5 rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800 flex items-center justify-between">
                  <span>pk_live_synth_support_9823147109284</span>
                  <Badge variant="emerald">ACTIVE</Badge>
                </div>
                <p className="text-xs text-slate-500">
                  ⚠️ Secrets are encrypted server-side and never exposed in client bundle code.
                </p>
                <Button variant="outline">Generate New API Key</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
