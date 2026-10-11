import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Bot, Mail, Lock, User, Building, ArrowRight, CheckCircle2 } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await login(email, 'org_admin');
    setIsLoading(false);
    navigate('/verify-email');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">SynthSupport AI</span>
          </Link>
          <h2 className="text-2xl font-bold">Start 14-day Enterprise Trial</h2>
          <p className="text-xs text-slate-400">Deploy AI Customer & Voice Support Agents in minutes</p>
        </div>

        <Card className="bg-slate-900/90 border-slate-800 p-6 shadow-2xl space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Elena Rostova"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="w-4 h-4" />}
              required
            />
            <Input
              label="Work Email"
              type="email"
              placeholder="elena@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
            />
            <Input
              label="Company Name"
              type="text"
              placeholder="Acme Enterprise"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              icon={<Building className="w-4 h-4" />}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              required
            />

            <Button type="submit" variant="primary" className="w-full" isLoading={isLoading} icon={<ArrowRight className="w-4 h-4" />}>
              Create Enterprise Account
            </Button>
          </form>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Includes 10,000 AI Conversations & 500 Voice Mins</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cancel anytime with 1-click</span>
          </div>
        </Card>

        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
