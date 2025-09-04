'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

// Add metadata for the blog page
export const metadata: Metadata = {
  title: 'Data Recovery Blog | Expert Tips & Industry News | DiskDoctor',
  description: 'Expert data recovery insights, tips, and industry news from DiskDoctor specialists. Learn about hard drive recovery, SSD repair, and data protection strategies.',
  keywords: 'data recovery blog, hard drive recovery tips, SSD recovery guide, data protection, data loss prevention, recovery techniques, disk doctor blog',
  openGraph: {
    title: 'Data Recovery Blog | Expert Tips & Industry News | DiskDoctor',
    description: 'Expert data recovery insights, tips, and industry news from DiskDoctor specialists. Learn about hard drive recovery, SSD repair, and data protection strategies.',
    type: 'website',
    url: 'https://www.diskdoctorsamerica.com/blog',
    siteName: 'DiskDoctor Data Recovery',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.diskdoctorsamerica.com/images/og-blog.jpg',
        width: 1200,
        height: 630,
        alt: 'DiskDoctor Data Recovery Blog - Expert Tips and Industry News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@diskdoctor',
    creator: '@diskdoctor',
    title: 'Data Recovery Blog | Expert Tips & Industry News | DiskDoctor',
    description: 'Expert data recovery insights, tips, and industry news from DiskDoctor specialists.',
    images: ['https://www.diskdoctorsamerica.com/images/og-blog.jpg'],
  },
  alternates: {
    canonical: 'https://www.diskdoctorsamerica.com/blog',
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Define cardVariants with proper typing
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeInOut" }
  }
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
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

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

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
            <p className="text-[var(--color-text-secondary)]">Loading blogs...</p>
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
          {/* Header Section */}
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 !text --color-text-primary">
              Data Recovery <span className="text-[var(--color-primary)]">Blog</span>
            </h1>
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed">
              Expert insights, recovery tips, and industry updates from our data recovery specialists.
            </p>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div 
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
              </div>
              <div>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="px-4 py-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-surface-100)] text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Blog Grid */}
          {filteredBlogs.length === 0 ? (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold mb-2 text-[var(--color-text-primary)]">No blogs found</h3>
              <p className="text-[var(--color-text-secondary)]">
                {searchTerm || selectedTag ? 'Try adjusting your search criteria.' : 'Check back soon for new content!'}
              </p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredBlogs.map((blog) => (
                <motion.article
                  key={blog.id}
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 group"
                >
                  {blog.image && (
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={`${blog.image.url}`}
                        alt={blog.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {blog.tags.slice(0, 2).map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary)] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h2>
                    
                    <p className="text-[var(--color-text-secondary)] mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[var(--color-text-tertiary)]">
                        {formatDate(blog.createdAt)}
                      </span>
                      
                      <Link
                        href={`/blog/${blog.id}`}
                        className="inline-flex items-center text-[var(--color-primary)] font-medium hover:underline"
                      >
                        Read More
                        <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
