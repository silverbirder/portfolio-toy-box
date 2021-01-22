const projectId = process.env.GCP_PROJECT_ID;

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Instantiates a client
const translate = new Translate({projectId});

async function quickStart() {
    // The text to translate
    const text = '<div>Hello, world!</div>';
    const fs = require('fs');
    const html = fs.readFileSync('./docs/20201201.html', 'utf-8');

    // Translates some text into Russian
    const [translation] = await translate.translate(html, {
        format: "html",
        from: "en",
        to: "ja"
    });
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    fs.writeFileSync("./docs/20201201.ja.html", translation);
}

quickStart();
