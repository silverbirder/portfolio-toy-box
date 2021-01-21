const {series, src, dest, parallel, watch} = require('gulp');
const DIST_FOLDER_NAME = "docs";
const BASE_URL = "https://silver-birder.github.io/portfolio-toy-box";

const buildHTML = (content, layout) => {
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
    const replacedLayout = layout
        .replace(mainRegex, `<main>${layoutMain}${main}</main>`)
        .replace(headRegex, `<head>${layoutHead}${head}</head>`);
    return replacedLayout.replace(/BASE_URL/g, BASE_URL);
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
    parallel(buildMarkdownTaskRunner, buildHTMLTaskRunner),
    copyAssetsRunner
);

exports.watch = () => {
    watch(['src/**/*.html', 'src/**/*.md', 'templates/*'], exports.build)
};

/* baseのURLを指定する方法がないか？ AMP Optimize, gulpどちらでも良い */
