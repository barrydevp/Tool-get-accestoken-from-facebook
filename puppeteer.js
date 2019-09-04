import puppeteer from 'puppeteer';

export default async (url, option) => {
  const browser = await puppeteer.launch({ headless: false });       // run browser
  const page = await browser.newPage();           // open new tab
  await page.goto(url);            // go to site.com       
  await page.evaluate(() => console.log(`url is ${location.href}`));

  const newPagePromise = new Promise(x => page.once('popup', target => {
    // console.log(target);
    x(target);
  }));
  let newPage = await newPagePromise;           // declare new tab /window, 

  newPage.on('close', async () => {

    const responseLogin = await page.evaluate(() => {
      return window.responseLogin;
    });

    console.log(responseLogin);
  });
  const email = await newPage.waitForSelector('#loginform input#email').catch(error => console.error(error));
  await email.type('0944703687');
  const password = await newPage.waitForSelector('#loginform input#pass').catch(error => console.error(error));
  await password.type('haihoak13');
  const buttonLogin = await newPage.waitForSelector('#loginform #buttons input').catch(error => console.error(error));
  await buttonLogin.click();

  console.log("Click!");
  const buttonSubmit = await newPage.waitForSelector('form button[type=submit]').catch(error => console.error(error));

  await newPage.close().catch(error => console.error(error));                 
  // await page.close().catch(error => console.error(error));                  

  // await browser.close().catch(error => console.error(error));
}

