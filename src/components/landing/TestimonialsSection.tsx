import React from 'react';
import { Card } from '@/components/ui/Card';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "SynthSupport's Voice AI agent handles 75% of our inbound phone inquiries without escalating. Our CSAT score jumped from 82% to 96% in 30 days.",
      author: 'Marcus Vance',
      role: 'VP of Customer Success, TechCorp',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      quote: "The RAG vector indexing is insanely fast. We uploaded 200+ PDF manuals and the AI agent answered complex technical questions with 98% accuracy on day one.",
      author: 'Elena Rostova',
      role: 'Head of Operations, Innovate Labs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    },
    {
      quote: "Having the AI Copilot suggest real-time replies for our human agents inside the inbox has reduced our average handle time from 14 minutes down to under 2 minutes.",
      author: 'David Chen',
      role: 'Support Manager, Nexus Media',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Loved by Support Teams Worldwide
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
          See how leading SaaS platforms automate customer support with SynthSupport AI.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <Card key={i} className="p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{t.author}</h4>
                <p className="text-xs text-slate-500">{t.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
