import { NextResponse } from 'next/server';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';

/**
 * Cron endpoint for scheduled publishing.
 * Finds blogs with status "scheduled" where scheduledAt <= now,
 * and updates their status to "published".
 * 
 * Call this via external cron (cron-job.org) or Vercel Cron every 5 minutes:
 * GET /api/blogs/publish-scheduled
 */
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const blogsCollection = db.collection(COLLECTION_NAME);

        const now = new Date().toISOString();

        // Find all scheduled posts that should be published now
        const result = await blogsCollection.updateMany(
            {
                status: 'scheduled',
                scheduledAt: { $lte: now }
            },
            {
                $set: {
                    status: 'published',
                    updatedAt: now
                }
            }
        );

        return NextResponse.json({
            success: true,
            publishedCount: result.modifiedCount,
            message: `Published ${result.modifiedCount} scheduled post(s)`
        });
    } catch (error) {
        console.error('Error publishing scheduled posts:', error);
        return NextResponse.json({
            success: false,
            message: 'Error publishing scheduled posts'
        }, { status: 500 });
    }
}
