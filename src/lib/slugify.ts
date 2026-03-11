/**
 * Slugify utility for generating SEO-friendly URL slugs from blog titles.
 * Handles uniqueness checks against existing slugs in the database.
 */

/**
 * Convert a string to a URL-friendly slug.
 * - Lowercases
 * - Replaces spaces and special chars with hyphens
 * - Strips non-alphanumeric characters (except hyphens)
 * - Limits to 60 chars
 * - Removes trailing hyphens
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')       // Remove non-word chars (except hyphens)
        .replace(/\-\-+/g, '-')        // Replace multiple hyphens with single
        .replace(/^-+/, '')             // Trim leading hyphens
        .replace(/-+$/, '')             // Trim trailing hyphens
        .substring(0, 60);              // Limit length for clean URLs
}

/**
 * Generate a unique slug by checking against existing slugs in the database.
 * If "my-blog-post" exists, returns "my-blog-post-2", then "my-blog-post-3", etc.
 */
export async function generateUniqueSlug(
    title: string,
    collection: any,
    existingId?: string
): Promise<string> {
    const baseSlug = slugify(title);
    let slug = baseSlug;
    let counter = 2;

    while (true) {
        const query: any = { slug };
        // If editing an existing post, exclude it from the uniqueness check
        if (existingId) {
            query.id = { $ne: existingId };
        }

        const existing = await collection.findOne(query);
        if (!existing) break;

        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}

/**
 * Calculate reading time in minutes from HTML content.
 * Average reading speed: 200 words per minute.
 */
export function calculateReadingTime(htmlContent: string): number {
    const text = htmlContent.replace(/<[^>]*>/g, ''); // Strip HTML tags
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const minutes = Math.ceil(words.length / 200);
    return Math.max(1, minutes); // Minimum 1 minute
}

/**
 * Calculate word count from HTML content.
 */
export function calculateWordCount(htmlContent: string): number {
    const text = htmlContent.replace(/<[^>]*>/g, '');
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}
