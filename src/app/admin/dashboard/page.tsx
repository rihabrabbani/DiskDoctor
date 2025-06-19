'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    image: null as File | null
  });
  const [submitting, setSubmitting] = useState(false);
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
      const response = await fetch('https://diskdoctor.onrender.com/api/blogs');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('content', formData.content);
    submitData.append('excerpt', formData.excerpt);
    submitData.append('tags', formData.tags);
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      const response = await fetch('https://diskdoctor.onrender.com/api/blogs', {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();
      if (data.success) {
        setFormData({ title: '', content: '', excerpt: '', tags: '', image: null });
        setShowCreateForm(false);
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error creating blog:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`https://diskdoctor.onrender.com/api/blogs/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchBlogs();
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[var(--color-text-secondary)]">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div 
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                Blog Dashboard
              </h1>
              <p className="text-[var(--color-text-secondary)]">
                Manage your blog posts and content
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => setShowCreateForm(true)}
                className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create New Blog
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-surface-200)] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </div>
          </motion.div>

          {/* Create Blog Form Modal */}
          {showCreateForm && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[var(--color-surface-100)] rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                    Create New Blog Post
                  </h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Excerpt (Optional)
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      placeholder="Brief description of the blog post..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Content *
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={12}
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      placeholder="Write your blog content here..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      placeholder="e.g., data recovery, tips, hardware"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Featured Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                      className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-surface-200)] transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                      whileHover={{ scale: submitting ? 1 : 1.05 }}
                      whileTap={{ scale: submitting ? 1 : 0.95 }}
                    >
                      {submitting ? 'Creating...' : 'Create Blog'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Blog List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-[var(--color-border)]">
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">
                  All Blog Posts ({blogs.length})
                </h2>
              </div>

              {blogs.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-primary)]">No blogs yet</h3>
                  <p className="text-[var(--color-text-secondary)]">Create your first blog post to get started.</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="p-6 hover:bg-[var(--color-surface-200)] transition-colors duration-200">
                      <div className="flex items-start justify-between gap-4">
                        {/* Blog Image Preview */}
                        {blog.image && (
                          <div className="flex-shrink-0 w-24 rounded-lg overflow-hidden">
                            <Image
                              src={blog.image.url}
                              alt={blog.title}
                              width={0}
                              height={0}
                              sizes="96px"
                              style={{ width: '100%', height: 'auto' }}
                              className="w-full h-auto"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                            {blog.excerpt}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-[var(--color-text-tertiary)]">
                            <span>Created: {formatDate(blog.createdAt)}</span>
                            {blog.tags.length > 0 && (
                              <span>Tags: {blog.tags.join(', ')}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <a
                            href={`/blog/${blog.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors duration-300"
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="px-3 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
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
