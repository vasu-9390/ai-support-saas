import React, { useState } from 'react';
import { useAgentStore } from '@/store/useAgentStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Bot,
  Sliders,
  Wrench,
  ShieldAlert,
  Save,
  Sparkles,
  CheckCircle2,
  Clock,
  Globe,
  Database,
  Terminal,
  RefreshCw,
} from 'lucide-react';

export const AgentControlPanelPage: React.FC = () => {
  const { config, updateConfig, toggleTool, saveAgentSettings } = useAgentStore();
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await saveAgentSettings();
    setIsSaving(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const tones: { id: string; label: string; desc: string }[] = [
    { id: 'professional', label: 'Professional', desc: 'Formal, precise, authoritative' },
    { id: 'empathetic', label: 'Empathetic', desc: 'Warm, understanding, patient' },
    { id: 'concise', label: 'Concise', desc: 'Direct, brief, action-oriented' },
    { id: 'friendly', label: 'Friendly', desc: 'Conversational and welcoming' },
    { id: 'technical', label: 'Technical', desc: 'Deep technical code and developer syntax' },
  ];

  const recentToolExecutions = [
    { id: 'e1', tool: 'getOrderStatus', order: 'ORD-98231', status: '✓ Completed', time: '2m ago' },
    { id: 'e2', tool: 'checkRefundPolicy', order: 'ORD-84720', status: '✓ Completed', time: '14m ago' },
    { id: 'e3', tool: 'searchCustomer', email: 'sarah.j@techcorp.io', status: '✓ Completed', time: '25m ago' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-500" /> AI Agent Control Panel
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure autonomous AI agent instructions, allowed tool calling APIs, tone, and escalation guardrails.
          </p>
        </div>

        <Button variant="primary" onClick={handleSave} isLoading={isSaving} icon={<Save className="w-4 h-4" />}>
          {savedSuccess ? 'Settings Saved ✓' : 'Save Agent Config'}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Main Configuration Forms */}
        <div className="lg:col-span-2 space-y-6">
          {/* Identity & Basic Profile */}
          <Card title="Agent Identity & Personality" subtitle="Define agent name, avatar, and tone of voice">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Agent Display Name"
                  value={config.name}
                  onChange={(e) => updateConfig({ name: e.target.value })}
                />
                <Input
                  label="Avatar Image URL"
                  value={config.avatarUrl}
                  onChange={(e) => updateConfig({ avatarUrl: e.target.value })}
                />
              </div>

              {/* Tone Selection Radio Cards */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Agent Tone of Voice:</label>
                <div className="grid sm:grid-cols-3 gap-2">
                  {tones.map((t) => {
                    const isSelected = config.tone === t.id;
                    return (
                      <div
                        key={t.id}
                        onClick={() => updateConfig({ tone: t.id as any })}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-indigo-600/15 border-indigo-500 text-indigo-300 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <p className="text-xs font-bold">{t.label}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{t.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Instructions Prompt Editor */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                  <span>System Instructions / Core Prompt</span>
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </label>
                <textarea
                  rows={5}
                  value={config.systemInstructions}
                  onChange={(e) => updateConfig({ systemInstructions: e.target.value })}
                  className="w-full p-3 text-xs font-mono bg-slate-950 text-emerald-400 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>
            </div>
          </Card>

          {/* Allowed Tools Grid (Requirement #7) */}
          <Card
            title="Allowed Agent Tools & API Capabilities"
            subtitle="Enable or disable execution tools the AI agent can call autonomously"
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {config.allowedTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                    tool.isEnabled
                      ? 'bg-indigo-950/40 border-indigo-500/50'
                      : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-slate-100">{tool.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{tool.description}</p>
                  </div>

                  <input
                    type="checkbox"
                    checked={tool.isEnabled}
                    onChange={() => toggleTool(tool.id)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 mt-1 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Escalation Rules & Limits */}
          <Card title="Guardrails & Escalation Rules" subtitle="Automated hand-off rules to human support staff">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Sentiment Drop Threshold</label>
                <input
                  type="number"
                  step="0.1"
                  value={config.escalationRules.sentimentThreshold}
                  onChange={(e) =>
                    updateConfig({
                      escalationRules: { ...config.escalationRules, sentimentThreshold: parseFloat(e.target.value) },
                    })
                  }
                  className="w-full p-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Require Human Approval For Refunds Over ($)</label>
                <input
                  type="number"
                  value={config.escalationRules.requireHumanForRefundsAbove}
                  onChange={(e) =>
                    updateConfig({
                      escalationRules: {
                        ...config.escalationRules,
                        requireHumanForRefundsAbove: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full p-2.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Real-Time Tool Execution Feed */}
        <div className="space-y-6">
          <Card title="Live Tool Execution Events" subtitle="Real-time log of agent tool calls">
            <div className="space-y-3">
              {recentToolExecutions.map((e) => (
                <div key={e.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-indigo-400 font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> `{e.tool}`
                    </span>
                    <span className="text-[10px] text-slate-500">{e.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Target: {e.order || e.email}</p>
                  <span className="text-emerald-400 font-bold text-[10px] block">{e.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Supported Languages" subtitle="Active multilingual NLP engines">
            <div className="flex flex-wrap gap-1.5">
              {config.supportedLanguages.map((lang, idx) => (
                <Badge key={idx} variant="purple" size="md">
                  <Globe className="w-3 h-3 mr-1" /> {lang}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
