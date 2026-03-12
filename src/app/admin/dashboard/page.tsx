'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

interface Blog {
  id: string;
  slug?: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  images: string[];
  featuredImage?: string;
  category?: string;
  status?: string;
  author?: string;
  readingTime?: number;
  wordCount?: number;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

type FilterTab = 'all' | 'published' | 'draft' | 'scheduled';

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const router = useRouter();

  // AI State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMagicOpen, setIsMagicOpen] = useState(false);
  const [aiApiKey, setAiApiKey] = useState('');
  const [aiModel, setAiModel] = useState('gpt-4o-mini');
  const [aiImageModel, setAiImageModel] = useState('dall-e-3');
  const [isTestingKey, setIsTestingKey] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  
  const [magicMode, setMagicMode] = useState<'guided' | 'magic'>('magic');
  const [magicTopic, setMagicTopic] = useState('');
  const [magicNotes, setMagicNotes] = useState('');
  const [magicWordCount, setMagicWordCount] = useState(1200);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchBlogs();
    fetchAISettings();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs?admin=true');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAISettings = async () => {
    try {
      const response = await fetch('/api/admin/ai-settings');
      const data = await response.json();
      if (data.success && data.settings) {
        setAiApiKey(data.settings.apiKey);
        setAiModel(data.settings.model || 'gpt-4o-mini');
        setAiImageModel(data.settings.imageModel || 'dall-e-3');
      }
    } catch (error) {
      console.error('Error fetching AI settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    if (!aiApiKey) {
      alert('API Key is required');
      return;
    }
    setIsTestingKey(true);
    setIsSavingSettings(true);
    try {
      const response = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: aiApiKey, model: aiModel, imageModel: aiImageModel })
      });
      const data = await response.json();
      if (data.success) {
        alert('Settings saved successfully!');
        setIsSettingsOpen(false);
      } else {
        alert(data.message || 'Failed to save settings. Check your API key.');
      }
    } catch (error) {
      alert('Error testing API key.');
    } finally {
      setIsTestingKey(false);
      setIsSavingSettings(false);
    }
  };

  const handleGenerate = async () => {
    if (!aiApiKey) {
      alert('Please configure your OpenAI API Key in settings first.');
      setIsMagicOpen(false);
      setIsSettingsOpen(true);
      return;
    }
    if (magicMode === 'guided' && !magicTopic.trim()) {
      alert('Please enter a topic.');
      return;
    }

    setIsGenerating(true);
    setGenerationStep('Initializing AI engines...');
    setCurrentStepIndex(1);

    try {
      const response = await fetch('/api/blogs/ai-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: magicMode,
          topic: magicMode === 'guided' ? magicTopic : undefined,
          notes: magicNotes,
          targetWordCount: magicWordCount
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to start AI generation');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) throw new Error('No stream available');
      
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split('\n\n');
          buffer = parts.pop() || '';
          
          for (const part of parts) {
            if (part.startsWith('data: ')) {
               try {
                 const data = JSON.parse(part.slice(6));
                 if (data.error) throw new Error(data.error);
                 
                 if (data.step) {
                   setCurrentStepIndex(data.step);
                   if (data.message) setGenerationStep(data.message);
                 }
                 
                 if (data.blog) {
                    sessionStorage.setItem('aiGeneratedBlog', JSON.stringify(data.blog));
                    router.push('/admin/editor?ai=true');
                    return; // Successfully finished
                 }
               } catch (e: any) {
                 if (!e.message.includes('Unexpected end of JSON')) {
                     console.error('SSE parse error:', e);
                 }
               }
            }
          }
        }
      }
    } catch (error: any) {
      alert(error.message || 'Error generating blog.');
      setIsGenerating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchBlogs();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog post.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  // Filter blogs by tab
  const filteredBlogs = blogs.filter(blog => {
    if (activeTab === 'all') return true;
    return (blog.status || 'published') === activeTab;
  });

  // Stats
  const stats = {
    total: blogs.length,
    published: blogs.filter(b => (b.status || 'published') === 'published').length,
    draft: blogs.filter(b => b.status === 'draft').length,
    scheduled: blogs.filter(b => b.status === 'scheduled').length,
  };

  const getStatusBadge = (status?: string) => {
    const s = status || 'published';
    const colors: Record<string, string> = {
      published: 'bg-green-500/15 text-green-400 border-green-500/30',
      draft: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
      scheduled: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors[s] || colors.draft}`}>
        {s.charAt(0).toUpperCase() + s.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[var(--color-text-secondary)]">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const generationStepsList = [
    { id: 1, title: 'Ideation & Topic Selection' },
    { id: 2, title: 'Deep Web Research' },
    { id: 3, title: 'Drafting Content & SEO' },
    { id: 4, title: 'Generating Media & Images' },
    { id: 5, title: 'Finalizing Assets' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] relative">
      <Header />

      <main className="py-8 lg:py-16 xl:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                Blog Dashboard
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
                Manage your blog posts and content
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="px-4 py-3 bg-[var(--color-surface-200)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-surface-300)] transition-colors text-sm border border-[var(--color-border)] flex items-center gap-2"
              >
                ⚙️ AI Settings
              </button>

              <button
                onClick={() => setIsMagicOpen(true)}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm shadow-md flex items-center gap-2"
              >
                🪄 MagicAI
              </button>

              <button
                onClick={() => router.push('/admin/editor')}
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors text-sm shadow-md"
              >
                + New Post
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-surface-200)] transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {[
              { label: 'Total', value: stats.total, color: 'var(--color-primary)' },
              { label: 'Published', value: stats.published, color: '#22c55e' },
              { label: 'Drafts', value: stats.draft, color: '#eab308' },
              { label: 'Scheduled', value: stats.scheduled, color: '#3b82f6' },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-4 sm:p-5"
              >
                <p className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="flex gap-1 mb-6 bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-1 overflow-x-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {(['all', 'published', 'draft', 'scheduled'] as FilterTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-[80px] px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-200)]'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab !== 'all' && (
                  <span className="ml-1.5 opacity-70">
                    {tab === 'published' ? stats.published : tab === 'draft' ? stats.draft : stats.scheduled}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Blog List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              {filteredBlogs.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-5xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">
                    {activeTab === 'all' ? 'No blogs yet' : `No ${activeTab} posts`}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                    {activeTab === 'all' ? 'Create your first blog post to get started.' : `You don't have any ${activeTab} posts.`}
                  </p>
                  {activeTab === 'all' && (
                    <button
                      onClick={() => router.push('/admin/editor')}
                      className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
                    >
                      Create First Post
                    </button>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {filteredBlogs.map((blog) => (
                    <div key={blog.id} className="p-4 sm:p-6 hover:bg-[var(--color-surface-200)] transition-colors duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1 min-w-0">
                          {/* Blog Image */}
                          {(blog.featuredImage || (blog.images?.length > 0)) && (
                            <div className="flex-shrink-0 w-full sm:w-24 lg:w-28 rounded-lg overflow-hidden border border-[var(--color-border)]">
                              <Image
                                src={blog.featuredImage || blog.images[0]}
                                alt={blog.title}
                                width={0}
                                height={0}
                                sizes="(max-width: 640px) 100vw, 112px"
                                style={{ width: '100%', height: 'auto' }}
                                className="w-full h-auto rounded-lg object-cover"
                              />
                            </div>
                          )}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                              <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] break-words line-clamp-2">
                                {blog.title}
                              </h3>
                              {getStatusBadge(blog.status)}
                            </div>

                            <p className="text-sm text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                              {blog.excerpt}
                            </p>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-text-tertiary)]">
                              <span>{formatDate(blog.createdAt)}</span>
                              {blog.category && <span className="text-[var(--color-primary)]">{blog.category}</span>}
                              {blog.readingTime && <span>{blog.readingTime} min read</span>}
                              {blog.wordCount && <span>{blog.wordCount} words</span>}
                              {blog.status === 'scheduled' && blog.scheduledAt && (
                                <span className="text-blue-400">Scheduled: {formatDate(blog.scheduledAt)}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-row sm:flex-col lg:flex-row items-stretch sm:items-end lg:items-center gap-2 flex-shrink-0 mt-4 sm:mt-0">
                          <button
                            onClick={() => router.push(`/admin/editor/${blog.id}`)}
                            className="flex-1 sm:flex-none px-4 py-2 text-sm border border-[var(--color-primary)] text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors text-center font-medium"
                          >
                            Edit
                          </button>
                          <a
                            href={`/blog/${blog.slug || blog.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none px-4 py-2 text-sm bg-[var(--color-surface-200)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-surface-300)] transition-colors text-center border border-[var(--color-border)] font-medium"
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="flex-1 sm:flex-none px-4 py-2 text-sm text-red-500 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      {/* --- Modals --- */}
      
      {/* AI Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                  ⚙️ AI Settings
                </h2>
                <button onClick={() => setIsSettingsOpen(false)} className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">OpenAI API Key</label>
                  <input
                    type="password"
                    value={aiApiKey}
                    onChange={e => setAiApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  />
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-1.5">Your key is stored in MongoDB. Needed for MagicAI features.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Text Model</label>
                  <select
                    value={aiModel}
                    onChange={e => setAiModel(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  >
                    <option value="gpt-4o">GPT-4o (Recommended)</option>
                    <option value="gpt-4o-mini">GPT-4o Mini (Cheaper)</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Image Model</label>
                  <select
                    value={aiImageModel}
                    onChange={e => setAiImageModel(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  >
                    <option value="dall-e-3">DALL-E 3 (High Quality)</option>
                    <option value="dall-e-2">DALL-E 2 (Faster, cheaper)</option>
                  </select>
                </div>
              </div>
              
              <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface-50)] flex justify-end gap-3">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-200)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveSettings}
                  disabled={isSavingSettings}
                  className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
                >
                  {isTestingKey ? 'Testing Connection...' : isSavingSettings ? 'Saving...' : 'Save & Verify'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MagicAI Modal */}
      <AnimatePresence>
        {isMagicOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  🪄 AI Blog Generator
                </h2>
                {!isGenerating && (
                  <button onClick={() => setIsMagicOpen(false)} className="text-[var(--color-text-tertiary)] hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </div>
              
              {isGenerating ? (
                <div className="p-8 flex flex-col items-center w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">Generating Blog Post</h3>
                  <p className="text-[var(--color-primary)] font-medium mb-8 text-center">{generationStep}</p>
                  
                  <div className="w-full max-w-sm space-y-4">
                    {generationStepsList.map((step) => {
                      const isActive = currentStepIndex === step.id;
                      const isPast = currentStepIndex > step.id;
                      const isFuture = currentStepIndex < step.id;
                      
                      return (
                        <div key={step.id} className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${isActive ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/50 shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.2)]' : isPast ? 'bg-green-500/5 border-green-500/20' : 'bg-[var(--color-surface-200)] border-transparent opacity-50'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${isActive ? 'bg-[var(--color-primary)] text-white shadow-[0_0_10px_var(--color-primary)]' : isPast ? 'bg-green-500 text-white' : 'bg-[var(--color-surface-300)] text-[var(--color-text-secondary)]'}`}>
                            {isPast ? (
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                            ) : (
                                step.id
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-semibold ${isActive ? 'text-[var(--color-primary)]' : isPast ? 'text-green-400' : 'text-[var(--color-text-secondary)]'}`}>{step.title}</h4>
                          </div>
                          {isActive && (
                            <div className="w-5 h-5 rounded-full border-2 border-[var(--color-primary)] border-t-transparent animate-spin"></div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  <p className="text-xs text-[var(--color-text-tertiary)] max-w-sm mt-8 text-center leading-relaxed">
                    Please don't close this window.<br/>MagicAI is orchestrating multiple agents in the background.
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex border-b border-[var(--color-border)]">
                    <button
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${magicMode === 'magic' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                      onClick={() => setMagicMode('magic')}
                    >
                      ✨ Auto (MagicAI)
                    </button>
                    <button
                      className={`flex-1 py-3 text-sm font-medium transition-colors ${magicMode === 'guided' ? 'border-b-2 border-indigo-500 text-indigo-400' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
                      onClick={() => setMagicMode('guided')}
                    >
                      ✍️ Guided
                    </button>
                  </div>

                  <div className="p-6 overflow-y-auto space-y-5">
                    {magicMode === 'magic' ? (
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                        <h4 className="font-semibold text-purple-300 flex items-center gap-2 mb-2">
                          How MagicAI works
                        </h4>
                        <ul className="text-sm text-[var(--color-text-secondary)] space-y-2 list-inside list-disc">
                          <li>Analyzes your existing blog posts</li>
                          <li>Identifies missing keywords and trending topics</li>
                          <li>Generates a full 1,200+ word SEO-optimized article</li>
                          <li>Creates a custom featured image using DALL-E 3</li>
                        </ul>
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Topic or specific title *</label>
                          <input
                            type="text"
                            value={magicTopic}
                            onChange={e => setMagicTopic(e.target.value)}
                            placeholder="e.g. Signs your SSD is failing"
                            className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Focus Keyword / Notes (Optional)</label>
                      <textarea
                        value={magicNotes}
                        onChange={e => setMagicNotes(e.target.value)}
                        placeholder="e.g. Include a section about M.2 NVMe drives"
                        rows={3}
                        className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-sm font-medium text-[var(--color-text-secondary)]">Target Word Count</label>
                        <span className="text-xs text-[var(--color-text-tertiary)]">{magicWordCount} words</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="2500"
                        step="100"
                        value={magicWordCount}
                        onChange={(e) => setMagicWordCount(parseInt(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>
                  </div>

                  <div className="p-6 border-t border-[var(--color-border)] bg-[var(--color-surface-50)] flex justify-end gap-3">
                    <button
                      onClick={() => setIsMagicOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-200)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleGenerate}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity shadow-md"
                    >
                      ✨ Generate Now
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}