import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Sparkles, Play, Calendar, ArrowRight, ShieldCheck, Zap, Bot, PhoneCall, CheckCircle2 } from 'lucide-react';

export const HeroSection: React.FC<{ onOpenDemoModal: () => void }> = ({ onOpenDemoModal }) => {
  return (
    <section className="relative pt-16 pb-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        {/* Top Product Announcement Tag */}
        <Badge variant="purple" size="md" className="py-1 px-3.5 shadow-sm border-purple-300 dark:border-purple-800">
          <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span>Introducing Voice & RAG Agent 2.0 Platform</span>
        </Badge>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          AI Customer Support <br />
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-400 bg-clip-text text-transparent">
            That Works 24/7
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Automate customer conversations, resolve tickets faster, and let AI agents handle repetitive support operations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link to="/register">
            <Button size="lg" variant="primary" icon={<ArrowRight className="w-5 h-5" />}>
              Start Free Trial
            </Button>
          </Link>
          <a href="#pricing">
            <Button size="lg" variant="outline" icon={<Calendar className="w-5 h-5 text-indigo-500" />}>
              Book Demo
            </Button>
          </a>
          <Button
            size="lg"
            variant="secondary"
            onClick={onOpenDemoModal}
            icon={<Play className="w-5 h-5 text-emerald-400 fill-emerald-400" />}
          >
            Watch AI Demo
          </Button>
        </div>

        {/* Enterprise Trust Indicators */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card Required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 14-Day Full Access Trial
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> SOC-2 & GDPR Compliant
          </span>
        </div>
      </div>
    </section>
  );
};
