import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ 
        success: false, 
        message: 'No file uploaded' 
      }, { status: 400 });
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json({ 
        success: false, 
        message: 'File must be an image' 
      }, { status: 400 });
    }

    // Validate file size (10MB max)
    if (image.size > 10 * 1024 * 1024) {
      return NextResponse.json({ 
        success: false, 
        message: 'File size must be less than 10MB' 
      }, { status: 400 });
    }

    // Convert File to Buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResponse = await uploadToCloudinary(buffer, {
      public_id: `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    });

    return NextResponse.json({
      success: true,
      secure_url: (cloudinaryResponse as any).secure_url,
    });
  } catch (error: any) {
    console.error('Error uploading image:', error?.message || error);
    return NextResponse.json({ 
      success: false, 
      message: error?.message || 'Error uploading image'
    }, { status: 500 });
  }
}
