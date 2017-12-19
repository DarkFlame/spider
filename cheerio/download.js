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
                    request(httpImageUrl,{timeout: 1500000}).pipe(fs.createWriteStream(localImgUrl)).on('close',() => {
                        console.warn('下载成功' + httpImageUrl + '->' + localImgUrl)
                        resolve()
                    }).on('data',(chunk)=>{
                        console.log(`正在下载。。。。。。。。。。。。。${chunk.length}`)
                    })
                })
            }
        })
    }
