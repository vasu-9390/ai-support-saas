import React from 'react';
import { Card } from '@/components/ui/Card';
import { Bot, Mic, ShieldCheck, Zap, BarChart3, Database, Layers, RefreshCw } from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-indigo-500" />,
      title: 'Autonomous AI Chat Agents',
      desc: 'Deploy AI agents trained on your documentation that resolve customer inquiries 24/7 without manual supervision.',
    },
    {
      icon: <Mic className="w-6 h-6 text-emerald-500" />,
      title: 'Sub-200ms Voice AI',
      desc: 'Handle voice support calls with WebRTC/PSTN audio streaming, instant transcription, and natural speech synthesis.',
    },
    {
      icon: <Database className="w-6 h-6 text-blue-500" />,
      title: 'RAG Knowledge Base Sync',
      desc: 'Upload PDFs, DOCX, TXT files or sync documentation sites to index vector embeddings automatically.',
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Custom Agent Tool Calling',
      desc: 'Connect AI agents directly to REST endpoints to look up order status, process refunds, and update user profiles.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-purple-500" />,
      title: 'Smart Human Escalation',
      desc: 'Automatically hand off conversations to human agents whenever sentiment drops or intent requires staff authorization.',
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-rose-500" />,
      title: 'Enterprise Analytics & CSAT',
      desc: 'Track AI resolution rates, average response times, SLA deadlines, and satisfaction scores with real-time dashboards.',
    },
  ];

  return (
    <section id="features" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Everything You Need for Modern Support
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
          Built for scale, speed, and seamless collaboration between AI agents and human support teams.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <Card key={i} className="hover:border-indigo-500/50 hover:shadow-lg transition-all p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {f.icon}
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">{f.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};
