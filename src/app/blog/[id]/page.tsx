import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { blogPostSchema, breadcrumbSchema } from '@/lib/structuredData';
import BlogPostContent from './BlogPostContent';

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

// Helper to fetch blog from MongoDB directly (server-side)
// Looks up by slug first, then falls back to UUID id
async function getBlog(identifier: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);

    // Try slug first
    let blog = await blogsCollection.findOne({ slug: identifier });

    // Fall back to UUID id
    if (!blog) {
      blog = await blogsCollection.findOne({ id: identifier });
    }

    if (!blog) return null;

    // Convert MongoDB document to plain object
    return {
      id: blog.id,
      slug: blog.slug || blog.id,
      title: blog.title,
      content: blog.content,
      sections: blog.sections || [],
      faqs: blog.faqs || [],
      keyTakeaways: blog.keyTakeaways || [],
      excerpt: blog.excerpt,
      metaDescription: blog.metaDescription || blog.excerpt,
      focusKeyword: blog.focusKeyword || '',
      author: blog.author || 'DiskDoctor Team',
      category: blog.category || '',
      tags: blog.tags || [],
      featuredImage: blog.featuredImage || null,
      images: blog.images || [],
      status: blog.status || 'published',
      readingTime: blog.readingTime || 0,
      wordCount: blog.wordCount || 0,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt || blog.createdAt,
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Generate metadata server-side
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: 'Blog Post Not Found | DiskDoctor Data Recovery',
      description: 'The requested blog post was not found. Browse our data recovery blog for expert tips and insights.',
    };
  }

  const seoTitle = `${blog.title} | DiskDoctor Data Recovery Blog`;
  const seoDescription = (blog.metaDescription || blog.excerpt).length > 155
    ? (blog.metaDescription || blog.excerpt).substring(0, 152) + '...'
    : (blog.metaDescription || blog.excerpt);

  const keywords = [
    ...(blog.focusKeyword ? [blog.focusKeyword] : []),
    ...blog.tags,
    'data recovery',
    'hard drive recovery',
    'SSD recovery',
    'disk doctor',
  ].join(', ');

  const featuredImage = blog.featuredImage || blog.images?.[0] || 'https://www.diskdoctorsamerica.com/images/og-blog.jpg';
  const canonicalUrl = `https://www.diskdoctorsamerica.com/blog/${blog.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords,
    authors: [{ name: blog.author }],
    creator: blog.author,
    publisher: "DiskDoctor Data Recovery",
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: 'article',
      url: canonicalUrl,
      siteName: 'DiskDoctor Data Recovery',
      locale: 'en_US',
      publishedTime: blog.createdAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.author],
      tags: blog.tags,
      images: [{
        url: featuredImage,
        width: 1200,
        height: 630,
        alt: blog.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@diskdoctor',
      creator: '@diskdoctor',
      title: seoTitle,
      description: seoDescription,
      images: [featuredImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true, follow: true,
        'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1,
      },
    },
  };
}

// Server Component — blog content is in the initial HTML for crawlers
export default async function BlogPost({ params }: BlogPostProps) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  // Only show published posts publicly
  if (blog.status !== 'published') {
    notFound();
  }

  // If accessed via old UUID and slug exists, redirect to slug URL
  if (blog.slug && id !== blog.slug && id === blog.id) {
    redirect(`/blog/${blog.slug}`);
  }

  // Breadcrumb data
  const breadcrumbData = [
    { name: 'Home', url: 'https://www.diskdoctorsamerica.com' },
    { name: 'Blog', url: 'https://www.diskdoctorsamerica.com/blog' },
    { name: blog.title, url: `https://www.diskdoctorsamerica.com/blog/${blog.slug}` }
  ];

  return (
    <>
      {/* BlogPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema(blog))
        }}
      />
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(breadcrumbData))
        }}
      />
      <BlogPostContent blog={blog} />
    </>
  );
}
