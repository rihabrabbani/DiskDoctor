/**
 * Blog post type definitions and constants.
 */

export interface BlogSection {
    id?: string;
    heading: string;
    content: string;
    image?: string | null;
    imagePrompt?: string;
    insertCtaAfter?: boolean;
}

export interface BlogFAQ {
    id?: string;
    question: string;
    answer: string;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    sections: BlogSection[];
    faqs: BlogFAQ[];
    keyTakeaways?: string[];
    metaDescription: string;
    focusKeyword: string;
    author: string;
    category: string;
    tags: string[];
    featuredImage: string | null;
    images: string[];
    status: BlogStatus;
    scheduledAt: string | null;
    readingTime: number;
    wordCount: number;
    createdAt: string;
    updatedAt: string;
}

export type BlogStatus = 'draft' | 'published' | 'scheduled';

export const BLOG_CATEGORIES = [
    'Data Recovery',
    'Tips & Guides',
    'Technology',
    'Business',
    'News',
    'Case Studies',
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

export const DEFAULT_AUTHOR = 'DiskDoctor Team';

// ─── AI Blog Generation Types ───

export interface AISettings {
    type: 'ai_config';
    provider: 'openai';
    apiKey: string;
    model: string;
    imageModel: string;
    updatedAt: string;
}

export interface AIGenerateRequest {
    mode: 'guided' | 'magic';
    topic?: string;
    notes?: string;
    targetWordCount?: number;
}

export interface AIGenerateResponse {
    title: string;
    excerpt: string;
    sections: BlogSection[];
    faqs: BlogFAQ[];
    keyTakeaways?: string[];
    metaDescription: string;
    focusKeyword: string;
    category: string;
    tags: string[];
    featuredImage: string;
}
