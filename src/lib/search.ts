export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
}

/**
 * Performs a web search using the Tavily Search API.
 * Falls back to Wikipedia if no Tavily key is provided.
 *
 * Tavily docs: https://docs.tavily.com/documentation/api-reference/endpoint/search
 * Cost: 1 API credit per request when using search_depth: "basic".
 */
export async function performWebSearch(
    tavilyApiKey: string,
    query: string,
    limit: number = 5
): Promise<SearchResult[]> {
    // Tavily path (preferred)
    if (tavilyApiKey) {
        try {
            const response = await fetch('https://api.tavily.com/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tavilyApiKey}`
                },
                body: JSON.stringify({
                    query,
                    search_depth: 'basic',
                    include_answer: true,
                    max_results: limit,
                    topic: 'general'
                })
            });

            if (response.ok) {
                const data = await response.json();
                const results: SearchResult[] = [];

                if (Array.isArray(data.results)) {
                    data.results.forEach((item: any) => {
                        if (item?.url && item?.content) {
                            results.push({
                                title: item.title || item.url,
                                url: item.url,
                                snippet: item.content
                            });
                        }
                    });
                }

                console.log(`[Tavily] Got ${results.length} results for: "${query}"`);
                return results;
            }

            const errText = await response.text();
            console.error(`[Tavily] Search failed (${response.status}): ${errText}`);
        } catch (error) {
            console.error('[Tavily] Search error:', error);
        }
    }

    // Wikipedia fallback
    try {
        console.warn('[Search] Falling back to Wikipedia API.');
        const fetchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=${limit}`;

        const response = await fetch(fetchUrl, {
            headers: {
                'User-Agent': 'DiskDoctorBot/2.0 (diskdoctorsamerica.com)'
            }
        });

        if (!response.ok) {
            console.error(`Wikipedia search failed with status: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const results: SearchResult[] = [];

        if (data.query && data.query.search) {
            data.query.search.forEach((item: any) => {
                const cleanSnippet = item.snippet.replace(/<[^>]*>?/gm, '');
                results.push({
                    title: item.title,
                    url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
                    snippet: cleanSnippet.trim()
                });
            });
        }

        return results;
    } catch (error) {
        console.error('Error during fallback search:', error);
        return [];
    }
}
