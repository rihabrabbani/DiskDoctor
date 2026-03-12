'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

interface Blog {
    id: string;
    slug?: string;
    title: string;
    content?: string;
    sections?: { heading: string; content: string; image?: string | null; insertCtaAfter?: boolean }[];
    faqs?: { question: string; answer: string }[];
    keyTakeaways?: string[];
    excerpt: string;
    author?: string;
    category?: string;
    tags: string[];
    featuredImage?: string | null;
    images: string[];
    readingTime?: number;
    createdAt: string;
    updatedAt: string;
}

interface BlogPostContentProps {
    blog: Blog;
}

const CTA_CONTENT = [
    {
        title: "Need Professional Data Recovery?",
        description: "Don't risk permanent data loss. Our certified engineers have a 95% success rate recovering critical data from failed hard drives, RAID arrays, and flash media.",
        buttonText: "Get a Free Evaluation"
    },
    {
        title: "Critical Data Emergency?",
        description: "Time is critical. Stop using your damaged device immediately to prevent further logical or physical destruction. We offer 24/7 priority service.",
        buttonText: "Request Emergency Assist"
    }
];

const CTA_DESIGNS = [
    // Design 1: Professional Clean Tech (Brand consistent: Dark background with green primary)
    (cta: any, key: number) => (
        <div key={`cta-${key}`} className="my-10 clear-both relative bg-[#0f172a] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] rounded-full filter blur-[60px] opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-semibold tracking-wide mb-3 border border-[var(--color-primary)]/20 uppercase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
                        </span>
                        24/7 Priority Service
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white !text-white !mt-0 leading-snug">
                        {cta.title}
                    </h3>
                    <p className="text-base text-slate-300 max-w-2xl !text-slate-300 !mb-0 leading-relaxed">
                        {cta.description}
                    </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white !text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#047857] transition-all shadow-md w-full md:w-auto no-underline text-base"
                    >
                        {cta.buttonText}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>
                </div>
            </div>
        </div>
    ),
    // Design 2: Compact Critical Alert Card
    (cta: any, key: number) => (
        <div key={`cta-${key}`} className="my-10 clear-both relative bg-[#171717] rounded-2xl border-l-4 border-l-red-500 border-y border-r border-[#262626] shadow-md overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center p-6 sm:p-8 gap-6">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 bg-red-500/10 rounded-full items-center justify-center border border-red-500/20">
                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white !text-white !mt-0 leading-snug">
                        {cta.title}
                    </h3>
                    <p className="text-base text-slate-300 !text-slate-300 !mb-0 leading-relaxed font-normal">
                        {cta.description}
                    </p>
                </div>
                <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
                    <Link
                        href="/contact"
                        className="inline-block flex items-center justify-center bg-red-600 text-white !text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-sm w-full no-underline text-sm uppercase tracking-wider"
                    >
                        {cta.buttonText}
                    </Link>
                </div>
            </div>
        </div>
    )
];

