const co = require('co');
const fs = require('fs');
const path = require('path');
require('node-console-wrap')();
const config = require('./config');
const downloadOneImg = require('./lib/getImgFormServer')
const PixivAppApi = require('pixiv-app-api');
const pixiv = new PixivAppApi(config.login.pixivId,config.login.password);


module.exports = co.wrap(function*() {
    try {
        let imgSaveDir = path.resolve(config.imgSaveDir,config.fetchWord);

        if (!fs.existsSync(imgSaveDir)) {
            fs.mkdirSync(imgSaveDir)
        }

        let loginRes = yield pixiv.login();
        console.log(loginRes)
        let firstPageJson = yield pixiv.searchIllust(config.fetchWord)
        let imgUrlArray = firstPageJson.illusts.map(z=>z.metaSinglePage.originalImageUrl);
        for (let i = 0; i < 100; i++) {
            if(!pixiv.hasNext()) break;
            let nextPageJson = yield pixiv.next();
            imgUrlArray = [...imgUrlArray ,...nextPageJson.illusts.map(z=>z.metaSinglePage.originalImageUrl)];
        }
        console.log('finish')
        console.log(imgUrlArray.filter(z=>z))
        for (let [index,imageUrl] of imgUrlArray.filter(z=>z).entries()) {
            try{
                if(!imageUrl) continue;
                console.info(`正在下载第${index + 1}张图片`);
                yield downloadOneImg(imageUrl,path.join(imgSaveDir,imageUrl.slice(-15)))
            }catch(err){
                console.log(err);
                continue;
            }

        }

    } catch (err) {
        console.log(err)
    }

});


