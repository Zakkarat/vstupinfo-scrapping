const puppeteer = require("puppeteer");
const chalk = require("chalk");
const cities = require("./trueCities.json");
const districtsToFile = require("./toFile");

const accordId = "vnzt";

const error = chalk.bold.red;
const success = chalk.keyword("green");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();
    page.on('console', msg => {
      for (let i = 0; i < msg.args.length; ++i)
        console.log(`${i}: ${msg.args[i]}`);
    });
    for (let i = 0; i < cities.length; i++) {
      await page.goto(cities[i].href);
      await page.waitForSelector(`div.accordion-group`);
      const unis = page.evaluate(() => {
        const vnztArr = new Array(4).map((elem, i) =>
          document.getElementById(accordId + (i + 1))
        );
        console.log(vnztArr.reduce((acc, elem) => {
          while (elem.tag !== "a") {
            elem = elem.children[0];
          }
          acc.push({
            title: elem.innerText,
            link: elem.href
          });
          return acc;
        }, []));
      });
    }
    
    await browser.close();
    districtsToFile(unis);
    console.log(success("Browser closed"));
  } catch (err) {
    console.log(error(err));
    await browser.close();
    console.log(error("Browser closed"));
  }
})();
