'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

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

// Generate metadata for individual blog posts
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    // Fetch blog data for metadata
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${id}`);
    const data = await response.json();
    
    if (!data.success || !data.blog) {
      return {
        title: 'Blog Post Not Found | DiskDoctor Data Recovery',
        description: 'The requested blog post was not found. Browse our data recovery blog for expert tips and insights.',
      };
    }

    const blog = data.blog;
    
    // SEO-optimized title (50-60 characters)
    const seoTitle = `${blog.title} | DiskDoctor Data Recovery Blog`;
    
    // SEO-optimized description (150-160 characters)
    const seoDescription = blog.excerpt.length > 150 
      ? blog.excerpt.substring(0, 147) + '...' 
      : blog.excerpt;
    
    // Enhanced keywords
    const keywords = [
      ...blog.tags,
      'data recovery',
      'hard drive recovery',
      'SSD recovery',
      'data protection',
      'disk doctor',
      'data recovery tips',
      'data loss prevention'
    ].join(', ');

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: keywords,
      authors: [{ name: "DiskDoctor Data Recovery" }],
      creator: "DiskDoctor Data Recovery",
      publisher: "DiskDoctor Data Recovery",
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        type: 'article',
        url: `https://www.diskdoctorsamerica.com/blog/${id}`,
        siteName: 'DiskDoctor Data Recovery',
        locale: 'en_US',
        publishedTime: blog.createdAt,
        modifiedTime: blog.updatedAt,
        authors: ['DiskDoctor Data Recovery'],
        tags: blog.tags,
        images: blog.image ? [
          {
            url: blog.image.url,
            width: blog.image.width || 1200,
            height: blog.image.height || 630,
            alt: blog.image.alt || blog.title,
          },
        ] : [
          {
            url: 'https://www.diskdoctorsamerica.com/images/og-blog.jpg',
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@diskdoctor',
        creator: '@diskdoctor',
        title: seoTitle,
        description: seoDescription,
        images: blog.image ? [blog.image.url] : ['https://www.diskdoctorsamerica.com/images/og-blog.jpg'],
      },
      alternates: {
        canonical: `https://www.diskdoctorsamerica.com/blog/${id}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post | DiskDoctor Data Recovery',
      description: 'Read expert data recovery insights and tips from DiskDoctor specialists.',
    };
  }
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
      const response = await fetch(`/api/blogs/${id}`);
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
