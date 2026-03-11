'use client';

import { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'quill/dist/quill.snow.css';

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill-new');
        return forwardRef<any, any>((props, ref) => <RQ {...props} ref={ref} />);
    },
    { ssr: false }
);

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
    content: string;
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
    const quillRef = useRef<any>(null);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<string | null>(null);
    const [uploadingFeatured, setUploadingFeatured] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [seoOpen, setSeoOpen] = useState(true);
    const [featuredOpen, setFeaturedOpen] = useState(true);
    const [categoryOpen, setCategoryOpen] = useState(true);
    const [authorOpen, setAuthorOpen] = useState(false);

    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        content: '',
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

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        }
    }, [router]);

    // Auto-generate slug from title
    useEffect(() => {
        if (formData.title && !formData.slug) {
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

    const quillModules = {
        toolbar: {
            container: [
                [{ header: [2, 3, 4, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ indent: '-1' }, { indent: '+1' }],
                ['link', 'image'],
                ['clean'],
            ],
            handlers: {
                image: imageHandler,
            },
        },
        clipboard: { matchVisual: false },
    };

    const quillFormats = [
        'header', 'bold', 'italic', 'underline', 'strike',
        'color', 'background', 'align', 'blockquote', 'code-block',
        'list', 'indent', 'link', 'image',
    ];

    async function imageHandler() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
                setUploadProgress(30);
                try {
                    const fd = new FormData();
                    fd.append('image', file);
                    const response = await fetch('/api/upload', { method: 'POST', body: fd });
                    setUploadProgress(80);
                    if (!response.ok) throw new Error('Failed to upload image');
                    const data = await response.json();
                    const quill = quillRef.current?.getEditor();
                    if (quill) {
                        const range = quill.getSelection();
                        quill.insertEmbed(range ? range.index : 0, 'image', data.secure_url);
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

    const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingFeatured(true);
        try {
            const fd = new FormData();
            fd.append('image', file);
            const response = await fetch('/api/upload', { method: 'POST', body: fd });
            if (!response.ok) throw new Error('Failed to upload image');
            const data = await response.json();
            setFormData(prev => ({ ...prev, featuredImage: data.secure_url }));
        } catch (error) {
            console.error('Error uploading featured image:', error);
            alert('Failed to upload featured image.');
        } finally {
            setUploadingFeatured(false);
        }
    };

    const handleSave = async (publishStatus?: 'draft' | 'published' | 'scheduled') => {
        const status = publishStatus || formData.status;

        if (!formData.title.trim() || !formData.content.trim()) {
            alert('Please fill in the title and content.');
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
            submitData.append('content', formData.content);
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

            const response = await fetch('/api/blogs', {
                method: 'POST',
                body: submitData,
            });

            const data = await response.json();
            if (data.success) {
                setLastSaved(new Date().toLocaleTimeString());
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

                    {/* Rich Text Editor */}
                    <div className="editor-wrapper" style={{ minHeight: '500px' }}>
                        <ReactQuill
                            ref={quillRef}
                            value={formData.content}
                            onChange={(value: any) => setFormData(prev => ({ ...prev, content: value }))}
                            modules={quillModules}
                            formats={quillFormats}
                            className="bg-[var(--color-surface-100)] rounded-xl"
                            placeholder="Start writing your blog post..."
                            style={{ minHeight: '450px' }}
                        />
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
                                        onChange={(e) => setFormData(prev => ({ ...prev, scheduledAt: e.target.value }))}
                                        className="w-full px-3 py-2 border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                                    />
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
                                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') }))}
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

            {/* Editor Styles */}
            <style jsx global>{`
        .editor-wrapper .ql-container {
          min-height: 450px;
          font-size: 1.1rem;
          line-height: 1.8;
          border: none;
          border-radius: 0 0 0.75rem 0.75rem;
        }
        .editor-wrapper .ql-toolbar {
          border: none;
          border-bottom: 1px solid var(--color-border);
          border-radius: 0.75rem 0.75rem 0 0;
          background: var(--color-surface-200);
          position: sticky;
          top: 57px;
          z-index: 10;
        }
        .editor-wrapper .ql-editor {
          min-height: 450px;
          padding: 2rem;
          color: var(--color-text-primary);
        }
        .editor-wrapper .ql-editor.ql-blank::before {
          color: var(--color-text-tertiary);
          font-style: normal;
        }
        .editor-wrapper .ql-toolbar .ql-stroke {
          stroke: var(--color-text-secondary);
        }
        .editor-wrapper .ql-toolbar .ql-fill {
          fill: var(--color-text-secondary);
        }
        .editor-wrapper .ql-toolbar .ql-picker-label {
          color: var(--color-text-secondary);
        }
        .editor-wrapper .ql-toolbar button:hover .ql-stroke {
          stroke: var(--color-primary);
        }
        .editor-wrapper .ql-toolbar button:hover .ql-fill {
          fill: var(--color-primary);
        }
        .editor-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: var(--color-primary);
        }
        .editor-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: var(--color-primary);
        }
      `}</style>
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
        if (data.content.toLowerCase().includes(data.focusKeyword.toLowerCase())) score++; // Keyword in content
    }
    if (data.metaDescription.length >= 120 && data.metaDescription.length <= 160) score++; // Good meta desc length
    return score;
}
