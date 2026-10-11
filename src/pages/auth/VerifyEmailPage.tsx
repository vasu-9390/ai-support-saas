import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Bot, MailCheck, CheckCircle2 } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerified(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold">Email Verification</h2>
          <p className="text-xs text-slate-400">Verify your work email address to start managing AI agents</p>
        </div>

        <Card className="bg-slate-900 border-slate-800 p-6 shadow-2xl text-center space-y-4">
          <MailCheck className="w-12 h-12 text-indigo-400 mx-auto" />
          <p className="text-xs text-slate-300">
            We sent a 6-digit confirmation code to your email. Click below to complete verification.
          </p>
          <Button variant="primary" className="w-full" onClick={handleVerify}>
            {verified ? 'Email Verified ✓' : 'Verify Email Address'}
          </Button>
        </Card>
      </div>
    </div>
  );
};
