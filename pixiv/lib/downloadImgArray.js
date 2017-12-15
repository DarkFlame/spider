const request = require('request');
const path = require('path');
const fs = require('fs');
const os = require('os');
const co = require('co');
const moment = require('moment');
const config = require('../config');
const downloadOneImg = require('./getImgFormServer');


let readParseUrlFile = function (urlPath,imgDir) {
    return new Promise((resolve) => {
        fs.createReadStream(urlPath)
            .on('data',(chunk) => {
                let imageUrlList = String(chunk).split(os.EOL);
                for (let [index,imageUrl] of imageUrlList.entries()) {
                    if (!imageUrl) continue;
                    console.info(`正在下载第${index + 1}张图片`);
                    downloadOneImg(imageUrl,path.join(imgDir,imageUrl.slice(-10)))
                }
            }).on('end',() => {
            resolve();
        })
    })
}


module.exports = co.wrap(function *(urlDir) {
    let imgDir = path.join(config.imgSaveDir,`./${moment().format('YYYY-MM-DD')}`);
    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir)
    }
    let dirNameList = fs.readdirSync(urlDir);
    for (let dirNameItem of dirNameList) {
        yield readParseUrlFile(path.join(urlDir,dirNameItem),imgDir)
    }

});

