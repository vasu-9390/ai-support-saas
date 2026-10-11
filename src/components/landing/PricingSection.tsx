import React, { useState } from 'react';
import { MOCK_PLANS } from '@/services/mock/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Transparent, Predictable Pricing
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
          Start for free, then upgrade as your customer support operations scale.
        </p>

        {/* Annual / Monthly Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
              !isAnnual ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 shadow-sm' : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 ${
              isAnnual ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500'
            }`}
          >
            Annual Billing
            <span className="px-1.5 py-0.5 text-[10px] bg-emerald-400 text-slate-950 font-bold rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PLANS.map((plan) => {
          const isRecommended = plan.id === 'BUSINESS';
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 flex flex-col justify-between transition-all relative ${
                isRecommended
                  ? 'bg-gradient-to-b from-indigo-900/40 to-slate-900 border-2 border-indigo-500 shadow-2xl scale-105 z-10'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {isRecommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="purple" className="bg-indigo-600 text-white font-bold py-1 px-3 shadow-md border-0">
                    <Sparkles className="w-3 h-3 mr-1" /> Most Popular
                  </Badge>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {plan.id === 'FREE'
                      ? 'For small projects & evaluation'
                      : plan.id === 'PRO'
                      ? 'For growing startups'
                      : plan.id === 'BUSINESS'
                      ? 'For scaling support teams'
                      : 'Dedicated infrastructure'}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">${price}</span>
                  <span className="text-xs text-slate-500 font-medium">/month</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link to="/register">
                  <Button
                    variant={isRecommended ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    {plan.id === 'ENTERPRISE' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
