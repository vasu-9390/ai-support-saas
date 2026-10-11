import React, { useState } from 'react';
import { useKBStore } from '@/store/useKBStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatTimeAgo } from '@/utils/formatters';
import {
  BookOpen,
  Search,
  UploadCloud,
  FileText,
  FileCode,
  File,
  Trash2,
  Sparkles,
  Layers,
  Database,
  CheckCircle2,
  FolderTree,
} from 'lucide-react';
import { KBArticle } from '@/types';

export const KnowledgeBasePage: React.FC = () => {
  const { articles, selectedCategory, searchQuery, isUploading, setCategory, setSearchQuery, addArticle, deleteArticle } = useKBStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategoryInput] = useState('Billing & Subscriptions');
  const [content, setContent] = useState('');

  const categories = [
    'All Categories',
    'Billing & Subscriptions',
    'Developer Documentation',
    'Security & Auth',
    'AI Configuration',
    'Shipping & Delivery',
  ];

  const filteredArticles = articles.filter((a) => {
    if (selectedCategory && selectedCategory !== 'All Categories' && a.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    await addArticle({ title, category, content, fileType: 'pdf' });
    setIsModalOpen(false);
    setTitle('');
    setContent('');
  };

  const getDocIcon = (type: string) => {
    if (type === 'pdf') return <FileText className="w-5 h-5 text-rose-500" />;
    if (type === 'markdown') return <FileCode className="w-5 h-5 text-indigo-500" />;
    if (type === 'docx') return <FileText className="w-5 h-5 text-blue-500" />;
    return <File className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-indigo-500" /> RAG Knowledge Base Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Index PDF, DOCX, TXT, and Markdown files into vector embeddings for autonomous AI agent retrieval.
          </p>
        </div>

        <Button variant="primary" onClick={() => setIsModalOpen(true)} icon={<UploadCloud className="w-4 h-4" />}>
          Upload Knowledge Document
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* LEFT COLUMN: Categories Tree View (Requirement #8) */}
        <Card className="p-4 space-y-3 h-fit">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <FolderTree className="w-4 h-4 text-indigo-500" /> Knowledge Categories
          </h3>
          <div className="space-y-1">
            {categories.map((cat) => {
              const isSelected = (selectedCategory || 'All Categories') === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat === 'All Categories' ? null : cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* RIGHT 3 COLUMNS: Documents Grid & RAG Vector Status */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search Bar */}
          <Card className="p-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search indexed articles, embeddings, chunk keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </Card>

          {/* Articles Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredArticles.map((doc) => (
              <Card key={doc.id} className="p-5 hover:border-indigo-500/50 transition-all space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">
                        {getDocIcon(doc.fileType)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 line-clamp-1">{doc.title}</h4>
                        <p className="text-[11px] text-slate-400">{doc.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteArticle(doc.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {doc.content}
                  </p>
                </div>

                {/* Vector Processing Details & Badges (Requirement #8) */}
                <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-mono">
                      <span className="text-slate-400 block text-[9px] uppercase">Chunks Indexed</span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{doc.chunkCount} Chunks</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 font-mono">
                      <span className="text-slate-400 block text-[9px] uppercase">Vector Embeddings</span>
                      <span className="font-bold text-emerald-500">{doc.embeddingStatus.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>File: {doc.fileName} ({doc.fileSize})</span>
                    <span>Updated {formatTimeAgo(doc.lastUpdated)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal: Upload Document */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload RAG Knowledge Document">
        <form onSubmit={handleUpload} className="space-y-4">
          <Input
            label="Article Title"
            placeholder="e.g. Enterprise SLA & Support Refund Manual"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategoryInput(e.target.value)}
              className="w-full p-2.5 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white"
            >
              {categories.filter((c) => c !== 'All Categories').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300">Document Body Content (or upload PDF, DOCX, TXT, MD)</label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste knowledge text or drop file here..."
              className="w-full p-3 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white"
              required
            />
          </div>
          <Button type="submit" variant="primary" className="w-full" isLoading={isUploading}>
            Process & Generate Vector Embeddings
          </Button>
        </form>
      </Modal>
    </div>
  );
};