export default function BlogPostContent({ blog }: BlogPostContentProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const featuredImage = blog.featuredImage || blog.images?.[0] || null;

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
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[var(--color-text-secondary)] mb-8 text-sm sm:text-base">
                                {blog.author && (
                                    <>
                                        <span className="font-medium text-[var(--color-text-primary)]">{blog.author}</span>
                                        <span>•</span>
                                    </>
                                )}
                                <time dateTime={blog.createdAt}>
                                    {formatDate(blog.createdAt)}
                                </time>
                                {blog.readingTime && blog.readingTime > 0 && (
                                    <>
                                        <span>•</span>
                                        <span>{blog.readingTime} min read</span>
                                    </>
                                )}
                                {blog.category && (
                                    <>
                                        <span>•</span>
                                        <span className="text-[var(--color-primary)]">{blog.category}</span>
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

                        {/* Fallback for legacy monolithic blogs */}
                        {blog.content && (!blog.sections || blog.sections.length === 0) && (
                            <motion.article
                                className="prose prose-lg max-w-none"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <div
                                    className="leading-relaxed blog-content"
                                    dangerouslySetInnerHTML={{ __html: blog.content.replace(/<p>\s*<\/p>/g, '') }}
                                />
                            </motion.article>
                        )}

                        {/* Modern Block-based Rendering */}
                        {blog.sections && blog.sections.length > 0 && (
                            <motion.article
                                className="prose prose-lg max-w-none"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                {/* Native Key Takeaways Renderer */}
                                {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
                                    <div className="bg-[var(--color-surface-200)] p-6 sm:p-8 rounded-2xl border-l-4 border-[var(--color-primary)] mb-10 shadow-sm clear-both">
                                        <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--color-text-primary)] !mt-0">Key Takeaways</h3>
                                        <ul className="space-y-2 mb-0">
                                            {blog.keyTakeaways.map((pt: string, idx: number) => (
                                                <li key={idx} className="text-[var(--color-text-secondary)] leading-relaxed">
                                                    {pt}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {(() => {
                                    let ctaRenderCount = 0;

                                    return blog.sections.map((section, index) => {
                                        const isRight = index % 2 === 0;
                                        const floatClass = isRight ? 'sm:float-right sm:ml-8' : 'sm:float-left sm:mr-8';

                                        let ctaComponent = null;
                                        const midPoint = Math.floor((blog.sections?.length || 0) / 2);
                                        const shouldShowCta = ctaRenderCount < 2 && (section.insertCtaAfter || index === midPoint || (index === 0 && blog.sections!.length < 3));

                                        if (shouldShowCta) {
                                            const designIndex = ctaRenderCount;
                                            ctaComponent = CTA_DESIGNS[designIndex](CTA_CONTENT[designIndex], index);
                                            ctaRenderCount++;
                                        }

                                        return (
                                            <div key={index} className="mb-10">
                                                {section.heading && <h2 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)] mt-12 clear-both">{section.heading}</h2>}

                                                {section.image && (
                                                    <figure className={`mb-6 mt-2 ${floatClass} w-full sm:w-[45%] lg:w-[40%] clear-none rounded-xl overflow-hidden shadow-[var(--shadow-lg)] border border-[var(--color-border)]`} style={{ display: 'block' }}>
                                                        <Image
                                                            src={section.image}
                                                            alt={section.heading || 'Blog image'}
                                                            width={600}
                                                            height={600}
                                                            className="w-full h-auto !m-0 aspect-square object-cover"
                                                        />
                                                    </figure>
                                                )}

                                                <div
                                                    className="leading-relaxed blog-content"
                                                    style={{ fontSize: '1.125rem', lineHeight: '1.75' }}
                                                    dangerouslySetInnerHTML={{ __html: section.content }}
                                                />

                                                {/* Injected Unique CTA Banner */}
                                                {ctaComponent}
                                            </div>
                                        );
                                    });
                                })()}

                                {/* FAQs Rendering */}
                                {blog.faqs && blog.faqs.length > 0 && (
                                    <div className="mt-16 pt-12 border-t border-[var(--color-border)] clear-both">
                                        <h2 className="text-3xl font-bold mb-8 text-[var(--color-text-primary)] mt-0">Frequently Asked Questions</h2>
                                        <div className="space-y-6">
                                            {blog.faqs.map((faq, index) => (
                                                <div key={index} className="bg-[var(--color-surface-100)] rounded-xl p-6 border border-[var(--color-border)]">
                                                    <h3 className="text-xl font-semibold mb-3 text-[var(--color-text-primary)] !mt-0">{faq.question}</h3>
                                                    <p className="text-[var(--color-text-secondary)] !mb-0">{faq.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.article>
                        )}

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

            {/* Override Quill's inline color styles in dark mode */}
            <style jsx global>{`
                .blog-content {
                    display: flow-root;
                }
                .blog-content p,
                .blog-content span,
                .blog-content li,
                .blog-content h1,
                .blog-content h2,
                .blog-content h3,
                .blog-content h4,
                .blog-content h5,
                .blog-content h6,
                .blog-content div,
                .blog-content strong,
                .blog-content em,
                .blog-content u,
                .blog-content blockquote {
                    color: var(--color-text-primary) !important;
                }
                .blog-content a {
                    color: var(--color-primary) !important;
                }
                .blog-content blockquote {
                    border-left: 4px solid var(--color-primary);
                    padding-left: 1rem;
                    opacity: 0.85;
                }
                @media (max-width: 640px) {
                    .blog-content figure {
                        float: none !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        margin: 1.5rem 0 !important;
                    }
                }
                .blog-content img {
                    border-radius: 0.75rem !important;
                    margin: 1.5rem 0;
                    width: 100%;
                    height: auto;
                }
                .blog-content figure img {
                    margin: 0 !important;
                }
                .blog-content pre,
                .blog-content code {
                    background: var(--color-surface-200) !important;
                    color: var(--color-text-primary) !important;
                    border-radius: 0.5rem;
                    padding: 0.2em 0.4em;
                }
                .blog-content pre {
                    padding: 1rem;
                }
                .blog-content p {
                    margin-bottom: 1.5rem;
                }
                .blog-content h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-top: 2.5rem;
                    margin-bottom: 1rem;
                }
                .blog-content h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                }
                .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .blog-content li {
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </div>
    );
}
