export interface SearchResult {
    title: string;
    url: string;
    snippet: string;
}

/**
 * Performs a factual web search using the public Wikipedia API.
 * This does not require an API key, has no bot-protection blocks, and is safe for Vercel Edge.
 */
export async function performWebSearch(query: string, limit: number = 3): Promise<SearchResult[]> {
    try {
        const fetchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=&format=json&srlimit=${limit}`;
        
        const response = await fetch(fetchUrl, {
            headers: {
                'User-Agent': 'DiskDoctorBot/1.0 (diskdoctorsamerica.com)'
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
                // Strip HTML from Wikipedia snippets (they use <span class="searchmatch">)
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
        console.error('Error during Wikipedia search:', error);
        return [];
    }
}
