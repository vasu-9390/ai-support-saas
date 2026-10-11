import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { MOCK_BILLING_USAGE, MOCK_PLANS } from '@/services/mock/mockData';
import { CreditCard, CheckCircle2, Zap, Shield, Sparkles, AlertCircle } from 'lucide-react';

export const BillingPage: React.FC = () => {
  const [usage, setUsage] = useState(MOCK_BILLING_USAGE);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlanTier, setSelectedPlanTier] = useState(usage.currentPlan);
  const [cardProcessing, setCardProcessing] = useState(false);
  const [upgradeSuccess, setUpgradeSuccess] = useState(false);

  const calculatePct = (used: number, limit: number) => {
    return Math.min(100, Math.round((used / limit) * 100));
  };

  const handleUpgrade = async () => {
    setCardProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setUsage((prev) => ({ ...prev, currentPlan: selectedPlanTier as any }));
    setCardProcessing(false);
    setUpgradeSuccess(true);
    setTimeout(() => {
      setUpgradeSuccess(false);
      setIsUpgradeModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-indigo-500" /> Billing & Usage Operations
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your enterprise subscription tier, AI conversation quotas, and voice minutes usage.
          </p>
        </div>

        <Button variant="primary" onClick={() => setIsUpgradeModalOpen(true)} icon={<Sparkles className="w-4 h-4 text-amber-300" />}>
          Upgrade Plan
        </Button>
      </div>

      {/* Current Active Plan Overview Card */}
      <Card className="p-6 bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border-indigo-500/40 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <Badge variant="purple" className="bg-indigo-600 text-white font-bold py-1 px-3">
              CURRENT PLAN: {usage.currentPlan} TIER
            </Badge>
            <h2 className="text-2xl font-extrabold pt-2">
              ${usage.currentPlan === 'PRO' ? '99' : usage.currentPlan === 'BUSINESS' ? '299' : '899'}/month
            </h2>
            <p className="text-xs text-slate-400">
              Next billing cycle renews on <strong className="text-slate-200">November 1, 2026</strong>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700">
              Update Payment Method
            </Button>
            <Button variant="primary" onClick={() => setIsUpgradeModalOpen(true)}>
              Change Subscription
            </Button>
          </div>
        </div>
      </Card>

      {/* Usage Progress Meters Grid (Requirement #17) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Monthly AI Conversations Meter */}
        <Card title="Monthly AI Conversations" subtitle={`${usage.conversationsUsed.toLocaleString()} / ${usage.conversationsLimit.toLocaleString()} used`}>
          <div className="space-y-3 pt-2">
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{ width: `${calculatePct(usage.conversationsUsed, usage.conversationsLimit)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{calculatePct(usage.conversationsUsed, usage.conversationsLimit)}% Quota Used</span>
              <span className="text-indigo-500 font-mono">{(usage.conversationsLimit - usage.conversationsUsed).toLocaleString()} Remaining</span>
            </div>
          </div>
        </Card>

        {/* Voice AI Minutes Meter */}
        <Card title="Voice AI Minutes" subtitle={`${usage.voiceMinutesUsed} / ${usage.voiceMinutesLimit} mins used`}>
          <div className="space-y-3 pt-2">
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${calculatePct(usage.voiceMinutesUsed, usage.voiceMinutesLimit)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{calculatePct(usage.voiceMinutesUsed, usage.voiceMinutesLimit)}% Quota Used</span>
              <span className="text-emerald-500 font-mono">{usage.voiceMinutesLimit - usage.voiceMinutesUsed} Mins Remaining</span>
            </div>
          </div>
        </Card>

        {/* Active Support Tickets Meter */}
        <Card title="Support Tickets Ingestion" subtitle={`${usage.ticketsUsed.toLocaleString()} / ${usage.ticketsLimit.toLocaleString()} tickets`}>
          <div className="space-y-3 pt-2">
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{ width: `${calculatePct(usage.ticketsUsed, usage.ticketsLimit)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{calculatePct(usage.ticketsUsed, usage.ticketsLimit)}% Quota Used</span>
              <span className="text-purple-500 font-mono">{(usage.ticketsLimit - usage.ticketsUsed).toLocaleString()} Remaining</span>
            </div>
          </div>
        </Card>

        {/* Indexed KB Documents Meter */}
        <Card title="RAG Knowledge Documents" subtitle={`${usage.kbDocsUsed} / ${usage.kbDocsLimit} documents`}>
          <div className="space-y-3 pt-2">
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all"
                style={{ width: `${calculatePct(usage.kbDocsUsed, usage.kbDocsLimit)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{calculatePct(usage.kbDocsUsed, usage.kbDocsLimit)}% Quota Used</span>
              <span className="text-amber-500 font-mono">{usage.kbDocsLimit - usage.kbDocsUsed} Docs Slots Left</span>
            </div>
          </div>
        </Card>

        {/* Team Members Seats Meter */}
        <Card title="Team Members Seats" subtitle={`${usage.membersUsed} / ${usage.membersLimit} seats occupied`}>
          <div className="space-y-3 pt-2">
            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${calculatePct(usage.membersUsed, usage.membersLimit)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{calculatePct(usage.membersUsed, usage.membersLimit)}% Seats Used</span>
              <span className="text-blue-500 font-mono">{usage.membersLimit - usage.membersUsed} Open Seats</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal: Upgrade Subscription */}
      <Modal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} title="Upgrade SaaS Plan Tier">
        <div className="space-y-4">
          <p className="text-xs text-slate-400">Select your desired subscription plan tier below:</p>

          <div className="space-y-2">
            {MOCK_PLANS.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanTier(plan.id)}
                className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                  selectedPlanTier === plan.id
                    ? 'bg-indigo-600/15 border-indigo-500 text-slate-100 font-bold'
                    : 'bg-slate-800/40 border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm">{plan.name} (${plan.monthlyPrice}/mo)</h4>
                  <p className="text-[11px] text-slate-400">Includes {plan.conversationsLimit.toLocaleString()} AI conversations</p>
                </div>
                <input
                  type="radio"
                  name="plan"
                  checked={selectedPlanTier === plan.id}
                  onChange={() => setSelectedPlanTier(plan.id)}
                  className="w-4 h-4 text-indigo-600"
                />
              </div>
            ))}
          </div>

          <Button
            variant="primary"
            className="w-full"
            isLoading={cardProcessing}
            onClick={handleUpgrade}
          >
            {upgradeSuccess ? 'Subscription Plan Upgraded ✓' : `Confirm Upgrade to ${selectedPlanTier}`}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
