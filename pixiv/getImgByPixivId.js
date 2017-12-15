const co = require('co');
const fs = require('fs');
const path = require('path');
require('node-console-wrap')();
const config = require('./config');
const downloadOneImg = require('./lib/getImgFormServer')
const saveImgUrl = require('./lib/saveImgUrl');
const PixivAppApi = require('pixiv-app-api');
const pixiv = new PixivAppApi(config.login.pixivId,config.login.password);

let args = process.argv;

module.exports = co(function*() {
    if(!fs.existsSync(config.singleSaveDir)){
        fs.mkdirSync(config.singleSaveDir)
    }
    try {
        let pixid = String(process.env.id).trim();
        if(!pixid) throw new Error('请输入图片id,格式为 set id = 123456 && npm run getId')
        let imgSaveDir = path.join(config.imgSaveDir,`./${config.fetchWord}`);
        if (!fs.existsSync(imgSaveDir)) {
            fs.mkdirSync(imgSaveDir)
        }
        let loginRes = yield pixiv.login();
        let firstPageJson = yield pixiv.illustDetail(pixid);
        let imgUrl = firstPageJson.illust.metaSinglePage.originalImageUrl;

        console.log('finish')
        console.log(imgUrl)
        yield downloadOneImg(imgUrl,path.join(config.singleSaveDir,imgUrl.slice(-10)))
    } catch (err) {
        console.log(err)
    }

});


