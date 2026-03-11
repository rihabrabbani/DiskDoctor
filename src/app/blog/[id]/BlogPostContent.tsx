'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

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

interface BlogPostContentProps {
    blog: Blog;
}

export default function BlogPostContent({ blog }: BlogPostContentProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const featuredImage = blog.images?.[0] || null;

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
                            {/* Breadcrumb Navigation */}
                            <nav aria-label="Breadcrumb" className="mb-6">
                                <ol className="flex items-center space-x-2 text-sm text-[var(--color-text-tertiary)]">
                                    <li>
                                        <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link>
                                    </li>
                                    <li><span className="mx-1">/</span></li>
                                    <li>
                                        <Link href="/blog" className="hover:text-[var(--color-primary)] transition-colors">Blog</Link>
                                    </li>
                                    <li><span className="mx-1">/</span></li>
                                    <li className="text-[var(--color-text-primary)] font-medium truncate max-w-[200px]">
                                        {blog.title}
                                    </li>
                                </ol>
                            </nav>

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
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-[var(--color-text-primary)]">
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
                            {featuredImage && (
                                <motion.div
                                    className="relative w-full rounded-2xl overflow-hidden shadow-[var(--shadow-lg)] mb-8"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <Image
                                        src={featuredImage}
                                        alt={blog.title}
                                        width={1200}
                                        height={630}
                                        sizes="(max-width: 768px) 100vw, 800px"
                                        className="w-full h-auto"
                                        priority
                                    />
                                </motion.div>
                            )}
                        </motion.header>

                        {/* Blog Content — this HTML is server-rendered, visible to crawlers */}
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
