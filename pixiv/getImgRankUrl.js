const co = require('co');
const fs = require('fs');
const path = require('path');
require('node-console-wrap')();
const config = require('./config');
const downloadOneImg = require('./lib/getImgFormServer')
const saveImgUrl = require('./lib/saveImgUrl');
const PixivAppApi = require('pixiv-app-api');
const pixiv = new PixivAppApi(config.login.pixivId,config.login.password);


module.exports = co.wrap(function*() {
    try {

        let loginRes = yield pixiv.login();
        let firstPageJson = yield pixiv.illustRanking(config.fetchWord)
        let imgUrlArray = firstPageJson.illusts.map(z=>z.metaSinglePage.originalImageUrl);
        for (let i = 0; i < 10; i++) {
            if(!pixiv.hasNext()) break;
            let nextPageJson = yield pixiv.next();
            imgUrlArray = [...imgUrlArray ,...nextPageJson.illusts.map(z=>z.metaSinglePage.originalImageUrl)];
        }
        console.log('finish')
        console.log(imgUrlArray)
        yield saveImgUrl(imgUrlArray)
    } catch (err) {
        console.log(err)
    }

});


