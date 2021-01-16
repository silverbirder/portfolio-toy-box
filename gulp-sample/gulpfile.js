const { series, parallel } = require('gulp');
const hljs = require('highlight.js');
const markdown = require('markdown-it');
const toolboxOptimizer = require('@ampproject/toolbox-optimizer');
const fs = require('fs').promises;

function clean(cb) {
    // body omitted
    cb();
}

async function top(cb) {
    const top = await fs.readFile('./components/top.html', 'utf-8');
    const layout = await fs.readFile('./templates/layout.html', 'utf-8');
    const html = layout.replace(`<main></main>`, `<main>${top}</main>`);
    const opHtml = await toolboxOptimizer
        .create({})
        .transformHtml(
            html, {}
        );
    await fs.writeFile('./build/index.html', opHtml);
    cb();
}

function decodeHTML(str) {
    return str
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, '\'')
        .replace(/&#044;/g, ',')
        .replace(/&amp;/g, '&');
}

async function blog(cb) {
    const blogMarkdown = await fs.readFile('./components/blog/sample.md', 'utf-8');
    const blog = markdown({
        html: true,
    }).render(blogMarkdown);

    function replacer(match, p1, p2, p3, p4, p5) {
        return p1 + hljs.highlightAuto(decodeHTML(p3)).value + p5;
    }
    const hlBlogHtml = blog.replace(/(<code( class="[^"]+")?>)(((?!<\/code).*\n)*?)(<\/code>)/gi, replacer);

    const layout = await fs.readFile('./templates/layout.html', 'utf-8');
    const html = layout.replace(`<main></main>`, `<main>${hlBlogHtml}</main>`);
    const opHtml = await toolboxOptimizer
        .create({
            markdown: true
        })
        .transformHtml(
            html, {}
        );
    await fs.writeFile('./build/blog.html', opHtml);
    cb();
}

exports.build = series(clean, parallel(top, blog));
