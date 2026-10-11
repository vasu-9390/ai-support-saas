import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the AI Agent prevent hallucinations or wrong answers?',
      a: 'SynthSupport AI uses strict RAG (Retrieval-Augmented Generation) constraints. The AI agent only generates answers using verified context retrieved from your uploaded knowledge documents. If context is missing, it automatically escalates to a human agent.',
    },
    {
      q: 'Can the Voice AI Agent place outbound calls or only handle inbound?',
      a: 'Both! You can configure Voice AI agents for inbound customer support phone lines as well as outbound calls (e.g. appointment reminders, order updates, CSAT phone surveys).',
    },
    {
      q: 'How long does it take to connect our existing Zendesk or Shopify store?',
      a: 'Integrations take under 5 minutes. You can enter your API keys or authorize via OAuth in the settings panel to enable instant order lookups and ticket syncing.',
    },
    {
      q: 'Is my data used to train public LLM models?',
      a: 'No. All customer data, vector embeddings, and conversation transcripts are isolated inside your organization boundary and never used for public model training.',
    },
  ];

  return (
    <section id="faq" className="py-20 px-6 lg:px-12 max-w-4xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
          Have questions? We have answers.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full p-6 text-left font-bold text-base text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
