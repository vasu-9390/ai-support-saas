import { create } from 'zustand';
import { User, Role, AuthTokens } from '@/types';
import { MOCK_USERS } from '@/services/mock/mockData';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  activeRole: Role;
  login: (email: string, role?: Role) => Promise<void>;
  logout: () => void;
  switchRole: (role: Role) => void;
  updateUser: (partial: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  (set) => ({
    user: MOCK_USERS.agent, // Default demo logged in as agent
    tokens: {
      accessToken: 'demo_jwt_access_token_sec_key_xyz',
      refreshToken: 'demo_jwt_refresh_token_sec_key_abc',
      expiresIn: 3600,
    },
    isAuthenticated: true,
    activeRole: 'agent',

    login: async (email: string, role: Role = 'agent') => {
      const selectedUser = MOCK_USERS[role] || {
        ...MOCK_USERS.agent,
        email,
        role,
      };
      set({
        user: selectedUser,
        activeRole: role,
        isAuthenticated: true,
        tokens: {
          accessToken: `token_${Date.now()}`,
          refreshToken: `refresh_${Date.now()}`,
          expiresIn: 3600,
        },
      });
    },

    logout: () => {
      set({
        user: null,
        tokens: null,
        isAuthenticated: false,
      });
    },

    switchRole: (role: Role) => {
      const targetUser = MOCK_USERS[role];
      if (targetUser) {
        set({
          user: targetUser,
          activeRole: role,
        });
      }
    },

    updateUser: (partial: Partial<User>) => {
      set((state) => ({
        user: state.user ? { ...state.user, ...partial } : null,
      }));
    },
  })
);
