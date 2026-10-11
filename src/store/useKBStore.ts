import { create } from 'zustand';
import { KBArticle } from '@/types';
import { MOCK_KB_ARTICLES } from '@/services/mock/mockData';

interface KBState {
  articles: KBArticle[];
  selectedCategory: string | null;
  searchQuery: string;
  isUploading: boolean;
  setCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  addArticle: (article: Partial<KBArticle>) => Promise<void>;
  deleteArticle: (id: string) => void;
}

export const useKBStore = create<KBState>((set) => ({
  articles: MOCK_KB_ARTICLES,
  selectedCategory: null,
  searchQuery: '',
  isUploading: false,

  setCategory: (category: string | null) => set({ selectedCategory: category }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  addArticle: async (partial: Partial<KBArticle>) => {
    set({ isUploading: true });
    await new Promise((r) => setTimeout(r, 1200));

    const newDoc: KBArticle = {
      id: `kb-${Date.now()}`,
      title: partial.title || 'Untitled Knowledge Document',
      category: partial.category || 'General Documentation',
      content: partial.content || 'Sample knowledge body text.',
      fileType: partial.fileType || 'pdf',
      fileName: partial.fileName || 'uploaded_document.pdf',
      fileSize: partial.fileSize || '1.2 MB',
      docStatus: 'published',
      processingStatus: 'indexed',
      chunkCount: Math.floor(40 + Math.random() * 120),
      tokenCount: Math.floor(5000 + Math.random() * 15000),
      embeddingStatus: 'ready',
      lastUpdated: new Date().toISOString(),
      tags: partial.tags || ['General', 'Indexed'],
    };

    set((state) => ({
      articles: [newDoc, ...state.articles],
      isUploading: false,
    }));
  },

  deleteArticle: (id: string) => {
    set((state) => ({
      articles: state.articles.filter((a) => a.id !== id),
    }));
  },
}));
