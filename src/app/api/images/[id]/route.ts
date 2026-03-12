import { NextRequest, NextResponse } from 'next/server';
import { getImageStreamFromDB } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    context: { params: { id?: string } | Promise<{ id?: string }> }
) {
    try {
        // Resolve the params object
        const params = await context.params;
        const id = params?.id;

        if (!id) {
            return NextResponse.json({ success: false, message: 'Image ID is required' }, { status: 400 });
        }

        const { stream, contentType } = await getImageStreamFromDB(id);

        // Convert the Node.js Readable stream into a Web Streams API ReadableStream
        const webStream = new ReadableStream({
            start(controller) {
                stream.on('data', (chunk) => {
                    controller.enqueue(chunk);
                });
                stream.on('end', () => {
                    controller.close();
                });
                stream.on('error', (error) => {
                    console.error('Stream error:', error);
                    controller.error(error);
                });
            },
            cancel() {
                stream.destroy();
            }
        });

        return new NextResponse(webStream, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
            },
        });
    } catch (error: any) {
        if (error.message === 'Image not found' || error.message === 'Invalid image ID') {
            return NextResponse.json({ success: false, message: error.message }, { status: 404 });
        }
        
        console.error('Error serving image:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
