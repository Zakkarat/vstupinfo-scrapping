const puppeteer = require('puppeteer');
const chalk = require('chalk');

const studentsToFile = require('./toFile');

const error = chalk.bold.red;
const success = chalk.keyword('green');

(async () => {
    try {
        const browser = await puppeteer.launch({headless: true});

        const page = await browser.newPage();

        await page.goto('http://vstup.info/2018/174/i2018i174p457836.html')

        await page.waitForSelector(`table.tablesaw`)
        const cities = await page.evaluate(() => {
            const students = [...document.getElementsByTagName('tbody')[0].children];
            students.length = 272;
            return students.map(({children}) => ({
                name: children[1].innerText, mean: children[3].innerText, marks: [...children[5].children[0].children].map(elem => {
                    const results = elem.innerText.split(': ');
                    return {subject: results[0], mark: results[1]};
                })
                }))
        })
        await browser.close(); 
        studentsToFile(cities, 'students');
        console.log(success("Browser closed"));
    } catch(err) {
        console.log(error(err));
        await browser.close();
        console.log(error("Browser closed"));
    }
})();