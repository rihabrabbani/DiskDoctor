import fs from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.openaiapikey
});

const SERVICES_PATH = 'src/data/allServices.ts';
const LOCATIONS_PATH = 'src/data/locations.ts';

function extractObjects(filePath, arrayName) {
    const content = fs.readFileSync(filePath, 'utf8');
    const arrayStartPattern = `export const ${arrayName}:`;
    const startIdxMarker = content.indexOf(arrayStartPattern);
    if (startIdxMarker === -1) return null;

    const equalsIdx = content.indexOf('=', startIdxMarker);
    const arrayStart = content.indexOf('[', equalsIdx);
    const arrayEnd = content.lastIndexOf(']');
    
    if (arrayStart === -1 || arrayEnd === -1) return null;

    const prefix = content.slice(0, arrayStart + 1);
    const suffix = content.slice(arrayEnd);
    const arrayContent = content.slice(arrayStart + 1, arrayEnd);

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
    return { prefix, objects: objects.filter(o => o.trim().length > 10), suffix };
}

function updateProperty(objStr, propName, newValue, isArray = false) {
    // If it should be a string but came as an array, join it
    if (!isArray && Array.isArray(newValue)) {
        newValue = newValue.join(' ');
    }

    if (isArray) {
        // The pattern matches propertyName: [ ... ]
        const pattern = new RegExp(`(${propName}:\\s*\\[)[\\s\\S]*?(\\],?)`, 'm');
        // JSON.stringify(newValue) produces [ ... ], so we slice off the brackets to avoid double-nesting
        let replacement = JSON.stringify(newValue, null, 2);
        if (replacement.startsWith('[') && replacement.endsWith(']')) {
            replacement = replacement.slice(1, -1);
        }
        return objStr.replace(pattern, `$1\n${replacement}\n$2`);
    } else {
        const pattern = new RegExp(`(${propName}:\\s*)(['"])([\\s\\S]*?)\\2`, 'm');
        return objStr.replace(pattern, `$1${JSON.stringify(newValue)}`);
    }
}

async function enhanceService(serviceObj) {
    const titleMatch = serviceObj.match(/title:\s*['"](.*?)['"],?\n/);
    const title = titleMatch ? titleMatch[1] : 'Unknown Service';
    
    console.log(`Enhancing Service: ${title}...`);
    if (title === 'Unknown Service') return serviceObj;

    const prompt = `
    Service Page Content Optimization for SEO.
    Service: ${title}
    
    Provide unique content VARIATIONS for:
    - description (A single string, 2-3 sentences)
    - detailedFeatures (Array of 3 objects {title, description, icon})
    - detailedBenefits (Array of 3 objects {title, description, metric})
    - faq (Array of 2 objects {question, answer})
    
    Return JSON format only. Ensure description is a STRING.
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
    });

    const data = JSON.parse(response.choices[0].message.content);
    
    let updated = serviceObj;
    if (data.description) updated = updateProperty(updated, 'description', data.description);
    if (data.detailedFeatures) updated = updateProperty(updated, 'detailedFeatures', data.detailedFeatures, true);
    if (data.detailedBenefits) updated = updateProperty(updated, 'detailedBenefits', data.detailedBenefits, true);
    if (data.faq) updated = updateProperty(updated, 'faq', data.faq, true);

    return updated;
}

async function enhanceLocation(locationObj) {
    const fullNameMatch = locationObj.match(/fullName:\s*['"](.*?)['"],?\n/);
    const fullName = fullNameMatch ? fullNameMatch[1] : 'Unknown Location';

    console.log(`Enhancing Location: ${fullName}...`);
    if (fullName === 'Unknown Location') return locationObj;

    const prompt = `
    Location Page Content Optimization for SEO.
    Location: ${fullName}
    
    Provide unique variations for:
    - heroDescription (A single string, 2 sentences with local landmarks)
    - metaDescription (A single string, 155-160 chars)
    
    Return JSON format only. Ensure all fields are STRINGS.
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
    });

    const data = JSON.parse(response.choices[0].message.content);
    
    let updated = locationObj;
    if (data.heroDescription) updated = updateProperty(updated, 'heroDescription', data.heroDescription);
    if (data.metaDescription) updated = updateProperty(updated, 'metaDescription', data.metaDescription);

    return updated;
}

async function run(batchSize = 1, offset = 0) {
    console.log(`Processing batch size ${batchSize} from offset ${offset}...`);
    
    const sData = extractObjects(SERVICES_PATH, 'allServices');
    if (sData) {
        for (let i = offset; i < Math.min(offset + batchSize, sData.objects.length); i++) {
            sData.objects[i] = await enhanceService(sData.objects[i]);
        }
        fs.writeFileSync(SERVICES_PATH, sData.prefix + sData.objects.join('') + sData.suffix);
        console.log("Services Saved.");
    }

    const lData = extractObjects(LOCATIONS_PATH, 'locations');
    if (lData) {
        for (let i = offset; i < Math.min(offset + batchSize, lData.objects.length); i++) {
            lData.objects[i] = await enhanceLocation(lData.objects[i]);
        }
        fs.writeFileSync(LOCATIONS_PATH, lData.prefix + lData.objects.join('') + lData.suffix);
        console.log("Locations Saved.");
    }
}

const b = parseInt(process.argv[2] || 1);
const o = parseInt(process.argv[3] || 0);
run(b, o).catch(console.error);
