const Hackathon = require('../../models/hackathonModel');
const puppeteer = require('puppeteer');

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

async function updateHackathon() {

    // let browserInstance = browserObject.startBrowser();

    // // Pass the browser instance to the scraper controller
    // scraperController(browserInstance);

    var browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const url ='https://devfolio.co/hackathons';
    var page = await browser.newPage();
    console.log(`Navigating to ${url}...`);
    await page.goto(url);
    await page.waitForSelector('.hcmcER');
    console.log("loaded");
   
    await autoScroll(page);

    let hacksLinks = await page.$$eval('.hcmcER', function(a){
        var arr1 = [];
        
        for(var i=0;i<a.length;i++)
        {
            //var n = await page.$$eval(`.kIFYmG:nth-child(${i+1})`, i => i.innerHTML);
            arr1.push( a[i].href);
        }
        return arr1;
    });
    let hacksNames = await page.$$eval('.hcmcER > span > .sc-fzqBZW', function(a){
        var arr2 = [];
        
        for(var i=0;i<a.length;i++)
        {
            //var n = await page.$$eval(`.kIFYmG:nth-child(${i+1})`, i => i.innerHTML);
            arr2.push( a[i].innerHTML);
        }
        return arr2;
    });

    let validate = await page.$$eval('.hQBLZg', function(a){
        var arr3 = [];
        
        for(var i=0;i<a.length;i++)
        {
            //var n = await page.$$eval(`.kIFYmG:nth-child(${i+1})`, i => i.innerHTML);
            arr3.push( a[i].innerHTML);

        }
        return arr3;
    });
    await browser.close();

    var hacks = [];
    for(var i=0;i<hacksLinks.length; i++)
    {
        if(validate[i] === "View submissions")
            continue;
        else
            hacks.push({
                link: hacksLinks[i],
                name: hacksNames[i]
            })
    }

    hacks.forEach((hack)=>{
        Hackathon.findOrCreate({name: hack.name},{name:hack.name, link:hack.link});
    })
    //console.log(validate);
}

module.exports = updateHackathon;
