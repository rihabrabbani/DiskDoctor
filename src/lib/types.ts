/**
 * Blog post type definitions and constants.
 */

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
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
