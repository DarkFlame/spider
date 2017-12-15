module.exports = function replaceImgUrl(url){
    if(!url) return;
    return url.replace(/^(http:\/\/i\d.pixiv.net\/).*img-master\/(img\/.*_p0).*(\.jpg)$/g,"$1img-original/$2$3");
}