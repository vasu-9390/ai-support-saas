import { create } from 'zustand';
import { AIAgentConfig, AgentTool } from '@/types';
import { MOCK_AI_AGENT_CONFIG } from '@/services/mock/mockData';

interface AgentState {
  config: AIAgentConfig;
  updateConfig: (partial: Partial<AIAgentConfig>) => void;
  toggleTool: (toolId: string) => void;
  addTool: (tool: AgentTool) => void;
  saveAgentSettings: () => Promise<boolean>;
}

export const useAgentStore = create<AgentState>((set, get) => ({
  config: MOCK_AI_AGENT_CONFIG,

  updateConfig: (partial: Partial<AIAgentConfig>) => {
    set((state) => ({
      config: { ...state.config, ...partial },
    }));
  },

  toggleTool: (toolId: string) => {
    set((state) => ({
      config: {
        ...state.config,
        allowedTools: state.config.allowedTools.map((t) =>
          t.id === toolId ? { ...t, isEnabled: !t.isEnabled } : t
        ),
      },
    }));
  },

  addTool: (tool: AgentTool) => {
    set((state) => ({
      config: {
        ...state.config,
        allowedTools: [...state.config.allowedTools, tool],
      },
    }));
  },

  saveAgentSettings: async () => {
    // Simulated API call delay
    await new Promise((r) => setTimeout(r, 600));
    return true;
  },
}));
