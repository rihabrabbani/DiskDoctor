/**
 * One-time migration script to upgrade existing blog documents
 * with new SEO fields.
 * 
 * Run with: npx tsx scripts/migrate-blogs.ts
 * 
 * Requires MONGODB_URI environment variable to be set.
 */

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'diskdoctor';
const COLLECTION_NAME = 'blogs';

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI environment variable is required');
    process.exit(1);
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
        .substring(0, 60);
}

function calculateReadingTime(htmlContent: string): number {
    const text = htmlContent.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    return Math.max(1, Math.ceil(words.length / 200));
}

function calculateWordCount(htmlContent: string): number {
    const text = htmlContent.replace(/<[^>]*>/g, '');
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

async function migrate() {
    console.log('🔄 Starting blog migration...\n');

    const client = new MongoClient(MONGODB_URI!);
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    const blogs = await collection.find({}).toArray();
    console.log(`📝 Found ${blogs.length} blog(s) to migrate\n`);

    const usedSlugs = new Set<string>();
    let migrated = 0;

    for (const blog of blogs) {
        // Skip if already migrated
        if (blog.slug && blog.status) {
            console.log(`⏭️  Skipping "${blog.title}" (already migrated)`);
            continue;
        }

        // Generate unique slug
        let slug = slugify(blog.title || 'untitled');
        let counter = 2;
        while (usedSlugs.has(slug)) {
            slug = `${slugify(blog.title || 'untitled')}-${counter}`;
            counter++;
        }
        usedSlugs.add(slug);

        const updateData = {
            slug,
            status: 'published', // existing posts are already live
            metaDescription: blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').substring(0, 155) + '...' || '',
            focusKeyword: blog.tags?.[0] || '',
            author: 'DiskDoctor Team',
            category: 'Data Recovery',
            featuredImage: blog.images?.[0] || null,
            scheduledAt: null,
            readingTime: calculateReadingTime(blog.content || ''),
            wordCount: calculateWordCount(blog.content || ''),
        };

        await collection.updateOne(
            { _id: blog._id },
            { $set: updateData }
        );

        migrated++;
        console.log(`✅ Migrated: "${blog.title}" → /blog/${slug}`);
    }

    console.log(`\n🎉 Migration complete! ${migrated} blog(s) upgraded.\n`);

    await client.close();
}

migrate().catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exit(1);
});
