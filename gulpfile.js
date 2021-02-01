const {series, src, dest, parallel, watch} = require('gulp');
const DIST_FOLDER_NAME = "docs";
const BASE_URL = process.env.BASE_URL || "";

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

const buildHTML = (content, layout) => {
    return replaceBaseURL(
        replaceHeaderHTMLTag(
            replaceMainAndHeadHTMLTag(content, layout)
        )
    );
};

const optimizeAMP = async (html, options) => {
    const toolboxOptimizer = require('@ampproject/toolbox-optimizer');
    return toolboxOptimizer
        .create(options)
        .transformHtml(html, {});
};

const convertMarkdownToHTML = (markdownContent) => {
    const markdown = require('markdown-it');
    const hljs = require('highlight.js');

    const html = markdown({
        html: true,
    }).render(markdownContent);

    const decodeHTML = (str) => {
        return str
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, '\'')
            .replace(/&#044;/g, ',')
            .replace(/&amp;/g, '&');
    };

    const replacer = (match, p1, p2, p3, p4, p5) => {
        return p1 + hljs.highlightAuto(decodeHTML(p3)).value + p5;
    };

    return html.replace(/(<code( class="[^"]+")?>)(((?!<\/code).*\n)*?)(<\/code>)/gi, replacer);
};

const buildHTMLPipeline = async (file, enc, cb) => {
    const fs = require('fs');
    const layout = fs.readFileSync('./templates/layout.html', 'utf-8');
    const html = await optimizeAMP(
        buildHTML(file.contents.toString(), layout),
        {}
    );
    file.contents = Buffer.from(html);
    cb(null, file)
};

const buildMarkdownPipeline = async (file, enc, cb) => {
    const fs = require('fs');
    const markdownHtml = convertMarkdownToHTML(file.contents.toString());
    const layout = fs.readFileSync('./templates/layout.html', 'utf-8');
    const html = await optimizeAMP(
        buildHTML(`<main>${markdownHtml}</main>`, layout), {
            markdown: true
        });
    file.contents = Buffer.from(html);
    cb(null, file)
};

const streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(chunks));
    })
};

const buildAggregatedJSONPipeline = async (file, enc, cb) => {
    const path = require('path');
    const through = require('through2');
    const filePath = file.history[0];
    const jsonDir = path.dirname(`${filePath}`);
    const jsonFile = JSON.parse(file.contents.toString());
    const jsonList = await streamToString(
        await src(path.join(jsonDir, jsonFile.source))
            .pipe(through.obj(extractMarkdownToJSONPipeline))
    );
    cb(null, file)
};

const extractMarkdownToJSONPipeline = async (file, enc, cb) => {
    const content = file.contents.toString();
    const headRegex = new RegExp("<!--(?<content>((?!-->).*\n)*?)-->");
    const head = content.match(headRegex).groups.content.trim();
    head.split('\n').map((rows) => {

    });
    file.contents = Buffer.from(JSON.stringify({a: 1}));
    cb(null, file)
};

const buildMarkdownTaskRunner = () => {
    const rename = require('gulp-rename');
    const through = require('through2');
    return src('src/**/*.md')
        .pipe(through.obj(buildMarkdownPipeline))
        .pipe(rename({extname: '.html'}))
        .pipe(dest(`${DIST_FOLDER_NAME}/`))
};

const buildHTMLTaskRunner = () => {
    const through = require('through2');
    return src('src/**/*.html')
        .pipe(through.obj(buildHTMLPipeline))
        .pipe(dest(`${DIST_FOLDER_NAME}/`));
};

const buildAggregatedJSONTaskRunner = () => {
    const through = require('through2');
    return src('src/**/*.json')
        .pipe(through.obj(buildAggregatedJSONPipeline))
        .pipe(dest(`${DIST_FOLDER_NAME}/`));
};

const cleanTaskRunner = () => {
    const del = require('del');
    return del([
        `${DIST_FOLDER_NAME}`
    ]);
};

const copyAssetsRunner = () => {
    return src('assets/*')
        .pipe(dest(`${DIST_FOLDER_NAME}/`));
};

exports.build = series(
    cleanTaskRunner,
    parallel(
        buildMarkdownTaskRunner,
        buildHTMLTaskRunner,
        buildAggregatedJSONTaskRunner
    ),
    copyAssetsRunner
);

exports.watch = () => {
    watch([
        'src/**/*.html',
        'src/**/*.md',
        'templates/*',
        'assets/*'
    ], exports.build)
};
