const {series, src, dest, parallel, watch} = require('gulp');

const buildHTML = (content, layout) => {
    return layout.replace(`<main></main>`, `<main>${content}</main>`)
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
        buildHTML(markdownHtml, layout), {
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
        .pipe(dest('build/'))
};

const buildHTMLTaskRunner = () => {
    const through = require('through2');
    return src('src/**/*.html')
        .pipe(through.obj(buildHTMLPipeline))
        .pipe(dest('build/'));
};

const cleanTaskRunner = () => {
    const clean = require('gulp-clean');
    return src('build')
        .pipe(clean());
};

const copyAssetsRunner = () => {
    return src('assets/*')
        .pipe(dest('build/'));
};

exports.build = series(
    cleanTaskRunner,
    parallel(buildMarkdownTaskRunner, buildHTMLTaskRunner),
    copyAssetsRunner
);

exports.watch = () => {
    watch(['src/**/*.html', 'src/**/*.md'], exports.build)
};
