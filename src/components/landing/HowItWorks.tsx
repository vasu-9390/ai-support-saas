import React from 'react';
import { UploadCloud, Sliders, MessageSquareCode, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Index Knowledge Base',
      desc: 'Upload product documents, FAQs, and API specs. Our vector engine splits and embeds chunks automatically.',
      icon: <UploadCloud className="w-6 h-6 text-indigo-500" />,
    },
    {
      step: '02',
      title: 'Configure Tools & Guardrails',
      desc: 'Define allowed tools (search order, refund, create ticket) and set sentiment escalation thresholds.',
      icon: <Sliders className="w-6 h-6 text-emerald-500" />,
    },
    {
      step: '03',
      title: 'Embed Chat & Voice Agent',
      desc: 'Connect your website widget, email inbox, or Twilio voice phone number with zero code friction.',
      icon: <MessageSquareCode className="w-6 h-6 text-purple-500" />,
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Up and Running in 3 Simple Steps
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
          From zero to autonomous AI customer resolution in under 15 minutes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 relative">
        {steps.map((s, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl relative shadow-sm hover:border-indigo-500/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {s.icon}
              </div>
              <span className="text-3xl font-black text-slate-300 dark:text-slate-700 font-mono">{s.step}</span>
            </div>
            <h3 className="font-bold text-xl text-slate-900 dark:text-slate-100">{s.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
