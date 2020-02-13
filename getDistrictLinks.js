const puppeteer = require('puppeteer');
const chalk = require('chalk');

const districtsToFile = require('./toFile');

const error = chalk.bold.red;
const success = chalk.keyword('green');

(async () => {
    try {
        const browser = await puppeteer.launch({headless: true});

        const page = await browser.newPage();

        await page.goto('http://vstup.info/')

        await page.waitForSelector(`table.table`)
        const cities = await page.evaluate(() => {
            const rows = [...[...document.getElementById('2019abet').firstElementChild.children].map(elem => elem.firstElementChild.firstElementChild)];
            const results = [];
            rows.forEach((elem, i) =>  {
                const data = elem.lastChild.lastChild;
                results[i] = {
                    title: elem.title,
                    href: elem.href,
                    innerText: elem.innerText
                }
            })
        return results;
        })
        await browser.close(); 
        districtsToFile(cities);
        console.log(success("Browser closed"));
    } catch(err) {
        console.log(error(err));
        await browser.close();
        console.log(error("Browser closed"));
    }
})();