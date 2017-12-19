// const PixivAppApi = require('pixiv-app-api');
// const pixivImg = require('pixiv-img');
// const pixiv = new PixivAppApi();

// try{
//     pixiv.searchIllust('艦これ10000users入り')
//         .then(json => {
//             console.log(json);
//             console.log(`downloading ${json.illusts[0].title}`);
//             return pixivImg(json.illusts[0].image_urls.large);
//         }).then(() => {
//         console.log('finish');
//     });
// }catch (e){
//     console.log(e)
// }

function getPromise(a){
    return Promise.resolve(a)
}
function *test(){
    yield 1
    yield 11
}
Promise.all([3,4,5]).then(console.log)
Promise.race([2,3,4]).then(console.log)