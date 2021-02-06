const {src} = require('gulp');
const {extractMarkdownToJSONPipeline} = require('./extractMarkdownToJSONPipeline.js');
const {streamToString} = require('./utils.js');

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

exports.buildAggregatedJSONPipeline = buildAggregatedJSONPipeline;
