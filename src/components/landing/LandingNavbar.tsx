import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Sparkles, ArrowRight, Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { Button } from '@/components/ui/Button';

export const LandingNavbar: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-6 lg:px-12 h-20 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
            SynthSupport <span className="text-xs font-bold text-indigo-500 px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800">AI SaaS</span>
          </span>
          <p className="text-[10px] text-slate-400 font-mono hidden sm:block">AI Customer Support & Voice Agent Platform</p>
        </div>
      </Link>

      {/* Nav Navigation Links */}
      <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300">
        <a href="#demo" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AI Demo</a>
        <a href="#voice-demo" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Voice AI</a>
        <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
        <a href="#integrations" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Integrations</a>
        <a href="#pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Pricing</a>
        <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a>
      </nav>

      {/* Right CTAs */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        <Link to="/login">
          <Button variant="ghost" size="sm">Sign In</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
            Launch App
          </Button>
        </Link>
      </div>
    </header>
  );
};
