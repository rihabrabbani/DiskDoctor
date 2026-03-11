import { v2 as cloudinary } from 'cloudinary';

// Cloudinary Configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dgzsfe5ci', 
  api_key: process.env.CLOUDINARY_API_KEY || '667377418472197', 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Detect MIME type from buffer magic bytes
function detectMimeType(buffer: Buffer): string {
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) return 'image/jpeg';
  if (buffer[0] === 0x89 && buffer[1] === 0x50) return 'image/png';
  if (buffer[0] === 0x47 && buffer[1] === 0x49) return 'image/gif';
  if (buffer[0] === 0x52 && buffer[1] === 0x49) return 'image/webp';
  return 'image/jpeg'; // fallback
}

// Helper function to upload image to Cloudinary
export const uploadToCloudinary = async (fileBuffer: Buffer, options: any = {}) => {
  const uploadOptions = {
    folder: 'blog_images',
    resource_type: 'auto' as const,
    ...options
  };

  // Convert buffer to data URI with correct MIME type
  const mimeType = detectMimeType(fileBuffer);
  const b64 = fileBuffer.toString('base64');
  const dataURI = `data:${mimeType};base64,${b64}`;

  try {
    // Use the Promise-based API directly (v2.x SDK)
    const result = await cloudinary.uploader.upload(dataURI, uploadOptions);
    return result;
  } catch (error: any) {
    console.error('Cloudinary upload error:', error?.message || error);
    throw error;
  }
};

// Helper function to extract Cloudinary URLs from HTML content
export const extractCloudinaryUrls = (htmlContent: string) => {
  const cloudinaryUrls: string[] = [];
  const imgRegex = /<img[^>]+src="([^"]*res\.cloudinary\.com[^"]*)"[^>]*>/g;
  let match;
  
  while ((match = imgRegex.exec(htmlContent)) !== null) {
    cloudinaryUrls.push(match[1]);
  }
  
  return cloudinaryUrls;
};

export default cloudinary;
