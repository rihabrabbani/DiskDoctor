import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { blogPostSchema, breadcrumbSchema } from '@/lib/structuredData';
import BlogPostContent from './BlogPostContent';

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

// Helper to fetch blog from MongoDB directly (server-side)
async function getBlog(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);
    const blog = await blogsCollection.findOne({ id });
    
    if (!blog) return null;
    
    // Convert MongoDB document to plain object (strip _id ObjectId)
    return {
      id: blog.id,
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt,
      tags: blog.tags || [],
      images: blog.images || [],
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt || blog.createdAt,
    };
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

// Generate metadata server-side (no API fetch needed)
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
  const seoDescription = blog.excerpt.length > 150
    ? blog.excerpt.substring(0, 147) + '...'
    : blog.excerpt;

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

  const featuredImage = blog.images?.[0] || 'https://www.diskdoctorsamerica.com/images/og-blog.jpg';

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
      images: [
        {
          url: featuredImage,
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
      images: [featuredImage],
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
}

// Server Component — blog content is in the initial HTML for crawlers
export default async function BlogPost({ params }: BlogPostProps) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  // Breadcrumb data
  const breadcrumbData = [
    { name: 'Home', url: 'https://www.diskdoctorsamerica.com' },
    { name: 'Blog', url: 'https://www.diskdoctorsamerica.com/blog' },
    { name: blog.title, url: `https://www.diskdoctorsamerica.com/blog/${blog.id}` }
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
