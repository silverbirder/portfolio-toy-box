const {generateCanonicalUrl, convertMarkdownToHTML, optimizeAMP, buildHTML} = require('./utils.js');
const {extractMarkdownToJSONPipeline} = require('./extractMarkdownToJSONPipeline.js');

const buildMarkdownPipeline = async (file, enc, cb) => {
    const fs = require('fs');
    const markdownHtml = convertMarkdownToHTML(file.contents.toString());
    const filePath = file.history[0];
    const canonicalUrl = generateCanonicalUrl(filePath).replace(/\.md$/, '');
    const layout = fs.readFileSync('./templates/layout.html', 'utf-8');
    const cloneFile = Object.create(file);
    await extractMarkdownToJSONPipeline(cloneFile, enc, (_1, _2) => {
    });
    const markdownJson = JSON.parse(cloneFile.contents.toString());
    const headHtml = `<head>\n<link rel="canonical" href="${canonicalUrl}">\n<title>${markdownJson.title} - silverbirder's page</title>\n<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✍</text></svg>">\n</head>\n`;
    const html = await optimizeAMP(
        buildHTML(`${headHtml}<main>\n${markdownHtml}\n</main>`, layout), {
            markdown: true
        });
    file.contents = Buffer.from(html);
    cb(null, file)
};

exports.buildMarkdownPipeline = buildMarkdownPipeline;
