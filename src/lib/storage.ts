import { GridFSBucket, ObjectId } from 'mongodb';
import clientPromise, { DB_NAME } from './mongodb';

export const IMAGE_BUCKET_NAME = 'images';

/**
 * Upload an image buffer to MongoDB GridFS.
 * Returns the URL of the uploaded image to be used in src tags.
 */
export async function uploadImageToDB(buffer: Buffer, mimeType: string, filename: string): Promise<string> {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const bucket = new GridFSBucket(db, { bucketName: IMAGE_BUCKET_NAME });

    return new Promise((resolve, reject) => {
        const uploadStream = bucket.openUploadStream(filename, {
            contentType: mimeType,
        });

        uploadStream.on('error', (error) => {
            console.error('GridFS Upload Error:', error);
            reject(error);
        });

        uploadStream.on('finish', () => {
            // Return a local URL that will be served by our Next.js API route
            resolve(`/api/images/${uploadStream.id}`);
        });

        uploadStream.end(buffer);
    });
}

/**
 * Retrieve an image stream from MongoDB GridFS by ID.
 */
export async function getImageStreamFromDB(id: string) {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const bucket = new GridFSBucket(db, { bucketName: IMAGE_BUCKET_NAME });

    let objectId;
    try {
        objectId = new ObjectId(id);
    } catch (e) {
        throw new Error('Invalid image ID');
    }

    // Check if file exists first to avoid crashing the stream
    const files = await bucket.find({ _id: objectId }).toArray();
    if (files.length === 0) {
        throw new Error('Image not found');
    }

    const contentType = files[0].contentType || 'application/octet-stream';
    const downloadStream = bucket.openDownloadStream(objectId);

    return { stream: downloadStream, contentType };
}
