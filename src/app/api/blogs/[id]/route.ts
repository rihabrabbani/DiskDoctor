import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';
import { uploadToCloudinary, extractCloudinaryUrls } from '@/lib/cloudinary';
import cloudinary from '@/lib/cloudinary';

// GET - Get specific blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);
    
    const { id } = await params;
    const blog = await blogsCollection.findOne({ id });
    
    if (!blog) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching blog'
    }, { status: 500 });
  }
}

// PUT - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
        message: 'Title and content are required'
      }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);
    
    // Find existing blog
    const { id } = await params;
    const existingBlog = await blogsCollection.findOne({ id });
    if (!existingBlog) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }

    let uploadedImages: string[] = [];
    
    // Extract existing Cloudinary URLs from content
    const existingCloudinaryUrls = extractCloudinaryUrls(content);
    uploadedImages.push(...existingCloudinaryUrls);

    // Upload new additional images
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
    
    // Prepare update data
    const updateData = {
      title: title.trim(),
      content: content.trim(),
      excerpt: excerpt?.trim() || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      images: [...new Set(uploadedImages)], // Remove duplicates
      updatedAt: new Date().toISOString()
    };
    
    const result = await blogsCollection.updateOne(
      { id },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }
    
    // Get updated blog
    const updatedBlog = await blogsCollection.findOne({ id });
    
    return NextResponse.json({
      success: true,
      blog: updatedBlog,
      message: 'Blog updated successfully'
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({
      success: false,
      message: 'Error updating blog'
    }, { status: 500 });
  }
}

// DELETE - Delete blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);
    
    // Find the blog first to get image info
    const { id } = await params;
    const blog = await blogsCollection.findOne({ id });
    
    if (!blog) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }
    
    // Delete associated images from Cloudinary
    if (blog.images && Array.isArray(blog.images)) {
      for (const imageUrl of blog.images) {
        try {
          // Extract public_id from Cloudinary URL
          const publicIdMatch = imageUrl.match(/\/v\d+\/(.+)\./);
          if (publicIdMatch) {
            const publicId = publicIdMatch[1];
            await cloudinary.uploader.destroy(publicId);
          }
        } catch (err) {
          console.error('Error deleting image from Cloudinary:', err);
        }
      }
    }
    
    // Delete blog from database
    const result = await blogsCollection.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Blog not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({
      success: false,
      message: 'Error deleting blog'
    }, { status: 500 });
  }
}
