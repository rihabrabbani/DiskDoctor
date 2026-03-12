import { NextRequest, NextResponse } from 'next/server';
import { getAISettings, saveAISettings, testConnection } from '@/lib/openai';

export async function GET(request: NextRequest) {
    try {
        const settings = await getAISettings();
        if (!settings) {
            return NextResponse.json({
                success: true,
                settings: {
                    apiKey: '',
                    model: 'gpt-4o',
                    imageModel: 'dall-e-3',
                }
            });
        }
        return NextResponse.json({
            success: true,
            settings: {
                apiKey: settings.apiKey,
                model: settings.model || 'gpt-4o',
                imageModel: settings.imageModel || 'dall-e-3',
            }
        });
    } catch (error) {
        console.error('Error fetching AI settings:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { apiKey, model, imageModel } = body;

        if (!apiKey) {
            return NextResponse.json({ success: false, message: 'API Key is required' }, { status: 400 });
        }

        // Test the API key
        const isValid = await testConnection(apiKey);
        if (!isValid) {
            return NextResponse.json({ success: false, message: 'Invalid OpenAI API Key' }, { status: 401 });
        }

        // Save settings
        await saveAISettings({ apiKey, model, imageModel });

        return NextResponse.json({
            success: true,
            message: 'AI settings saved successfully'
        });
    } catch (error) {
        console.error('Error saving AI settings:', error);
        return NextResponse.json({ success: false, message: 'Failed to save settings' }, { status: 500 });
    }
}
