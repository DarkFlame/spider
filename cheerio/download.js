const request = require('request');
const fs = require('fs');

module.exports =
    function downloadOneImg(httpImageUrl,localImgUrl) {
        return new Promise(resolve => {
            if (fs.existsSync(localImgUrl)) {
                console.error('图片已存在')
                resolve()
            } else {
                request.head(httpImageUrl,function (err,res,body) {
                //    console.log('content-type:',res.headers['content-type'])
                   // console.log('content-length:',res.headers['content-length'])
                    request(httpImageUrl,{timeout: 1500000}).pipe(fs.createWriteStream(localImgUrl)).on('close',() => {
                        console.warn('下载成功' + httpImageUrl + '->' + localImgUrl)
                        resolve()
                    })
                })
            }
        })
    }
