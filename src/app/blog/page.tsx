import { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { staticBlogPosts } from '@/data/staticBlogPosts';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Data Recovery Blog',
  description:
    'Hard drive clicking, RAID failures, and phone recovery notes from the Columbia MD lab. Practical steps, not slogans.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

async function getPublishedBlogs() {
  const staticItems = staticBlogPosts.map((blog) => ({
    id: blog.id,
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    tags: blog.tags,
    category: blog.category,
    readingTime: blog.readingTime,
    featuredImage: blog.featuredImage,
    image: null as { url: string; alt: string; width: number; height: number } | null,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    content: '',
    sections: blog.sections,
  }));

  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogs = await db
      .collection(COLLECTION_NAME)
      .find({ status: 'published' })
      .sort({ createdAt: -1 })
      .toArray();

    const mongoItems = blogs.map((blog: any) => ({
      id: blog.id,
      slug: blog.slug || blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      tags: blog.tags || [],
      category: blog.category,
      readingTime: blog.readingTime,
      featuredImage: blog.featuredImage || null,
      image: blog.image || (blog.featuredImage ? { url: blog.featuredImage, alt: blog.title, width: 1200, height: 630 } : null),
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt || blog.createdAt,
      content: blog.content || '',
      sections: blog.sections || [],
    }));

    const seen = new Set(staticItems.map((b) => b.slug));
    return JSON.parse(JSON.stringify([...staticItems, ...mongoItems.filter((b) => !seen.has(b.slug))]));
  } catch {
    return staticItems;
  }
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string }>;
}) {
  const blogs = await getPublishedBlogs();
  const resolved = searchParams ? await searchParams : {};
  return <BlogPageClient initialBlogs={blogs} initialSearch={resolved.search || ''} />;
}
