import { NextRequest, NextResponse } from 'next/server';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';

// GET - Search blogs
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ query: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const blogsCollection = db.collection(COLLECTION_NAME);
    
    const { query } = await params;
    const searchQuery = decodeURIComponent(query);
    
    const blogs = await blogsCollection
      .find({
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          { content: { $regex: searchQuery, $options: 'i' } },
          { tags: { $in: [new RegExp(searchQuery, 'i')] } }
        ]
      })
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json({
      success: true,
      blogs: blogs
    });
  } catch (error) {
    console.error('Error searching blogs:', error);
    return NextResponse.json({
      success: false,
      message: 'Error searching blogs'
    }, { status: 500 });
  }
}
