import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Bot, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 text-center space-y-4">
      <div className="w-16 h-16 rounded-3xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-2xl font-mono border border-indigo-500/30">
        404
      </div>
      <h1 className="text-3xl font-extrabold">Page Not Found</h1>
      <p className="text-xs text-slate-400 max-w-sm">
        The requested URL or resource does not exist or has been moved to another endpoint.
      </p>
      <Link to="/dashboard">
        <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};
