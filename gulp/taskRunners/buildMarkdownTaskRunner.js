const {src, dest} = require('gulp');
const {DIST_FOLDER_NAME} = require('./variables.js');
const {buildMarkdownPipeline} = require('./pipeline/buildMarkdownPipeline.js');

const buildMarkdownTaskRunner = () => {
    const rename = require('gulp-rename');
    const through = require('through2');
    return src('src/**/*.md')
        .pipe(through.obj(buildMarkdownPipeline))
        .pipe(rename({extname: '.html'}))
        .pipe(dest(`${DIST_FOLDER_NAME}/`))
};

exports.buildMarkdownTaskRunner = buildMarkdownTaskRunner;
