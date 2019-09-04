import puppeteer from 'puppeteer';

const getToken = (data) => {
  $(document).ready(() => {
    FB.login((responseLogin) => {
      if (responseLogin.authResponse) {
        // const { authResponse: { accessToken } } = responseLogin;
        console.log('response', responseLogin);
      }
    }, {
        scope: 'email',
        return_scopes: true
      });
  });
};

export default async (url) => {
  const browser = await puppeteer.launch({ headless: false });       // run browser
  const page = await browser.newPage();           // open new tab
  await page.goto(url);            // go to site.com       
  await page.evaluate(() => console.log(`url is ${location.href}`));

  const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
  let newPage = await newPagePromise;           // declare new tab /window, 

  await newPage.evaluate(() => {
    const tryToLogin = (infor) => {
      console.log("test");
      return () => {
        const email = document.querySelector('#loginform input#email');
        const password = document.querySelector('#loginform input#pass');
        const submit = document.querySelector('#loginform #buttons input');

        // fill input field
        email.value = infor.email;
        password.value = infor.password;
        submit.click();
      }
    }

    console.log(`url is ${location.href}`);
    window.onload = tryToLogin({ email: '0944703687', password: 'haihoak13' });
  });

  await newPage.evaluateOnNewDocument(() => {
    console.log(`url2 is ${location.href}`);
    window.onload = () => {
      const submit = document.querySelector('form button[type=submit]');
      submit.click();
    };
  });

  const responseLogin = await page.evaluate(() => {
    console.log('hello');
    
    return window.responseLogin;
  });
 
  console.log(responseLogin);
  await newPage.close();                   
  await page.close();                   

  await browser.close();
}

