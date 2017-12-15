const request = require('request');
const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = function downloadOneImg(httpImageUrl,localImgUrl) {

    return new Promise((resolve) => {
        if(fs.existsSync(localImgUrl)) {
            console.error('图片已存在');
            resolve(true);
        }else{
            request(
                {
                    url: httpImageUrl,
                    headers: config.headers,
                },
                function (err,res,body) {
                    if(err){
                        console.log(err)
                    }else{
                        console.warn('下载成功' + httpImageUrl + '->' + localImgUrl)
                    }
                    if (!err) resolve(true)
                }).pipe(fs.createWriteStream(localImgUrl));
        }
    })
}