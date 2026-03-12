const cheerio = require('cheerio');

async function test() {
    const res = await fetch('https://lite.duckduckgo.com/lite/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0'
        },
        body: 'q=data+loss+statistics'
    });
    const html = await res.text();
    console.log(html.substring(0, 500));
}
test();
