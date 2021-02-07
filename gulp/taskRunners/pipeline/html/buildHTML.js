const {BASE_URL} = require('../../variables.js');
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

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
    // const dom1 = new JSDOM(content);
    // const dom2 = new JSDOM(layout);
    // const list = dom1.window.document.querySelectorAll('h1,h2,h3,h4,h5,h6');
    // Array.prototype.forEach.call(list, (item) => {
    //     item.innerText = "TEXT!";
    // });
    // console.log(dom2.window.document.querySelector('script[type="application/ld+json"]').innerHTML);
    return replaceCanonicalURL(
        replaceBaseURL(
            replaceHeaderHTMLTag(
                replaceMainAndHeadHTMLTag(content, layout)
            )
        ), canonicalUrl
    )
};

exports.buildHTML = buildHTML;
