import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { uploadImageToDB } from '@/lib/storage';
import { v4 as uuidv4 } from 'uuid';

// Helper function to extract our local image URLs from HTML content
const extractLocalImageUrls = (htmlContent: string) => {
  const urls: string[] = [];
  const imgRegex = /<img[^>]+src="([^"]*\/api\/images\/[^"]*)"[^>]*>/g;
  let match;
  
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
};
import { generateUniqueSlug, calculateReadingTime, calculateWordCount } from '@/lib/slugify';
import { DEFAULT_AUTHOR, BLOG_CATEGORIES } from '@/lib/types';

// GET - Get all blogs (with optional status filtering)
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const admin = searchParams.get('admin');

    // Build query filter
    let query: any = {};

    if (status) {
      // Specific status filter
      query.status = status;
    } else if (!admin) {
      // Public requests: only show published blogs
      query.status = 'published';
    }
    // If admin=true, show all statuses (no filter)

    const blogs = await blogsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching blogs'
    }, { status: 500 });
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const sectionsRaw = formData.get('sections') as string;
    const faqsRaw = formData.get('faqs') as string;
    const keyTakeawaysRaw = formData.get('keyTakeaways') as string;
    const excerpt = formData.get('excerpt') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const focusKeyword = formData.get('focusKeyword') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    const featuredImage = formData.get('featuredImage') as string;
    const status = (formData.get('status') as string) || 'draft';
    const scheduledAt = formData.get('scheduledAt') as string;
    const customSlug = formData.get('slug') as string;
    const images = formData.getAll('images') as File[];

    if (!title || !sectionsRaw) {
      return NextResponse.json({
        success: false,
        message: 'Title and content sections are required',
      }, { status: 400 });
    }

    let parsedSections = [];
    let parsedFaqs = [];
    let parsedKeyTakeaways = [];
    try {
        parsedSections = JSON.parse(sectionsRaw || '[]');
        parsedFaqs = JSON.parse(faqsRaw || '[]');
        parsedKeyTakeaways = JSON.parse(keyTakeawaysRaw || '[]');
    } catch(e) {
        console.error("Error parsing abstract JSON arrays:", e);
    }
    
    // Concatenate all text to generate an accurate word count and excerpt 
    const fullTextContent = parsedSections.map((s: any) => `${s.heading} ${s.content}`).join(' ');

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);

    // Generate unique slug
    const slug = customSlug
      ? customSlug.toLowerCase().replace(/[^a-z0-9-]/g, '')
      : await generateUniqueSlug(title, blogsCollection);

    let uploadedImages: string[] = [];

    // Extract existing local URLs from content
    const existingImageUrls = extractLocalImageUrls(fullTextContent);
    uploadedImages.push(...existingImageUrls);

    // Upload additional images to MongoDB
    if (images && images.length > 0) {
      for (const image of images) {
        if (image instanceof File && image.size > 0) {
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          const filename = `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

          const imageUrl = await uploadImageToDB(buffer, image.type, filename);
          uploadedImages.push(imageUrl);
        }
      }
    }

    // Auto-generate excerpt if not provided
    const autoExcerpt = excerpt?.trim() ||
      fullTextContent.replace(/<[^>]*>/g, '').substring(0, 150).trim() + '...';

    // Auto-generate meta description if not provided
    const autoMetaDescription = metaDescription?.trim() ||
      fullTextContent.replace(/<[^>]*>/g, '').substring(0, 155).trim() + '...';

    const newBlog = {
      id: uuidv4(),
      slug,
      title: title.trim(),
      sections: parsedSections,
      faqs: parsedFaqs,
      keyTakeaways: parsedKeyTakeaways,
      excerpt: autoExcerpt,
      metaDescription: autoMetaDescription,
      focusKeyword: focusKeyword?.trim() || '',
      author: author?.trim() || DEFAULT_AUTHOR,
      category: category?.trim() || 'Data Recovery',
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()).filter(Boolean) : [],
      featuredImage: featuredImage?.trim() || uploadedImages[0] || null,
      images: [...new Set(uploadedImages)],
      status: status as 'draft' | 'published' | 'scheduled',
      scheduledAt: status === 'scheduled' && scheduledAt ? scheduledAt : null,
      readingTime: calculateReadingTime(fullTextContent),
      wordCount: calculateWordCount(fullTextContent),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await blogsCollection.insertOne(newBlog);

    if (result.acknowledged) {
      return NextResponse.json({
        success: true,
        blog: newBlog,
        message: 'Blog created successfully',
      }, { status: 201 });
    } else {
      throw new Error('Failed to insert blog');
    }
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({
      success: false,
      message: 'Error creating blog',
    }, { status: 500 });
  }
}
