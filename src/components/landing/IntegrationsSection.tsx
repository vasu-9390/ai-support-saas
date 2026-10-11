import React from 'react';
import { Card } from '@/components/ui/Card';
import { Share2, Zap, Layers, Globe, Shield, MessageCircle, Phone, Database } from 'lucide-react';

export const IntegrationsSection: React.FC = () => {
  const integrations = [
    { name: 'Zendesk', type: 'Help Desk Sync', icon: '🎫' },
    { name: 'Intercom', type: 'Live Chat Widget', icon: '💬' },
    { name: 'Slack', type: 'Staff Alert Channel', icon: '⚡' },
    { name: 'Shopify', type: 'Orders & Inventory', icon: '🛍️' },
    { name: 'Stripe', type: 'Billing & Refunds', icon: '💳' },
    { name: 'Twilio', type: 'Voice Call PSTN', icon: '📞' },
    { name: 'Salesforce', type: 'CRM Synchronization', icon: '☁️' },
    { name: 'WhatsApp', type: 'Messaging Channel', icon: '📱' },
  ];

  return (
    <section id="integrations" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Integrates With Your Tech Stack
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-3 text-base">
          Connect your existing CRM, helpdesk, ecommerce, and payment gateways with 1-click webhooks.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrations.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 transition-all flex items-center gap-4 shadow-sm"
          >
            <span className="text-3xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800">{item.icon}</span>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{item.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
