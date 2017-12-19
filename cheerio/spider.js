const cheerio = require('cheerio')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
const querystring = require('querystring')
const downloadImg = require('./download')
let imgSaveDir
let {url,dir} = require('./config')

function parseUrl(url) {
    let {name,id} = querystring.parse(url.slice(url.indexOf('?')))
    imgSaveDir = path.resolve(dir,name)
    if (!fs.existsSync(imgSaveDir)) fs.mkdirSync(imgSaveDir)
}

async function getPages(url) {
    let data = await getData(url)
    const $ = cheerio.load(data)
    let pageButton = $('.hidden-xs.hidden-sm ul.pagination li:nth-last-child(2) a')
    return Number(pageButton.text()) || 100
}

function getData(url) {
    return axios.get(
        url
    ).then(({data}) => {
        return data
    })
}

function getNameAndExt(url) {
    let res = url.match(/wallpaper\/(\d+).*\/([^\/]+)\/(\d+)$/)
    return {
        ext: `.${res[2]}`,
        name: res[1] + res[3]
    }
}

async function main() {
    parseUrl(url)
    let pages = await getPages(url)
    for (let i = 1; i <= pages; i++) {
        try {
            let data = await getData(`${url}&page=` + i)
            if (!data) continue
            const $ = cheerio.load(data)
            let buttonArr = $('.btn.btn-primary.download-button')
            for (let j = 0; j < buttonArr.length; j++) {
                let imageUrl = $(buttonArr[j]).attr('data-href')
                if (imageUrl) {
                    let {name,ext} = getNameAndExt(imageUrl)
                    let realPath = path.join(imgSaveDir,`${name + `_page${i}_` + ext}`)
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
