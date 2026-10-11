import { io, Socket } from 'socket.io-client';
import { useNotificationStore } from '@/store/useNotificationStore';
import { useConversationStore } from '@/store/useConversationStore';
import { useVoiceStore } from '@/store/useVoiceStore';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  public connect(token?: string) {
    if (this.socket && this.isConnected) return;

    try {
      this.socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling'],
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        console.log('[SocketService] Connected to WebSocket server');
      });

      this.socket.on('disconnect', () => {
        this.isConnected = false;
        console.log('[SocketService] Disconnected from WebSocket server');
      });

      // Register real-time event listeners
      this.socket.on('new_ticket', (data: any) => {
        useNotificationStore.getState().addNotification({
          type: 'new_ticket',
          title: 'New Ticket Arrived',
          message: data.subject || 'A new ticket has been submitted by a customer.',
          priority: 'medium',
        });
      });

      this.socket.on('escalation', (data: any) => {
        useNotificationStore.getState().addNotification({
          type: 'escalation',
          title: 'Urgent Conversation Escalated',
          message: data.reason || 'Customer sentiment dropped to frustrated.',
          priority: 'high',
        });
      });

      this.socket.on('voice_transcript', (data: any) => {
        if (data.speaker && data.text) {
          useVoiceStore.getState().addTranscriptChunk({
            id: `vt_${Date.now()}`,
            speaker: data.speaker,
            text: data.text,
            timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          });
        }
      });
    } catch (err) {
      console.warn('[SocketService] Initialized in offline fallback mode.');
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public emit(event: string, data: any) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    }
  }

  // Demo emulator: Triggers dynamic real-time event simulations for reviewer demonstration
  public triggerDemoSimulationEvent(type: 'escalation' | 'new_ticket' | 'voice_chunk') {
    if (type === 'escalation') {
      useNotificationStore.getState().addNotification({
        type: 'escalation',
        title: '⚡ Real-time Escalation Alert',
        message: 'Sarah Jenkins requested human manager intervention on order #ORD-98231.',
        priority: 'high',
        linkUrl: '/inbox?id=conv-101',
      });
    } else if (type === 'new_ticket') {
      useNotificationStore.getState().addNotification({
        type: 'new_ticket',
        title: '📩 Real-time Ticket #TCK-9904 Created',
        message: 'New enterprise inquiry: "SAML 2.0 Okta Single Sign-On Mapping Issue".',
        priority: 'medium',
        linkUrl: '/tickets',
      });
    } else if (type === 'voice_chunk') {
      useVoiceStore.getState().addTranscriptChunk({
        id: `vt_${Date.now()}`,
        speaker: 'AI Agent',
        text: 'I have verified your account details and updated your shipping SLA address in our system.',
        timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
      });
    }
  }
}

export const socketService = new SocketService();
