const request = require('request');
const co = require('co');
require('node-console-wrap')();
const config = require('./config');
const saveImgUrl = require('./lib/saveImgUrl');
const replaceImgUrl = require('./lib/replaceImgUrl');




module.exports = co.wrap(function*() {
    try{

        let body = yield new Promise((resolve) => {
            request({
                url: config.fetchUrl
            },function (err,res,body) {
                resolve(body)
            });
        });
        let result = JSON.parse(body)

        if(!result || !result.contents){
            throw new Error(config.error.getImgUrlError)
            return
        }

        yield saveImgUrl(result.contents.map(item=>replaceImgUrl(item.url)))

    }catch(err){
        console.log(err)
    }

});


