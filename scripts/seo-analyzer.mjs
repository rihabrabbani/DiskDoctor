import fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.openaiapikey
});

const SERVICES_PATH = 'src/data/allServices.ts';
const LOCATIONS_PATH = 'src/data/locations.ts';

function calculateJaccardSimilarity(setA, setB) {
    if (setA.size === 0 || setB.size === 0) return 0;
    const intersection = new Set([...setA].filter(x => setB.has(x)));
    const union = new Set([...setA, ...setB]);
    return (intersection.size / union.size) * 100;
}

function getShingles(text, size = 3) {
    const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(w => w.length > 2);
    const shingles = new Set();
    for (let i = 0; i <= words.length - size; i++) {
        shingles.add(words.slice(i, i + size).join(' '));
    }
    return shingles;
}

function extractObjects(filePath, arrayName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayStart = content.indexOf(`export const ${arrayName}`);
    if (arrayStart === -1) return [];

    const startIdx = content.indexOf('[', arrayStart);
    const endIdx = content.lastIndexOf(']');
    const arrayContent = content.slice(startIdx + 1, endIdx);

    const objects = [];
    let currentObject = '';
    let depth = 0;
    
    for (let i = 0; i < arrayContent.length; i++) {
        const char = arrayContent[i];
        if (char === '{') depth++;
        if (char === '}') depth--;
        
        currentObject += char;
        
        if (depth === 0 && currentObject.trim().length > 0) {
            if (arrayContent[i+1] === ',') {
                i++;
                currentObject += ',';
            }
            objects.push(currentObject);
            currentObject = '';
        }
    }
    return objects.filter(o => o.trim().length > 10);
}

async function checkRelevanceWithAI(itemType, name, content) {
    const prompt = `
    Analyze the following ${itemType} page content for DiskDoctor (a data recovery company).
    Name: ${name}
    Content Snippet: ${content.slice(0, 1000)}
    
    Evaluate:
    1. Relevance: Is the content actually about ${name}? (0-100)
    2. Quality: Does it sound professional and helpful? (0-100)
    3. Localization: For locations, does it mention specific local landmarks correctly? (0-100)
    
    Return JSON format only: { "relevanceScore": number, "qualityScore": number, "localizationScore": number, "feedback": "string" }
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{ role: "user", content: prompt }],
            response_format: { type: "json_object" }
        });
        return JSON.parse(response.choices[0].message.content);
    } catch (e) {
        return { relevanceScore: 0, qualityScore: 0, localizationScore: 0, feedback: "Error checking relevance: " + e.message };
    }
}

async function analyze(filePath, arrayName, nameField, itemType) {
    const rawObjects = extractObjects(filePath, arrayName);
    const items = rawObjects.map(obj => {
        const nameMatch = obj.match(new RegExp(`${nameField}:\\s*['"]([^'"]+)['"]`));
        return {
            name: nameMatch ? nameMatch[1] : 'Unknown',
            fullText: obj,
            shingles: getShingles(obj)
        };
    }).filter(i => i.name !== 'Unknown');

    const results = [];
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            const sim = calculateJaccardSimilarity(items[i].shingles, items[j].shingles);
            if (sim > 10) {
                results.push({ pA: items[i].name, pB: items[j].name, sim });
            }
        }
    }

    const uniqueness = items.map(item => {
        let totalSim = 0;
        let count = 0;
        items.forEach(other => {
            if (item === other) return;
            totalSim += calculateJaccardSimilarity(item.shingles, other.shingles);
            count++;
        });
        const avgSim = count > 0 ? totalSim / count : 0;
        return { name: item.name, score: 100 - avgSim };
    });

    console.log(`Checking relevance for ${itemType}s...`);
    const relevanceResults = [];
    // We only check a sample or the most suspicious ones to save tokens/time, or all if small enough.
    // For now, let's check a max of 5 items per category to provide a representative report.
    const sampleItems = items.slice(0, 5); 
    for (const item of sampleItems) {
        const relevance = await checkRelevanceWithAI(itemType, item.name, item.fullText);
        relevanceResults.push({ name: item.name, ...relevance });
    }

    return { results, uniqueness, relevanceResults };
}

async function run() {
    const sReport = await analyze(SERVICES_PATH, 'allServices', 'title', 'Service');
    const lReport = await analyze(LOCATIONS_PATH, 'locations', 'slug', 'Location');

    let md = '# Detailed SEO Uniqueness & Relevance Report\n\n';
    md += `Generated on: ${new Date().toLocaleString()}\n\n`;

    md += '## Service Pages Analysis\n';
    md += '| Page A | Page B | Similarity |\n|---|---|---|\n';
    sReport.results.sort((a,b) => b.sim - a.sim).forEach(r => {
        md += `| ${r.pA} | ${r.pB} | ${r.sim.toFixed(2)}% |\n`;
    });

    md += '\n### Uniqueness Scores (Services)\n';
    sReport.uniqueness.sort((a,b) => a.score - b.score).forEach(u => {
        md += `- **${u.name}**: ${u.score.toFixed(2)}/100\n`;
    });

    md += '\n### AI Relevance Analysis (Sample Services)\n';
    md += '| Service | Relevance | Quality | AI Feedback |\n|---|---|---|---|\n';
    sReport.relevanceResults.forEach(r => {
        md += `| ${r.name} | ${r.relevanceScore}% | ${r.qualityScore}% | ${r.feedback} |\n`;
    });

    md += '\n---\n';

    md += '## Location Pages Analysis\n';
    md += '| Page A | Page B | Similarity |\n|---|---|---|\n';
    lReport.results.sort((a,b) => b.sim - a.sim).forEach(r => {
        md += `| ${r.pA} | ${r.pB} | ${r.sim.toFixed(2)}% |\n`;
    });

    md += '\n### Uniqueness Scores (Locations)\n';
    lReport.uniqueness.sort((a,b) => a.score - b.score).forEach(u => {
        md += `- **${u.name}**: ${u.score.toFixed(2)}/100\n`;
    });

    md += '\n### AI Relevance Analysis (Sample Locations)\n';
    md += '| Location | Relevance | Localization | AI Feedback |\n|---|---|---|---|\n';
    lReport.relevanceResults.forEach(r => {
        md += `| ${r.name} | ${r.relevanceScore}% | ${r.localizationScore}% | ${r.feedback} |\n`;
    });

    fs.writeFileSync('seo-report.md', md);
    console.log('Updated report generated with AI relevance metrics.');
}

run().catch(console.error);
