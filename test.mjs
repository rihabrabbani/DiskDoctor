import * as cheerio from 'cheerio';

async function test() {
    try {
        const res = await fetch('https://lite.duckduckgo.com/lite/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            body: `q=${encodeURIComponent('percentage of data loss in 2025')}`
        });
        const html = await res.text();
        console.log("Status:", res.status);
        if (html.includes('captcha')) {
            console.log("CAPTCHA BLOCKED");
            return;
        }
        
        const $ = cheerio.load(html);
        const results = [];
        
        $('tr').each((i, el) => {
            const resultSnippet = $(el).find('td.result-snippet').text();
            if (resultSnippet) {
                const titleAnchor = $(el).prev().find('a.result-snippet');
                results.push({
                    title: titleAnchor.text().trim(),
                    url: titleAnchor.attr('href'),
                    snippet: resultSnippet.trim()
                });
            }
        });
        console.log(results.slice(0, 2));
    } catch (e) {
        console.error(e);
    }
}
test();
