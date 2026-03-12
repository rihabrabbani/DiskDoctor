const googleIt = require('google-it');

async function test() {
    try {
        console.log("Testing google-it...");
        const results = await googleIt({ query: 'percentage of data loss in 2025', disableConsole: true });
        console.log(results.slice(0, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
