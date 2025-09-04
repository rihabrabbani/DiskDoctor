import { Metadata } from 'next';
import BlogPostClient from './BlogPostClient';

interface BlogPostProps {
  params: Promise<{ id: string }>;
}

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

// Generate metadata for individual blog posts
export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    // Fetch blog data for metadata
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${id}`);
    const data = await response.json();
    
    if (!data.success || !data.blog) {
      return {
        title: 'Blog Post Not Found | DiskDoctor Data Recovery',
        description: 'The requested blog post was not found. Browse our data recovery blog for expert tips and insights.',
      };
    }

    const blog = data.blog;
    
    // SEO-optimized title (50-60 characters)
    const seoTitle = `${blog.title} | DiskDoctor Data Recovery Blog`;
    
    // SEO-optimized description (150-160 characters)
    const seoDescription = blog.excerpt.length > 150 
      ? blog.excerpt.substring(0, 147) + '...' 
      : blog.excerpt;
    
    // Enhanced keywords
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
        images: blog.image ? [
          {
            url: blog.image.url,
            width: blog.image.width || 1200,
            height: blog.image.height || 630,
            alt: blog.image.alt || blog.title,
          },
        ] : [
          {
            url: 'https://www.diskdoctorsamerica.com/images/og-blog.jpg',
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
        images: blog.image ? [blog.image.url] : ['https://www.diskdoctorsamerica.com/images/og-blog.jpg'],
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
  } catch (error) {
    return {
      title: 'Blog Post | DiskDoctor Data Recovery',
      description: 'Read expert data recovery insights and tips from DiskDoctor specialists.',
    };
  }
}
export default function BlogPost({ params }: BlogPostProps) {
  return <BlogPostClient params={params} />;
}
