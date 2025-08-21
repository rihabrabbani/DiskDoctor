import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

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

    // Convert File to Buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResponse = await uploadToCloudinary(buffer, {
      public_id: `blog_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }) as any;

    return NextResponse.json({
      success: true,
      secure_url: cloudinaryResponse.secure_url,
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error uploading image' 
    }, { status: 500 });
  }
}
