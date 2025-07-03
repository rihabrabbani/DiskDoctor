'use client';

import { useState, useEffect, useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

// Create a dynamic import with forwardRef
const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill-new');
    // Explicitly type the forwarded ref component to accept ReactQuill's props
    return forwardRef<any, any>((props, ref) => <RQ {...props} ref={ref} />);
  },
  { ssr: false }
);

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  tags: string[];
  images: string[];
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
    images: [] as File[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const quillRef = useRef<any>(null);
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

  // Enhanced Quill modules configuration
  const quillModules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align', 'blockquote', 'code-block',
    'list', 'indent', 'link', 'image'
  ];

  // Custom image handler for Quill
  async function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        setUploadProgress(10);

        try {
          const formData = new FormData();
          formData.append('image', file);

          const response = await fetch('https://diskdoctor.onrender.com/api/upload', {
            method: 'POST',
            body: formData,
          });

          setUploadProgress(70);

          if (!response.ok) {
            throw new Error('Failed to upload image to Cloudinary');
          }

          const data = await response.json();
          const imageUrl = data.secure_url;

          setUploadProgress(90);

          // Insert image into editor
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            quill.insertEmbed(range ? range.index : 0, 'image', imageUrl);
          }

          setUploadProgress(100);
          setTimeout(() => setUploadProgress(0), 500);
        } catch (error) {
          console.error('Error uploading image:', error);
          setUploadProgress(0);
          alert('Failed to upload image. Please try again.');
        }
      }
    };
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Enhanced submit handler with better error handling and progress tracking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setUploadProgress(10);

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title.trim());
      submitData.append('content', formData.content);
      submitData.append('excerpt', formData.excerpt.trim());
      submitData.append('tags', formData.tags.trim());
      
      setUploadProgress(20);

      // Add additional images
      if (formData.images.length > 0) {
        formData.images.forEach((image) => {
          submitData.append('images', image);
        });
        setUploadProgress(30);
      }

      setUploadProgress(50);

      const response = await fetch('https://diskdoctor.onrender.com/api/blogs', {
        method: 'POST',
        body: submitData,
      });

      setUploadProgress(80);

      const data = await response.json();
      
      if (data.success) {
        setUploadProgress(100);
        
        // Reset form
        setFormData({ title: '', content: '', excerpt: '', tags: '', images: [] });
        setImagePreviews([]);
        setShowCreateForm(false);
        
        // Refresh blogs list
        await fetchBlogs();
        
        // Show success message
        alert('Blog post created successfully!');
      } else {
        throw new Error(data.message || 'Failed to create blog post');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Error creating blog post. Please try again.');
    } finally {
      setSubmitting(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        fetchBlogs();
        alert('Blog post deleted successfully!');
      } else {
        throw new Error(data.message || 'Failed to delete blog post');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog post. Please try again.');
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
      
      <main className="py-8 lg:py-16 xl:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                Blog Dashboard
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
                Manage your blog posts and content
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4 sm:gap-0">
              <motion.button
                onClick={() => setShowCreateForm(true)}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] transition-colors duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create New Blog
              </motion.button>
              
              <motion.button
                onClick={handleLogout}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-surface-200)] transition-colors duration-300 text-sm sm:text-base"
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
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-[var(--color-surface-100)] rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-[var(--color-text-primary)]">
                    Create New Blog Post
                  </h2>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] p-1"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Bar */}
                {(submitting || uploadProgress > 0) && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {submitting ? 'Publishing...' : 'Processing...'}
                      </span>
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {uploadProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-surface-200)] rounded-full h-2">
                      <div 
                        className="bg-[var(--color-primary)] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-sm sm:text-base"
                      required
                      disabled={submitting}
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
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-sm sm:text-base"
                      placeholder="Brief description of the blog post..."
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Content *
                    </label>
                    <div className="quill-wrapper">
                      <ReactQuill
                        ref={quillRef}
                        value={formData.content}
                        onChange={(value: any) => setFormData({ ...formData, content: value })}
                        modules={quillModules}
                        formats={quillFormats}
                        className="bg-white"
                        readOnly={submitting}
                        placeholder="Write your blog content here. Use the image button in the toolbar to add images directly to your content."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text-primary)] mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-sm sm:text-base"
                      placeholder="e.g., data recovery, tips, hardware"
                      disabled={submitting}
                    />
                  </div>

                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:space-x-4 sm:gap-0 pt-4 sm:pt-6">
                    <button
                      type="button"
                      onClick={() => setShowCreateForm(false)}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg font-medium hover:bg-[var(--color-surface-200)] transition-colors duration-300 text-sm sm:text-base"
                      disabled={submitting}
                    >
                      Cancel
                    </button>
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-[var(--color-primary)] text-white rounded-lg font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 text-sm sm:text-base"
                      whileHover={{ scale: submitting ? 1 : 1.05 }}
                      whileTap={{ scale: submitting ? 1 : 0.95 }}
                    >
                      {submitting ? 'Publishing...' : 'Create Blog'}
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
            <div className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl sm:rounded-2xl overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-[var(--color-border)]">
                <h2 className="text-lg sm:text-xl font-semibold text-[var(--color-text-primary)]">
                  All Blog Posts ({blogs.length})
                </h2>
              </div>

              {blogs.length === 0 ? (
                <div className="p-8 sm:p-12 text-center">
                  <div className="text-4xl sm:text-6xl mb-4">📝</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-[var(--color-text-primary)]">No blogs yet</h3>
                  <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">Create your first blog post to get started.</p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--color-border)]">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="p-4 sm:p-6 hover:bg-[var(--color-surface-200)] transition-colors duration-200">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                          {/* Blog Image Preview */}
                          {Array.isArray(blog.images) && blog.images.length > 0 && (
                            <div className="flex-shrink-0 w-full sm:w-20 lg:w-24 rounded-lg overflow-hidden">
                              <Image
                                src={blog.images[0]}
                                alt={blog.title}
                                width={0}
                                height={0}
                                sizes="(max-width: 640px) 100vw, 96px"
                                style={{ width: '100%', height: 'auto' }}
                                className="w-full h-auto"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-semibold text-[var(--color-text-primary)] mb-2 break-words">
                              {blog.title}
                            </h3>
                            <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mb-3 line-clamp-2">
                              {blog.excerpt}
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-1 sm:gap-0 text-xs sm:text-sm text-[var(--color-text-tertiary)]">
                              <span>Created: {formatDate(blog.createdAt)}</span>
                              {blog.tags.length > 0 && (
                                <span className="break-all">Tags: {blog.tags.join(', ')}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-row sm:flex-col lg:flex-row items-stretch sm:items-end lg:items-center gap-2 sm:gap-1 lg:gap-2 flex-shrink-0">
                          <a
                            href={`/blog/${blog.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors duration-300 text-center"
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            className="flex-1 sm:flex-none px-3 py-2 text-xs sm:text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
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