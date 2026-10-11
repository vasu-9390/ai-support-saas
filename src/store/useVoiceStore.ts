import { create } from 'zustand';
import { VoiceCallState, VoiceTranscriptItem } from '@/types';
import { MOCK_VOICE_SESSIONS } from '@/services/mock/mockData';

interface VoiceState {
  callState: VoiceCallState;
  isMuted: boolean;
  speakerVolume: number; // 0..100
  durationSeconds: number;
  transcripts: VoiceTranscriptItem[];
  customerSentiment: 'positive' | 'neutral' | 'frustrated';
  activeSessionId: string | null;
  audioLevels: number[]; // For visualizer wave bar animations [0..1]
  startCall: (customerName?: string) => void;
  endCall: () => void;
  toggleMute: () => void;
  setSpeakerVolume: (vol: number) => void;
  addTranscriptChunk: (item: VoiceTranscriptItem) => void;
  simulateVoiceStep: () => void;
}

let timerInterval: any = null;
let audioVisualizerInterval: any = null;

export const useVoiceStore = create<VoiceState>((set, get) => ({
  callState: 'IDLE',
  isMuted: false,
  speakerVolume: 85,
  durationSeconds: 0,
  transcripts: MOCK_VOICE_SESSIONS[0].transcripts,
  customerSentiment: 'neutral',
  activeSessionId: null,
  audioLevels: [0.1, 0.2, 0.1, 0.3, 0.2, 0.1, 0.4, 0.2],

  startCall: (customerName = 'Sarah Jenkins') => {
    if (timerInterval) clearInterval(timerInterval);
    if (audioVisualizerInterval) clearInterval(audioVisualizerInterval);

    set({
      callState: 'LISTENING',
      durationSeconds: 0,
      activeSessionId: `call_${Date.now()}`,
      customerSentiment: 'neutral',
      transcripts: [
        {
          id: `t_${Date.now()}`,
          speaker: 'AI Agent',
          text: `Hello ${customerName}! Thank you for calling SynthSupport Voice AI. How can I assist you today?`,
          timestamp: '0:02',
        },
      ],
    });

    // Start call timer
    timerInterval = setInterval(() => {
      set((state) => ({ durationSeconds: state.durationSeconds + 1 }));
    }, 1000);

    // Audio level visualizer simulator
    audioVisualizerInterval = setInterval(() => {
      const state = get().callState;
      if (state === 'LISTENING' || state === 'AI_SPEAKING') {
        const newLevels = Array.from({ length: 12 }, () =>
          Number((Math.random() * 0.85 + 0.15).toFixed(2))
        );
        set({ audioLevels: newLevels });
      } else {
        set({ audioLevels: [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1] });
      }
    }, 120);
  },

  endCall: () => {
    if (timerInterval) clearInterval(timerInterval);
    if (audioVisualizerInterval) clearInterval(audioVisualizerInterval);
    set({
      callState: 'ENDED',
      audioLevels: [0.05, 0.05, 0.05, 0.05],
    });
  },

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setSpeakerVolume: (vol: number) => set({ speakerVolume: vol }),

  addTranscriptChunk: (item: VoiceTranscriptItem) => {
    set((state) => ({
      transcripts: [...state.transcripts, item],
    }));
  },

  simulateVoiceStep: () => {
    const currentState = get().callState;
    if (currentState === 'IDLE' || currentState === 'ENDED') {
      get().startCall();
      return;
    }

    if (currentState === 'LISTENING') {
      set({ callState: 'PROCESSING' });
      const currentDuration = get().durationSeconds;
      get().addTranscriptChunk({
        id: `t_${Date.now()}`,
        speaker: 'Customer',
        text: 'I would like to check my order status for ORD-98231.',
        timestamp: `0:${currentDuration < 10 ? '0' : ''}${currentDuration}`,
        sentiment: 'neutral',
      });

      setTimeout(() => {
        set({ callState: 'AI_SPEAKING' });
        get().addTranscriptChunk({
          id: `t_${Date.now() + 1}`,
          speaker: 'AI Agent',
          text: 'I have checked order ORD-98231. It is currently on the delivery vehicle and expected by 3:00 PM today!',
          timestamp: `0:${get().durationSeconds}`,
        });

        setTimeout(() => {
          set({ callState: 'LISTENING' });
        }, 3000);
      }, 1500);
    }
  },
}));
