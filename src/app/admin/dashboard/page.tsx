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
  sections?: any[];
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

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchBlogs();
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
                onClick={() => router.push('/admin/aiblog')}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity text-sm shadow-md flex items-center gap-2"
              >
                🪄 AI Portal
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
                            onClick={() => {
                                if (blog.sections && blog.sections.length > 0) {
                                    router.push(`/admin/editor?id=${blog.id}`);
                                } else {
                                    router.push(`/admin/editor/${blog.id}`);
                                }
                            }}
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
    </div>
  );
}