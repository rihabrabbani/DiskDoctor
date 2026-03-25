import { NextResponse } from 'next/server';
import clientPromise, { DB_NAME } from '@/lib/mongodb';

const AI_LOGS_COLLECTION = 'ai_logs';

export async function GET(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db(DB_NAME);
        const logsCollection = db.collection(AI_LOGS_COLLECTION);

        // Fetch logs sorted by timestamp descending
        const logs = await logsCollection.find({}).sort({ timestamp: -1 }).limit(100).toArray();

        // Calculate Aggregated Metrics
        let totalCost = 0;
        let successCount = 0;
        let failCount = 0;
        let totalPromptTokens = 0;
        let totalCompletionTokens = 0;
        let totalImages = 0;

        const enrichedLogs = logs.map(log => {
            let logCost = 0;

            // 1. Text Cost Calculation
            const pTokens = log.promptTokens || 0;
            const cTokens = log.completionTokens || 0;
            totalPromptTokens += pTokens;
            totalCompletionTokens += cTokens;

            if (log.model === 'gpt-4o') {
                logCost += (pTokens / 1_000_000) * 2.50; // $2.50 / 1M input
                logCost += (cTokens / 1_000_000) * 10.00; // $10.00 / 1M output
            } else if (log.model === 'gpt-4o-mini') {
                logCost += (pTokens / 1_000_000) * 0.150; // $0.15 / 1M input
                logCost += (cTokens / 1_000_000) * 0.600; // $0.60 / 1M output
            } else {
                // Fallback estimate
                logCost += ((pTokens + cTokens) / 1_000_000) * 10.00;
            }

            // 2. Image Cost Calculation
            const imgCount = log.imageCount || 0;
            totalImages += imgCount;

            const imgInputTokens = log.imageInputTokens || 0;
            const imgOutputTokens = log.imageOutputTokens || 0;

            if (imgOutputTokens > 0) {
                // Token-based pricing (gpt-image models log actual tokens)
                if (log.imageModel === 'gpt-image-1-mini') {
                    logCost += (imgInputTokens / 1_000_000) * 0.15;  // $0.15 / 1M text input
                    logCost += (imgOutputTokens / 1_000_000) * 40.00; // $40.00 / 1M image output
                } else if (log.imageModel === 'gpt-image-1') {
                    logCost += (imgInputTokens / 1_000_000) * 5.00;  // $5.00 / 1M text input
                    logCost += (imgOutputTokens / 1_000_000) * 40.00; // $40.00 / 1M image output
                } else {
                    // Fallback token-based estimate
                    logCost += (imgInputTokens / 1_000_000) * 5.00;
                    logCost += (imgOutputTokens / 1_000_000) * 40.00;
                }
            } else {
                // Legacy per-image pricing (DALL-E logs without token data)
                if (log.imageModel === 'dall-e-3') {
                    logCost += imgCount * 0.080;
                } else if (log.imageModel === 'dall-e-2') {
                    logCost += imgCount * 0.020; 
                } else {
                    logCost += imgCount * 0.040;
                }
            }

            totalCost += logCost;

            if (log.status === 'success') {
                successCount++;
            } else {
                failCount++;
            }

            return {
                ...log,
                _id: log._id.toString(),
                calculatedCost: Number(logCost.toFixed(4))
            };
        });

        return NextResponse.json({
            success: true,
            stats: {
                totalCost: Number(totalCost.toFixed(2)),
                successCount,
                failCount,
                totalGenerations: logs.length,
                totalPromptTokens,
                totalCompletionTokens,
                totalImages
            },
            logs: enrichedLogs
        });

    } catch (error: any) {
        console.error('Error fetching AI logs:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch analytics' }, { status: 500 });
    }
}
