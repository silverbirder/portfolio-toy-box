const {BASE_URL} = require('../variables.js');

const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(chunks));
    })
};

const generateCanonicalUrl = (filePath) => {
    const path = require('path');
    const contentPath = path
        .relative(__dirname, filePath)
        .replace(/^\.\.\/\.\.\/\.\.\/src\//, '');
    return `${BASE_URL}/${contentPath}`;
};

const convertMarkdownToHTML = (markdownContent) => {
    const markdown = require('markdown-it');
    return markdown({
        html: true,
    }).render(markdownContent);
};

const optimizeAMP = async (html, options, transformOptions) => {
    const toolboxOptimizer = require('@ampproject/toolbox-optimizer');
    return toolboxOptimizer
        .create(options)
        .transformHtml(html, transformOptions);
};

const replaceMainAndHeadHTMLTag = (content, layout) => {
    const mainRegex = new RegExp("<main>(?<content>((?!<\/main).*\n)*?)<\/main>");
    const headRegex = new RegExp("<head>(?<content>((?!<\/head).*\n)*?)<\/head>");
    const matchMain = content.match(mainRegex);
    const matchHead = content.match(headRegex);
    const matchLayoutMain = layout.match(mainRegex);
    const matchLayoutHead = layout.match(headRegex);
    const main = matchMain === null ? "" : matchMain.groups.content;
    const head = matchHead === null ? "" : matchHead.groups.content;
    const layoutMain = matchLayoutMain === null ? "" : matchLayoutMain.groups.content;
    const layoutHead = matchLayoutHead === null ? "" : matchLayoutHead.groups.content;
    return layout
        .replace(mainRegex, `<main>${layoutMain}${main}</main>`)
        .replace(headRegex, `<head>${layoutHead}${head}</head>`)
};

const replaceHeaderHTMLTag = (content) => {
    const replacer = (match, startHeaderNumber, value, endHeaderNumber) => {
        const normalizedValue = value
            .toLowerCase()
            .replace(/[^a-z0-9+]+/gi, '_')
            .replace(/^_/, '');
        const anchorIcon = '#'.repeat(parseInt(startHeaderNumber));
        const anchorTag = `<a class="anchor" aria-label="Anchor" data-anchor-icon="${anchorIcon}" href="#${normalizedValue}"></a>`;
        return `<h${startHeaderNumber} id="${normalizedValue}">${anchorTag}${value}</h${endHeaderNumber}>`;
    };

    return content.replace(/<h([1-9])>((?!<\/h[1-9]).+)<\/h([1-9])>/gi, replacer);
};

const replaceBaseURL = (content) => {
    return content.replace(/BASE_URL/g, BASE_URL);
};

const replaceCanonicalURL = (content, canonicalUrl) => {
    return content.replace(/CANONICAL_URL/g, canonicalUrl);
};

const buildHTML = (content, layout, canonicalUrl) => {
    return replaceCanonicalURL(
        replaceBaseURL(
            replaceHeaderHTMLTag(
                replaceMainAndHeadHTMLTag(content, layout)
            )
        ), canonicalUrl
    )
};

module.exports = {
    streamToString,
    generateCanonicalUrl,
    convertMarkdownToHTML,
    optimizeAMP,
    buildHTML
};
