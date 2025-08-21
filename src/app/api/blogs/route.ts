import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { uploadToCloudinary, extractCloudinaryUrls } from '@/lib/cloudinary';
import { v4 as uuidv4 } from 'uuid';

// GET - Get all blogs
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);
    
    const blogs = await blogsCollection
      .find({})
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
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const tags = formData.get('tags') as string;
    const images = formData.getAll('images') as File[];

    if (!title || !content) {
      return NextResponse.json({
        success: false,
        message: 'Title and content are required',
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);

    let uploadedImages: string[] = [];
    
    // Extract existing Cloudinary URLs from content (images added via editor)
    const existingCloudinaryUrls = extractCloudinaryUrls(content);
    uploadedImages.push(...existingCloudinaryUrls);

    // Upload additional images to Cloudinary (from file input)
    if (images && images.length > 0) {
      for (const image of images) {
        if (image instanceof File && image.size > 0) {
          const bytes = await image.arrayBuffer();
          const buffer = Buffer.from(bytes);
          
          const cloudinaryResponse = await uploadToCloudinary(buffer, {
            public_id: `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          }) as any;

          uploadedImages.push(cloudinaryResponse.secure_url);
        }
      }
    }

    const newBlog = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      images: [...new Set(uploadedImages)], // Remove duplicates
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
