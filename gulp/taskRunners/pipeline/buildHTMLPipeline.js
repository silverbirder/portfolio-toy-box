const {optimizeAMP, buildHTML} = require('./utils.js');

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

exports.buildHTMLPipeline = buildHTMLPipeline;
