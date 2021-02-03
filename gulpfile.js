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

const generateCanonicalUrl = (filePath) => {
    const path = require('path');
    const contentPath = path
        .relative(__dirname, filePath)
        .replace(/^src\//, '');
    return `${BASE_URL}/${contentPath}`;
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
    const filePath = file.history[0];
    const canonicalUrl = generateCanonicalUrl(filePath).replace(/\.md$/, '');
    const layout = fs.readFileSync('./templates/layout.html', 'utf-8');
    const cloneFile = Object.create(file);
    await extractMarkdownToJSONPipeline(cloneFile, enc, (_1, _2) => {});
    const markdownJson = JSON.parse(cloneFile.contents.toString());
    const headHtml = `<head>\n<link rel="canonical" href="${canonicalUrl}">\n<title>${markdownJson.title} - silverbirder's page</title>\n<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✍</text></svg>">\n</head>\n`;
    const html = await optimizeAMP(
        buildHTML(`${headHtml}<main>\n${markdownHtml}\n</main>`, layout), {
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
    const jsonList = (await streamToString(
        await src(path.join(jsonDir, jsonFile.source))
            .pipe(through.obj(extractMarkdownToJSONPipeline))
    )).map((markdownJson) => {
        return JSON.parse(markdownJson.contents.toString());
    }).map((markdownJson) => {
        markdownJson['draft'] = markdownJson['draft'] === 'true';
        const d = new Date(markdownJson['date']);
        markdownJson['date'] = d;
        markdownJson['humanDate'] = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
        return markdownJson;
    }).filter((markdownJson) => {
        return markdownJson.draft === false
    }).sort((a, b) => {
        if (a.date > b.date) {
            return -1
        } else if (a.date < b.date) {
            return 1
        } else {
            return 0
        }
    });
    const fileJson = JSON.parse(file.contents.toString());
    fileJson.items = jsonList;
    file.contents = Buffer.from(JSON.stringify(fileJson));
    cb(null, file)
};

const extractMarkdownToJSONPipeline = async (file, enc, cb) => {
    const content = file.contents.toString();
    const filePath = file.history[0];
    const headRegex = new RegExp("<!--(?<content>((?!-->).*\n)*?)-->");
    const head = content.match(headRegex).groups.content.trim();
    const splitRegex = new RegExp("(?<=^[^:]+?):");
    const responseJson = {};
    head.split('\n').map((rows) => {
        const [key, value] = rows.split(splitRegex);
        responseJson[key.trim()] = value.trim();
    });
    responseJson['url'] = generateCanonicalUrl(filePath)
        .replace(/\.md$/, '');
    file.contents = Buffer.from(JSON.stringify(responseJson));
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
