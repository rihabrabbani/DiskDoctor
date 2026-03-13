'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
    'Data Recovery',
    'Tips & Guides',
    'Technology',
    'Business',
    'News',
    'Case Studies',
];

interface BlogFormData {
    title: string;
    sections: { heading: string; content: string; imagePrompt?: string; image?: string; id?: string }[];
    faqs: { question: string; answer: string; id?: string }[];
    keyTakeaways: string[];
    excerpt: string;
    metaDescription: string;
    focusKeyword: string;
    author: string;
    category: string;
    tags: string;
    slug: string;
    featuredImage: string;
    status: 'draft' | 'published' | 'scheduled';
    scheduledAt: string;
}

export default function BlogEditorPage() {
    const router = useRouter();
    const slugTouched = useRef(false);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [uploadingFeatured, setUploadingFeatured] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    const [seoOpen, setSeoOpen] = useState(true);
    const [featuredOpen, setFeaturedOpen] = useState(true);
    const [categoryOpen, setCategoryOpen] = useState(true);
    const [authorOpen, setAuthorOpen] = useState(false);

    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        sections: [{ heading: '', content: '' }],
        faqs: [],
        keyTakeaways: [],
        excerpt: '',
        metaDescription: '',
        focusKeyword: '',
        author: 'DiskDoctor Team',
        category: 'Data Recovery',
        tags: '',
        slug: '',
        featuredImage: '',
        status: 'draft',
        scheduledAt: '',
    });

    const [isAIGenerated, setIsAIGenerated] = useState(false);
    const [editingDraftId, setEditingDraftId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
            return;
        }

        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const draftId = params.get('id');

            // New flow: load auto-saved AI draft directly from database
            if (draftId) {
                fetch(`/api/blogs/${draftId}`)
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.success && data.blog) {
                            const blog = data.blog;
                            setFormData(prev => ({
                                ...prev,
                                title: blog.title || prev.title,
                                sections: blog.sections && blog.sections.length > 0 ? blog.sections : prev.sections,
                                faqs: blog.faqs || prev.faqs,
                                keyTakeaways: blog.keyTakeaways || prev.keyTakeaways,
                                excerpt: blog.excerpt || prev.excerpt,
                                metaDescription: blog.metaDescription || prev.metaDescription,
                                focusKeyword: blog.focusKeyword || prev.focusKeyword,
                                category: blog.category || prev.category,
                                tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : prev.tags,
                                slug: blog.slug || prev.slug,
                                featuredImage: blog.featuredImage || prev.featuredImage,
                                status: blog.status || prev.status,
                                scheduledAt: blog.scheduledAt || prev.scheduledAt,
                            }));
                            slugTouched.current = !!blog.slug;
                            setIsAIGenerated(true);
                            setEditingDraftId(draftId);
                        } else {
                            console.error('Failed to load AI draft by id:', draftId);
                        }
                    })
                    .catch((e) => {
                        console.error('Failed to fetch AI draft:', e);
                    })
                    .finally(() => setIsInitialized(true));

                return;
            }

            // Legacy flow: sessionStorage payload fallback
            if (window.location.search.includes('ai=true')) {
                const aiData = sessionStorage.getItem('aiGeneratedBlog');
                if (aiData) {
                    try {
                        const parsed = JSON.parse(aiData);
                        setFormData(prev => ({
                            ...prev,
                            title: parsed.title || prev.title,
                            sections: parsed.sections && parsed.sections.length > 0 ? parsed.sections : prev.sections,
                            faqs: parsed.faqs || prev.faqs,
                            keyTakeaways: parsed.keyTakeaways || prev.keyTakeaways,
                            excerpt: parsed.excerpt || prev.excerpt,
                            metaDescription: parsed.metaDescription || prev.metaDescription,
                            focusKeyword: parsed.focusKeyword || prev.focusKeyword,
                            category: parsed.category || prev.category,
                            tags: parsed.tags ? parsed.tags.join(', ') : prev.tags,
                            slug: parsed.slug || prev.slug,
                            featuredImage: parsed.featuredImage || prev.featuredImage,
                        }));
                        slugTouched.current = !!parsed.slug;
                        setIsAIGenerated(true);
                        sessionStorage.removeItem('aiGeneratedBlog');
                    } catch (e) {
                        console.error('Failed to parse AI data:', e);
                    }
                }
            }
        }
        setIsInitialized(true);
    }, [router]);

    // Auto-generate slug from title (only if user hasn't manually edited it)
    useEffect(() => {
        if (formData.title && !slugTouched.current) {
            const autoSlug = formData.title
                .toLowerCase()
                .trim()
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '')
                .substring(0, 60);
            setFormData(prev => ({ ...prev, slug: autoSlug }));
        }
    }, [formData.title]);

    // Helper functions to manage the dynamic arrays
    const addSection = () => setFormData(prev => ({ ...prev, sections: [...prev.sections, { heading: '', content: '' }] }));
    const updateSection = (index: number, field: string, value: string) => {
        const newSections = [...formData.sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setFormData(prev => ({ ...prev, sections: newSections }));
    };
    const removeSection = (index: number) => {
        const newSections = formData.sections.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const addFAQ = () => setFormData(prev => ({ ...prev, faqs: [...prev.faqs, { question: '', answer: '' }] }));
    const updateFAQ = (index: number, field: string, value: string) => {
        const newFaqs = [...formData.faqs];
        newFaqs[index] = { ...newFaqs[index], [field]: value };
        setFormData(prev => ({ ...prev, faqs: newFaqs }));
    };
    const removeFAQ = (index: number) => {
        const newFaqs = formData.faqs.filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, faqs: newFaqs }));
    };

    const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingFeatured(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const response = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Failed to upload image');
            }
            setFormData(prev => ({ ...prev, featuredImage: data.secure_url }));
        } catch (error: any) {
            console.error('Error uploading featured image:', error);
            alert(`Failed to upload featured image: ${error.message}`);
        } finally {
            setUploadingFeatured(false);
        }
    };

    const handleSave = async (publishStatus?: 'draft' | 'published' | 'scheduled') => {
        const status = publishStatus || formData.status;

        if (!formData.title.trim() || formData.sections.length === 0 || !formData.sections[0].heading.trim()) {
            alert('Please fill in the title and at least one section heading.');
            return;
        }

        if (status === 'scheduled' && !formData.scheduledAt) {
            alert('Please select a scheduled date and time.');
            return;
        }

        setSaving(true);
        try {
            const submitData = new FormData();
            submitData.append('title', formData.title.trim());
            submitData.append('sections', JSON.stringify(formData.sections));
            submitData.append('faqs', JSON.stringify(formData.faqs));
            submitData.append('keyTakeaways', JSON.stringify(formData.keyTakeaways));
            submitData.append('excerpt', formData.excerpt.trim());
            submitData.append('metaDescription', formData.metaDescription.trim());
            submitData.append('focusKeyword', formData.focusKeyword.trim());
            submitData.append('author', formData.author.trim());
            submitData.append('category', formData.category);
            submitData.append('tags', formData.tags.trim());
            submitData.append('slug', formData.slug.trim());
            submitData.append('featuredImage', formData.featuredImage);
            submitData.append('status', status);
            if (formData.scheduledAt) {
                submitData.append('scheduledAt', new Date(formData.scheduledAt).toISOString());
            }

            const response = await fetch(
                editingDraftId ? `/api/blogs/${editingDraftId}` : '/api/blogs',
                {
                    method: editingDraftId ? 'PUT' : 'POST',
                    body: submitData,
                }
            );

            const data = await response.json();
            if (data.success) {
                setLastSaved(new Date().toLocaleTimeString());
                setEditingDraftId(null);
                const statusLabel = status === 'published' ? 'Published' : status === 'scheduled' ? 'Scheduled' : 'Draft saved';
                alert(`${statusLabel} successfully!`);
                router.push('/admin/dashboard');
            } else {
                throw new Error(data.message || 'Failed to save');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Error saving blog post. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const seoScore = calculateSeoScore(formData);

    if (!isInitialized) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[var(--color-text-secondary)]">Loading editor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 bg-[var(--color-surface-100)] border-b border-[var(--color-border)] px-4 sm:px-6 py-3">
                <div className="flex items-center justify-between max-w-[1600px] mx-auto">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/admin/dashboard')}
                            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Dashboard
                        </button>
                        {lastSaved && (
                            <span className="text-xs text-[var(--color-text-tertiary)] hidden sm:inline">
                                Last saved {lastSaved}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={() => handleSave('draft')}
                            disabled={saving}
                            className="px-3 sm:px-4 py-2 text-sm border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-surface-200)] transition-colors disabled:opacity-50"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={() => handleSave(formData.status === 'scheduled' ? 'scheduled' : 'published')}
                            disabled={saving}
                            className="px-3 sm:px-5 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50 font-medium"
                        >
                            {saving ? 'Saving...' : formData.status === 'scheduled' ? 'Schedule' : 'Publish'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Upload Progress */}
            {uploadProgress > 0 && (
                <div className="fixed top-[57px] left-0 right-0 z-50">
                    <div className="h-1 bg-[var(--color-surface-200)]">
                        <div
                            className="h-1 bg-[var(--color-primary)] transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* AI Generated Banner */}
            {isAIGenerated && (
                <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 sm:px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm">
                        <span>✨</span>
                        <span>AI-Generated Content — Please review, edit, and adjust formatting before publishing.</span>
                    </div>
                    <button onClick={() => setIsAIGenerated(false)} className="text-indigo-400/70 hover:text-indigo-400 text-sm font-medium">
                        Discuss
                    </button>
                </div>
            )}

            {/* Main Content */}
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row">
                {/* Editor Area */}
                <div className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8">
                    {/* Title */}
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter blog title..."
                        className="w-full text-3xl sm:text-4xl lg:text-5xl font-bold bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] mb-6"
                    />

                    {/* Excerpt */}
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Write a brief excerpt for the blog listing page..."
                        rows={2}
                        className="w-full text-lg bg-transparent border-none outline-none text-[var(--color-text-secondary)] placeholder-[var(--color-text-tertiary)] mb-8 resize-none"
                    />

                    {/* Visual Section Builder */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4 mt-8">
                            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Blog Sections</h2>
                            <button
                                onClick={addSection}
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 rounded-lg text-sm font-medium transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                Add Section
                            </button>
                        </div>
                        
                        {formData.sections.map((section, index) => (
                            <div key={index} className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-2xl p-5 sm:p-6 transition-all shadow-sm hover:shadow-md">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="inline-flex items-center space-x-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-primary)]/20 text-[var(--color-primary)] text-xs font-bold">{index + 1}</span>
                                        <span className="font-medium text-[var(--color-text-secondary)] text-sm">Section</span>
                                    </span>
                                    <button onClick={() => removeSection(index)} className="text-red-400 hover:text-red-500 hover:bg-red-400/10 p-2 rounded-lg transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={section.heading}
                                    onChange={(e) => updateSection(index, 'heading', e.target.value)}
                                    placeholder="Section Heading (e.g. Common Causes of Data Loss)"
                                    className="w-full text-xl font-bold bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] mb-4"
                                />
                                <div className="relative">
                                    <textarea
                                        value={section.content}
                                        onChange={(e) => updateSection(index, 'content', e.target.value)}
                                        placeholder="Write the paragraph content for this section. You can use standard HTML like <strong> or <ul>..."
                                        rows={6}
                                        className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-4 text-[var(--color-text-secondary)] placeholder-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-primary)]/50 focus:ring-2 focus:ring-[var(--color-primary)]/20 transition-all resize-y font-mono text-sm leading-relaxed"
                                    />
                                    {section.imagePrompt && (
                                        <div className="mt-3 p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-start gap-3">
                                            <span className="text-indigo-400 mt-0.5">📸</span>
                                            <div>
                                                <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">AI Image Prompt Attached</div>
                                                <div className="text-sm text-indigo-300/80 mt-1 italic">"{section.imagePrompt}"</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Visual FAQ Builder */}
                    <div className="space-y-4 mt-12 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Frequently Asked Questions</h2>
                            <button
                                onClick={addFAQ}
                                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-surface-200)] text-[var(--color-text-primary)] hover:bg-[var(--color-border)] rounded-lg text-sm font-medium transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                Add FAQ
                            </button>
                        </div>
                        
                        {formData.faqs.map((faq, index) => (
                            <div key={`faq_${index}`} className="bg-[var(--color-surface-100)] border border-[var(--color-border)] rounded-xl p-4 relative group">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => removeFAQ(index)} className="text-red-400 hover:text-red-500 p-1">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={faq.question}
                                    onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                    placeholder="Question..."
                                    className="w-full font-semibold bg-transparent border-none outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] mb-2 pr-8"
                                />
                                <textarea
                                    value={faq.answer}
                                    onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                    placeholder="Answer..."
                                    rows={2}
                                    className="w-full text-sm bg-transparent border-none outline-none text-[var(--color-text-secondary)] placeholder-[var(--color-text-tertiary)] resize-none"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-[360px] xl:w-[400px] lg:border-l border-t lg:border-t-0 border-[var(--color-border)] bg-[var(--color-surface-100)] lg:min-h-[calc(100vh-57px)] px-4 sm:px-6 py-6 space-y-1">

                    {/* Publish Section */}
                    <SidebarSection title="Publish" defaultOpen={true}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                    <option value="scheduled">Scheduled</option>
                                </select>
                            </div>

                            {formData.status === 'scheduled' && (
                                <div>
                                    <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">Schedule Date & Time</label>
                                    <input
                                        type="datetime-local"
                                        value={formData.scheduledAt}
                                        onChange={(e) => {
                                            // Snap to nearest 5-minute interval
                                            const val = e.target.value;
                                            if (val) {
                                                const d = new Date(val);
                                                const minutes = Math.round(d.getMinutes() / 5) * 5;
                                                d.setMinutes(minutes, 0, 0);
                                                const pad = (n: number) => String(n).padStart(2, '0');
                                                const snapped = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
                                                setFormData(prev => ({ ...prev, scheduledAt: snapped }));
                                            } else {
                                                setFormData(prev => ({ ...prev, scheduledAt: '' }));
                                            }
                                        }}
                                        step="300"
                                        min={(() => {
                                            const now = new Date();
                                            const minutes = Math.ceil(now.getMinutes() / 5) * 5;
                                            now.setMinutes(minutes, 0, 0);
                                            const pad = (n: number) => String(n).padStart(2, '0');
                                            return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
                                        })()}
                                        className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                    />
                                    <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Times are in 5-minute intervals (your local timezone). Cron checks every 5 minutes.</p>
                                </div>
                            )}

                            <div className="flex gap-2 pt-2">
                                <button
                                    onClick={() => handleSave(formData.status === 'scheduled' ? 'scheduled' : 'published')}
                                    disabled={saving}
                                    className="flex-1 px-4 py-2.5 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
                                >
                                    {saving ? 'Saving...' : formData.status === 'scheduled' ? 'Schedule' : 'Publish'}
                                </button>
                                <button
                                    onClick={() => handleSave('draft')}
                                    disabled={saving}
                                    className="px-4 py-2.5 border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-lg text-sm hover:bg-[var(--color-surface-200)] transition-colors disabled:opacity-50"
                                >
                                    Save Draft
                                </button>
                            </div>
                        </div>
                    </SidebarSection>

                    {/* SEO Section */}
                    <SidebarSection title="SEO" defaultOpen={true} badge={<SeoBadge score={seoScore} />}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">Focus Keyword</label>
                                <input
                                    type="text"
                                    value={formData.focusKeyword}
                                    onChange={(e) => setFormData(prev => ({ ...prev, focusKeyword: e.target.value }))}
                                    placeholder="e.g., hard drive recovery"
                                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">Meta Description</label>
                                <textarea
                                    value={formData.metaDescription}
                                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                                    placeholder="Write a compelling meta description for search results..."
                                    rows={3}
                                    maxLength={160}
                                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] resize-none"
                                />
                                <div className="text-right text-xs text-[var(--color-text-tertiary)] mt-1">
                                    <span className={formData.metaDescription.length > 155 ? 'text-red-400' : ''}>{formData.metaDescription.length}</span>/160
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">URL Slug</label>
                                <div className="flex items-center">
                                    <span className="text-xs text-[var(--color-text-tertiary)] mr-1">/blog/</span>
                                    <input
                                        type="text"
                                        value={formData.slug}
                                        onChange={(e) => {
                                            slugTouched.current = true;
                                            setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }));
                                        }}
                                        placeholder="your-post-slug"
                                        className="flex-1 px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                    />
                                </div>
                            </div>
                        </div>
                    </SidebarSection>

                    {/* Featured Image */}
                    <SidebarSection title="Featured Image" defaultOpen={true}>
                        {formData.featuredImage ? (
                            <div className="space-y-3">
                                <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)]">
                                    <img
                                        src={formData.featuredImage}
                                        alt="Featured"
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                                <button
                                    onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                                    className="w-full px-3 py-2 text-sm text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition-colors"
                                >
                                    Remove Image
                                </button>
                            </div>
                        ) : (
                            <label className="block cursor-pointer">
                                <div className="border-2 border-dashed border-[var(--color-border)] rounded-lg p-8 text-center hover:border-[var(--color-primary)] transition-colors">
                                    {uploadingFeatured ? (
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
                                            <span className="text-sm text-[var(--color-text-secondary)]">Uploading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <svg className="w-10 h-10 mx-auto mb-2 text-[var(--color-text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm text-[var(--color-text-secondary)]">Click to upload featured image</span>
                                            <span className="text-xs text-[var(--color-text-tertiary)] block mt-1">Recommended: 1200×630px</span>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFeaturedImageUpload}
                                    className="hidden"
                                />
                            </label>
                        )}
                    </SidebarSection>

                    {/* Categories & Tags */}
                    <SidebarSection title="Categories & Tags" defaultOpen={true}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1.5 uppercase tracking-wide">Tags</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                                    placeholder="data recovery, tips, hardware"
                                    className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                />
                                <p className="text-xs text-[var(--color-text-tertiary)] mt-1">Separate with commas</p>
                            </div>
                        </div>
                    </SidebarSection>

                    {/* Author */}
                    <SidebarSection title="Author" defaultOpen={false}>
                        <input
                            type="text"
                            value={formData.author}
                            onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                            className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                        />
                    </SidebarSection>

                </div>
            </div>
        </div>
    );
}

// --- Helper Components ---

function SidebarSection({ title, children, defaultOpen = true, badge }: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    badge?: React.ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border border-[var(--color-border)] rounded-xl overflow-hidden mb-3">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)] hover:bg-[var(--color-surface-200)] transition-colors"
            >
                <div className="flex items-center gap-2">
                    {title}
                    {badge}
                </div>
                <svg
                    className={`w-4 h-4 text-[var(--color-text-tertiary)] transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && <div className="px-4 pb-4">{children}</div>}
        </div>
    );
}

function SeoBadge({ score }: { score: number }) {
    const color = score >= 4 ? 'bg-green-500' : score >= 2 ? 'bg-yellow-500' : 'bg-red-500';
    return (
        <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} title={`SEO Score: ${score}/5`} />
    );
}

function calculateSeoScore(data: BlogFormData): number {
    let score = 0;
    if (data.focusKeyword) {
        score++; // Has focus keyword
        if (data.title.toLowerCase().includes(data.focusKeyword.toLowerCase())) score++; // Keyword in title
        if (data.metaDescription.toLowerCase().includes(data.focusKeyword.toLowerCase())) score++; // Keyword in meta desc
        const totalContent = data.sections.map(s => s.heading + ' ' + s.content).join(' ').toLowerCase();
        if (totalContent.includes(data.focusKeyword.toLowerCase())) score++; // Keyword in content
    }
    if (data.metaDescription.length >= 120 && data.metaDescription.length <= 160) score++; // Good meta desc length
    return score;
}
