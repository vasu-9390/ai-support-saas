import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Role } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Bot, Mail, Lock, Shield, ArrowRight, Globe } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('alex.rivera@synthsupport.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<Role>('agent');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, selectedRole);
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">SynthSupport AI</span>
          </Link>
          <h2 className="text-2xl font-bold">Sign in to your account</h2>
          <p className="text-xs text-slate-400">Access your role-based AI support workspace</p>
        </div>

        <Card className="bg-slate-900/90 border-slate-800 p-6 shadow-2xl space-y-5">
          {/* Quick Demo Role Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Select Demo Sign-In Role:</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              {(['customer', 'agent', 'manager', 'org_admin', 'super_admin'] as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setSelectedRole(r);
                    if (r === 'customer') setEmail('sarah.j@techcorp.io');
                    else if (r === 'agent') setEmail('alex.rivera@synthsupport.ai');
                    else if (r === 'manager') setEmail('marcus.vance@synthsupport.ai');
                    else if (r === 'org_admin') setEmail('elena.rostova@synthsupport.ai');
                    else if (r === 'super_admin') setEmail('david.chen@synthsupport-platform.com');
                  }}
                  className={`px-2 py-1.5 text-[11px] font-bold rounded-lg capitalize transition-all ${
                    selectedRole === r
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <Link to="/forgot-password" className="text-xs text-indigo-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="w-4 h-4" />}
                required
              />
            </div>

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} icon={<ArrowRight className="w-4 h-4" />}>
              Sign In as {selectedRole.replace('_', ' ').toUpperCase()}
            </Button>
          </form>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              Or OAuth SSO
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white" icon={<Globe className="w-4 h-4 text-rose-400" />}>
              Google SSO
            </Button>
            <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-white" icon={<Shield className="w-4 h-4 text-emerald-400" />}>
              SAML 2.0
            </Button>
          </div>
        </Card>

        <p className="text-center text-xs text-slate-400">
          Don't have an enterprise account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline font-semibold">
            Start 14-day Free Trial
          </Link>
        </p>
      </div>
    </div>
  );
};
