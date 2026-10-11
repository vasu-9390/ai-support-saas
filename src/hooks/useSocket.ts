import { useEffect } from 'react';
import { socketService } from '@/services/websocket/socketService';
import { useAuthStore } from '@/store/useAuthStore';

export function useSocket() {
  const token = useAuthStore((s) => s.tokens?.accessToken);

  useEffect(() => {
    socketService.connect(token);
    return () => {
      socketService.disconnect();
    };
  }, [token]);

  return socketService;
}
