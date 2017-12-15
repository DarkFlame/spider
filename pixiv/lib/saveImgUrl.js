const co = require('co');
const os = require('os');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const config = require('../config');
const downloadImg = require('./downloadImgArray');

module.exports = co.wrap(function *(imgUrlArray) {
    console.log(imgUrlArray)
    let urlDir = path.join(config.urlSaveDir,`./${moment().format('YYYY-MM-DD')}`);
    if (!fs.existsSync(urlDir)) {
        fs.mkdirSync(urlDir)
    }
    let wstream = fs.createWriteStream(path.join(urlDir ,'./url-list.log'));
    wstream.write(imgUrlArray.join(os.EOL));
    wstream.end();
    yield downloadImg(urlDir)

})