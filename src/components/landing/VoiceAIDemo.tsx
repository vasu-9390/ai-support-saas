import React, { useState, useEffect } from 'react';
import { Mic, MicOff, PhoneOff, Volume2, Sparkles, Activity, Play } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const VoiceAIDemo: React.FC = () => {
  const [callActive, setCallActive] = useState(false);
  const [callState, setCallState] = useState<'IDLE' | 'LISTENING' | 'PROCESSING' | 'AI_SPEAKING'>('IDLE');
  const [transcript, setTranscript] = useState<Array<{ speaker: string; text: string }>>([
    { speaker: 'Customer', text: 'Hi, I need help changing my shipping address on file.' },
    { speaker: 'AI Agent', text: 'Hello! I can update your shipping address right now. What is your new address?' },
  ]);

  const toggleCall = () => {
    if (callActive) {
      setCallActive(false);
      setCallState('IDLE');
    } else {
      setCallActive(true);
      setCallState('LISTENING');
    }
  };

  useEffect(() => {
    if (!callActive) return;
    const interval = setInterval(() => {
      setCallState((prev) => {
        if (prev === 'LISTENING') return 'PROCESSING';
        if (prev === 'PROCESSING') return 'AI_SPEAKING';
        return 'LISTENING';
      });
    }, 2800);
    return () => clearInterval(interval);
  }, [callActive]);

  return (
    <section id="voice-demo" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl my-12 border border-slate-800 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Explanation Column */}
        <div className="space-y-6">
          <Badge variant="emerald" className="bg-emerald-950/80 text-emerald-400 border-emerald-800">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> Sub-200ms Web Audio Latency
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Human-Sounding <br />
            <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Voice AI Agents
            </span>
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Allow customers to speak naturally over WebRTC or PSTN phone calls. Our AI agent listens, processes intent in real-time, and responds with lifelike voice synthesis.
          </p>

          <div className="space-y-3 text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
              Full duplex real-time speech synthesis & interruption handling
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
              Automatic live transcript generation & sentiment tags
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">✓</span>
              Instant agent escalation during high urgency calls
            </div>
          </div>
        </div>

        {/* Right Voice Call Simulation Box */}
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
          {/* Visual Waveform Box */}
          <div className="flex flex-col items-center justify-center p-8 bg-slate-900/80 rounded-2xl border border-slate-800 relative">
            <div
              className={`w-28 h-28 rounded-full flex items-center justify-center transition-all ${
                callActive
                  ? callState === 'AI_SPEAKING'
                    ? 'bg-gradient-to-tr from-indigo-600 to-emerald-400 shadow-2xl shadow-indigo-500/40 animate-pulse'
                    : 'bg-emerald-600 shadow-xl shadow-emerald-500/30'
                  : 'bg-slate-800'
              }`}
            >
              <Mic className={`w-12 h-12 ${callActive ? 'text-white' : 'text-slate-500'}`} />
            </div>

            {/* Audio Bars Visualizer */}
            <div className="flex items-center gap-1.5 mt-6 h-10">
              {[0.4, 0.8, 0.3, 0.9, 0.6, 0.2, 0.7, 0.9, 0.5, 0.3].map((val, idx) => (
                <div
                  key={idx}
                  className="w-1.5 bg-indigo-500 rounded-full transition-all duration-150"
                  style={{
                    height: callActive ? `${Math.max(8, val * 36)}px` : '6px',
                    opacity: callActive ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            <span className="mt-3 text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              Status: <span className="text-emerald-400">{callActive ? callState : 'OFFLINE'}</span>
            </span>
          </div>

          {/* Call Transcript Snippet */}
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {transcript.map((t, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs flex gap-2">
                <span className="font-bold text-indigo-400 shrink-0">{t.speaker}:</span>
                <span className="text-slate-200">{t.text}</span>
              </div>
            ))}
          </div>

          {/* Call Action Button */}
          <div className="flex justify-center pt-2">
            <Button
              size="lg"
              variant={callActive ? 'danger' : 'success'}
              onClick={toggleCall}
              icon={callActive ? <PhoneOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            >
              {callActive ? 'End Live Voice Call' : 'Start Live Voice Demo'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
