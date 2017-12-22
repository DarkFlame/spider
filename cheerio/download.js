const request = require('request');
const fs = require('fs');
const ProgressBar = require('progress');

module.exports =
    function downloadOneImg(httpImageUrl,localImgUrl) {
        return new Promise((resolve,reject) => {
            if (fs.existsSync(localImgUrl)) {
                console.error('图片已存在')
                resolve()
                return
            } else {
                let bar
                request(httpImageUrl,{timeout: 1500000})
                    .on('response',(res) => {
                        let len = parseInt(res.headers['content-length'],10);

                        bar = new ProgressBar('downloading' + httpImageUrl + ' [:bar] :rate/bps :percent :etas',{
                            complete: '=',
                            incomplete: ' ',
                            width: 10,
                            total: len
                        })

                    })
                    .on('data',(chunk) => {
                        bar.tick(chunk.length)
                    })
                    .on('error',(chunk) => {
                        reject()
                        console.log(`发生错误`)
                    })
                    .pipe(fs.createWriteStream(localImgUrl)).on('close',() => {
                    console.warn('下载成功' + httpImageUrl + '->' + localImgUrl)
                    resolve()
                })
            }
        })
    }
