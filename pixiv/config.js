const path = require('path')
module.exports = {
    fetchUrl:'http://www.pixiv.net/ranking.php?format=json&mode=daily&p=1',
    // fetchUrl:'	http://www.pixiv.net/ranking.php?format=json&mode=daily_r18&p=1',
    login:{
            pixivId: "879493403@qq.com",   //登录名
            password: "441462",             //密码
    },
    headers:{
        'Referer':"http://www.pixiv.net", // 直接下载图片需要加上referer
        'User-Agent':"Mozilla/5.0 (Windows NT 6.3; rv:27.0) Gecko/20100101 Firefox/27.0",
    },
    error:{
        getImgUrlError:'获取图片地址失败'
    },
    urlSaveDir:path.resolve('//tmpDir'),
    imgSaveDir:path.resolve('//tmpImg'),
    singleSaveDir:path.resolve('//tmpImg//p站id'),
    fetchWord:'エミリア 1000users入り'//艾米莉亚
    // fetchWord:'とある1000users入り'//炮姐
    // fetchWord:'レム 100users入り' //雷姆
    //  fetchWord:'アスナ 1000users入り'//亚斯娜
    //  fetchWord:'時崎狂三 100users入り'
    //  fetchWord:'冴えない彼女の育てかた100users入り'//路人女主
    //  fetchWord:'霞ヶ丘詩羽 100users入り'
    //  fetchWord:'黒タイツ 100users入り'
    //  fetchWord:'艦これ1000users入り'
    //  fetchWord:'そらのおとしもの 100users入り'
    //  fetchWord:'约会大作战'
    //  fetchWord:'小林さんちのメイドラゴン 100users入り'
}