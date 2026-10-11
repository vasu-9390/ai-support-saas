import React from 'react';
import { useVoiceStore } from '@/store/useVoiceStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDuration } from '@/utils/formatters';
import {
  Mic,
  MicOff,
  PhoneOff,
  Volume2,
  VolumeX,
  Activity,
  PhoneCall,
  Sparkles,
  Heart,
  FileText,
  User,
  Bot,
  Play,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const VoiceAIPage: React.FC = () => {
  const {
    callState,
    isMuted,
    speakerVolume,
    durationSeconds,
    transcripts,
    customerSentiment,
    audioLevels,
    startCall,
    endCall,
    toggleMute,
    setSpeakerVolume,
    simulateVoiceStep,
  } = useVoiceStore();

  const isCallActive = callState !== 'IDLE' && callState !== 'ENDED';

  const getStateBadge = () => {
    if (callState === 'LISTENING') return <Badge variant="emerald" className="animate-pulse">LISTENING (CUSTOMER)</Badge>;
    if (callState === 'PROCESSING') return <Badge variant="purple" className="animate-pulse">PROCESSING NLP INTENT</Badge>;
    if (callState === 'AI_SPEAKING') return <Badge variant="info" className="animate-pulse">AI SPEAKING (ARIA)</Badge>;
    if (callState === 'ENDED') return <Badge variant="neutral">CALL ENDED</Badge>;
    return <Badge variant="neutral">IDLE (READY)</Badge>;
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Mic className="w-6 h-6 text-emerald-500" /> Web Audio Voice AI Studio
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time duplex WebRTC & PSTN speech synthesis with sub-200ms latency and transcript analysis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCallActive ? (
            <Button variant="danger" onClick={endCall} icon={<PhoneOff className="w-4 h-4" />}>
              End Voice Session
            </Button>
          ) : (
            <Button variant="success" onClick={() => startCall('Sarah Jenkins')} icon={<PhoneCall className="w-4 h-4" />}>
              Start Live Call Session
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Main Web Audio Visualizer & Call Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Visualizer Stage */}
          <Card className="p-8 text-center bg-slate-950 border-slate-800 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              {getStateBadge()}
              <span className="font-mono font-bold text-sm text-emerald-400 px-3 py-1 bg-slate-900 rounded-xl border border-slate-800">
                ⏱ {formatDuration(durationSeconds)}
              </span>
            </div>

            {/* Central Animated Microphone Orb (Requirement #9) */}
            <div className="py-8 flex flex-col items-center justify-center space-y-6">
              <div
                onClick={simulateVoiceStep}
                className={cn(
                  'w-36 h-36 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative',
                  isCallActive
                    ? callState === 'AI_SPEAKING'
                      ? 'bg-gradient-to-tr from-indigo-600 via-purple-600 to-emerald-400 shadow-2xl shadow-indigo-500/50 scale-110'
                      : 'bg-emerald-600 shadow-2xl shadow-emerald-500/40 animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700'
                )}
                title="Click orb to simulate voice conversation turn"
              >
                <Mic className={cn('w-16 h-16', isCallActive ? 'text-white' : 'text-slate-500')} />
              </div>

              {/* Web Audio Amplitude Waveforms Bar Visualizer (Requirement #9) */}
              <div className="flex items-center gap-1.5 h-12">
                {audioLevels.map((lvl, idx) => (
                  <div
                    key={idx}
                    className="w-2 bg-indigo-500 rounded-full transition-all duration-150"
                    style={{
                      height: isCallActive ? `${Math.max(8, lvl * 48)}px` : '8px',
                      opacity: isCallActive ? 1 : 0.2,
                    }}
                  />
                ))}
              </div>

              <p className="text-xs text-slate-400 font-mono">
                {isCallActive
                  ? 'Click orb above to simulate customer speech input & AI voice reply'
                  : 'Click "Start Live Call Session" or the microphone orb to begin'}
              </p>
            </div>

            {/* Bottom Call Controls (Requirement #9) */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6">
              <button
                onClick={toggleMute}
                className={cn(
                  'p-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all',
                  isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                )}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isMuted ? 'Muted' : 'Mute Mic'}</span>
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2.5 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={speakerVolume}
                  onChange={(e) => setSpeakerVolume(parseInt(e.target.value))}
                  className="w-24 accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-mono text-slate-400 w-8">{speakerVolume}%</span>
              </div>
            </div>
          </Card>

          {/* Real-Time Transcript Stream (Requirement #9) */}
          <Card title="Real-Time Call Transcript" subtitle="Live stream of Customer & Voice AI speech">
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {transcripts.map((t) => (
                <div
                  key={t.id}
                  className={cn(
                    'p-3.5 rounded-xl text-xs space-y-1',
                    t.speaker === 'Customer'
                      ? 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700'
                      : 'bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800'
                  )}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className={t.speaker === 'Customer' ? 'text-slate-900 dark:text-slate-100' : 'text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5'}>
                      {t.speaker === 'AI Agent' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                      {t.speaker}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{t.timestamp}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Real-Time Call Sentiment & AI Summary */}
        <div className="space-y-6">
          <Card title="Live Sentiment Analyzer" subtitle="Real-time speech tone detection">
            <div className="text-center p-4 space-y-3">
              <Badge variant={customerSentiment === 'frustrated' ? 'danger' : 'success'} size="md">
                <Heart className="w-3.5 h-3.5 mr-1" />
                Sentiment: {customerSentiment.toUpperCase()}
              </Badge>
              <p className="text-xs text-slate-500">
                AI voice sentiment threshold is active. Will auto-escalate if frustration exceeds 75%.
              </p>
            </div>
          </Card>

          <Card title="AI Call Summary Generator" subtitle="Automated call summary for CRM record">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <p>
                <strong>Summary:</strong> Customer inquired about order shipment location and delivery timeline. AI agent Aria verified carrier tracking status and confirmed arrival by 3:00 PM today.
              </p>
              <Badge variant="purple" size="sm">Ticket #TCK-8901 Linked</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
