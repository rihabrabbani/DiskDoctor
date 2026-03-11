import { NextResponse } from 'next/server';
import clientPromise, { DB_NAME, COLLECTION_NAME } from '@/lib/mongodb';

// CRITICAL: force-dynamic prevents Next.js/Vercel from caching this as a static page.
// Without this, the route gets pre-rendered at build time and always returns stale results.
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/**
 * Cron endpoint for scheduled publishing.
 * Finds blogs with status "scheduled" where scheduledAt <= now,
 * and updates their status to "published".
 *
 * Called every 5 minutes by cron-job.org (Vercel free tier only allows 1 cron/day).
 * GET /api/blogs/publish-scheduled
 */
export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const blogsCollection = db.collection(COLLECTION_NAME);

        const now = new Date();
        const nowISO = now.toISOString();

        // First, find all scheduled posts for debugging/logging
        const pendingPosts = await blogsCollection
            .find({ status: 'scheduled' })
            .project({ title: 1, scheduledAt: 1, _id: 0 })
            .toArray();

        console.log(`[Cron] Running publish-scheduled at ${nowISO}`);
        console.log(`[Cron] Found ${pendingPosts.length} scheduled post(s):`, 
            pendingPosts.map(p => ({ title: p.title, scheduledAt: p.scheduledAt })));

        // Find all scheduled posts that should be published now
        // Use string comparison on ISO dates (works because ISO 8601 is lexicographically sortable)
        // Also handle edge case: scheduledAt might be null or empty for corrupted data
        const result = await blogsCollection.updateMany(
            {
                status: 'scheduled',
                scheduledAt: { $ne: null, $lte: nowISO }
            },
            {
                $set: {
                    status: 'published',
                    updatedAt: nowISO
                }
            }
        );

        console.log(`[Cron] Published ${result.modifiedCount} post(s)`);

        return NextResponse.json({
            success: true,
            publishedCount: result.modifiedCount,
            checkedAt: nowISO,
            pendingScheduled: pendingPosts.length,
            message: `Published ${result.modifiedCount} scheduled post(s)`
        });
    } catch (error) {
        console.error('[Cron] Error publishing scheduled posts:', error);
        return NextResponse.json({
            success: false,
            message: 'Error publishing scheduled posts'
        }, { status: 500 });
    }
}
