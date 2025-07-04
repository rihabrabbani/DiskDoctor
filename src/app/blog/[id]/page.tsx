'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

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
export default function BlogPost({ params }: BlogPostProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [blogId, setBlogId] = useState<string>('');

  useEffect(() => {
    params.then(({ id }) => {
      setBlogId(id);
      fetchBlog(id);
    });
  }, [params]);

  const fetchBlog = async (id: string) => {
    try {
      const response = await fetch(`https://diskdoctor.onrender.com/api/blogs/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setBlog(data.blog);
      } else {
        notFound();
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
            <p className="text-[var(--color-text-secondary)]">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />
      
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back to Blog Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-[var(--color-primary)] hover:underline mb-8"
              >
                <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </motion.div>

            {/* Blog Header */}
            <motion.header
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 !text --color-text-primary">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex items-center text-[var(--color-text-secondary)] mb-8">
                <time dateTime={blog.createdAt}>
                  Published on {formatDate(blog.createdAt)}
                </time>
                {blog.updatedAt !== blog.createdAt && (
                  <>
                    <span className="mx-2">•</span>
                    <time dateTime={blog.updatedAt}>
                      Updated {formatDate(blog.updatedAt)}
                    </time>
                  </>
                )}
              </div>

              {/* Featured Image */}
              {blog.image && (
                <motion.div
                  className="relative w-full rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] mb-8"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Image
                    src={blog.image.url}
                    alt={blog.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    className="w-full h-auto"
                  />
                </motion.div>
              )}
            </motion.header>

            {/* Blog Content */}
            <motion.article
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div 
                className="text-[var(--color-text-primary)] leading-relaxed"
                style={{
                  fontSize: '1.125rem',
                  lineHeight: '1.75'
                }}
                dangerouslySetInnerHTML={{ 
                  __html: blog.content.replace(/\n/g, '<br />') 
                }}
              />
            </motion.article>

            {/* Share Section */}
            <motion.footer
              className="mt-12 pt-8 border-t border-[var(--color-border)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-[var(--color-text-primary)]">
                    Found this helpful?
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    Share this article with others who might benefit from it.
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigator.share && navigator.share({
                      title: blog.title,
                      url: window.location.href
                    })}
                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors duration-300"
                  >
                    Share
                  </button>
                  
                  <Link
                    href="/blog"
                    className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-surface-200)] transition-colors duration-300"
                  >
                    More Articles
                  </Link>
                </div>
              </div>
            </motion.footer>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
