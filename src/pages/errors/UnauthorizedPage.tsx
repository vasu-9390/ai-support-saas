import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const UnauthorizedPage: React.FC = () => {
  const { activeRole } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center space-y-4">
      <ShieldAlert className="w-16 h-16 text-rose-500" />
      <h1 className="text-3xl font-extrabold">Access Denied (403)</h1>
      <p className="text-xs text-slate-400 max-w-md">
        Your current role (<strong className="text-white capitalize">{activeRole.replace('_', ' ')}</strong>) does not have authorization to view this enterprise route. Use the Role Switcher in the top bar to switch roles.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
