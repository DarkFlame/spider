const cheerio = require('cheerio')
const axios = require('axios')
const path = require('path')
const downloadImg = require('./download')
let imgSaveDir = 'E:\\tmpImg\\emilia4';

function getData(url) {
    return axios.get(
        url || "https://wall.alphacoders.com/tags.php?tid=47990&lang=Chinese&page=3"
    ).then(({data}) => {
        return data;
    })
}

function getNameAndExt(url) {
    url = url || 'https://initiate.alphacoders.com/download/wallpaper/692362/images/jpg/1931019150'
    let res = url.match(/wallpaper\/(\d+).*\/([^\/]+)\/(\d+)$/)
    return {
        ext: `.${res[2]}`,
        name: res[1] + res[3]
    }
}

async function main() {
   // let baseUrl = "https://wall.alphacoders.com/tags.php?tid=47990&lang=Chinese&page=";
   // let baseUrl = "https://wall.alphacoders.com/by_sub_category.php?id=240059&name="
   //   + "%E5%91%BD%E8%BF%90%2F%E5%A4%96%E5%85%B8+%E5%A3%81%E7%BA%B8&lang=Chinese&page=";
   let baseUrl ='https://wall.alphacoders.com/by_sub_category.php?id=240281&name=' +
       '%E4%B8%BA%E7%BE%8E%E5%A5%BD%E7%9A%84%E4%B8%96%E7%95%8C%E7' +
       '%8C%AE%E4%B8%8A%E7%A5%9D%E7%A6%8F+%E5%A3%81%E7%BA%B8&lang=Chinese&page='
    // let baseUrl = "https://wall.alphacoders.com/by_sub_category.php?id=174340&name" +
    //     "=%E5%91%BD%E8%BF%90%E4%B9%8B%E5%A4%9C%E5%89%8D%E4%BC%A0+%E5%A3%81%E7%BA%B8&lang=Chinese&page=";
    for (let i = 1; i < 200; i++) {
        try {
            let data = await getData(baseUrl + i)
            if (!data) continue
            console.log(baseUrl + i)
            const $ = cheerio.load(data)
            let buttonArr = $('.btn.btn-primary.download-button')
            let array = []
            for (let j = 0; j < buttonArr.length; j++) {
                let imageUrl = $(buttonArr[j]).attr('data-href');
                console.log(imageUrl)
                if (imageUrl) {
                    let {name,ext} = getNameAndExt(imageUrl)
                    let realPath = path.join(imgSaveDir,`${name + ext}`)
                    console.log(realPath)
                    await  downloadImg(imageUrl,realPath)
                    console.log('donwload finish---------')
                }
            }
        } catch (err) {
            console.log(err)
            continue
        }
    }


}

main()
// getNameAndExt()
