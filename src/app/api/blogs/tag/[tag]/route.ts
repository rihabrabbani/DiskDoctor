import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';

// GET - Get blogs by tag
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tag: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);
    
    const { tag } = await params;
    const blogs = await blogsCollection
      .find({ tags: { $in: [tag] } })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs by tag:', error);
    return NextResponse.json({
      success: false,
      message: 'Error fetching blogs by tag'
    }, { status: 500 });
  }
}
