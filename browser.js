import puppeteer from 'puppeteer';

const MAX_PAGE = 5;
const MAX_BROWSER = 3;
const emailInputSelector = '#loginform input#email';
const passwordInputSelector = '#loginform input#pass';
const loginButtonSelector = '#loginform #buttons input';
const acceptButtonSelector = 'form button[type=submit]';

export default class Browser {

	static async newBrowser() {
		const browser = await puppeteer.launch({ headless: false });
		return browser;
	}

	static async newEmptyPage(browser) {
		if(!browser) {
			browser = await Browser.newBrowser();
		}

		const page = await browser.newPage();
		return page;
	}

	static async newPage(browser, url, callback) {
		if(!browser) {
			browser = await Browser.newBrowser();
		}
		
		const page = await browser.newPage();

			if(url) {
				await page.goto(url);
				callback();
			}

			return page;
	}

	static async newPage(browser, url) {
		if(!browser) {
			browser = await Browser.newBrowser();
		}
		
		const page = await browser.newPage();

			if(url) {
				await page.goto(url);
			}

		return page;
	}	

	static async newPage(url) {
		const browser = await Browser.newBrowser();
		
		const page = await browser.newPage();

		if(url) {
			await page.goto(url);
		}

		return page;
	}

	static async getTokenOnceFull(page, inforAccount) {
		return new Promise(async (resolve, reject) => {
			if(!page) {
				page = await Browser.newEmptyPage();
			}

			const browser = page.browser();

			if(inforAccount) {
				if(!page.isClosed()){
					await page.goto('http://localhost:8888/');

				  let newPage = await Browser.createPromiseEventOnce(page);

				  newPage.on('close', async () => {
				  	console.log("Hello");
				    const token = await page.evaluate(() => {
				      return window.responseLogin.authResponse.accessToken;
				    });

				    await page.close().catch(error => console.error(error));
						await browser.close().catch(error => console.error(error));
				    resolve(token);
				  })

				  const email = await Browser.waitForSelector(newPage, emailInputSelector, [browser, page, newPage]);
				  await email.type(inforAccount.email || 'test');
				  const password = await Browser.waitForSelector(newPage, passwordInputSelector, [browser, page, newPage]);
				  await password.type(inforAccount.password || 'test');
				  const buttonLogin = await Browser.waitForSelector(newPage, loginButtonSelector, [browser, page, newPage]);
				  await buttonLogin.click();

				  const buttonSubmit = await newPage.waitForSelector(acceptButtonSelector).catch(error => console.error(error));
				  // const buttonSubmit = await Browser.waitForSelector(newPage, acceptButtonSelector, [browser, page, newPage]);

				  await newPage.close().catch(error => console.error(error));                 
				  
				} 
			} else {
				await closeMutilBrowserAndPage([browser, page]);
				throw new Error('inforAccount not exists!');
			}
		});
	}

	static async createPageToken(browser, inforAccount) {
		return new Promise(async (resolve, reject) => {
			if(!browser) {
				return ;
			}

			if(inforAccount) {
				const page = await browser.newPage();

				if(!page.isClosed()){
					await page.goto('http://localhost:8888/');

				  let newPage = await Browser.getPopupPage(page);

				  newPage.on('close', async () => {
				    const token = await page.evaluate(() => {
				      return window.responseLogin.authResponse.accessToken;
				    });

				    await page.close().catch(error => console.error(error));
						
				    resolve(token);
				  })

				  const email = await Browser.waitForSelector(newPage, emailInputSelector, [page, newPage]);
				  await email.type(inforAccount.email || 'test');
				  const password = await Browser.waitForSelector(newPage, passwordInputSelector, [page, newPage]);
				  await password.type(inforAccount.password || 'test');
				  const buttonLogin = await Browser.waitForSelector(newPage, loginButtonSelector, [page, newPage]);
				  await buttonLogin.click();

				  const buttonSubmit = await newPage.waitForSelector(acceptButtonSelector).catch(error => console.error(error));
				  // const buttonSubmit = await Browser.waitForSelector(newPage, acceptButtonSelector, [browser, page, newPage]);

				  await newPage.close().catch(error => console.error(error));                 
				  
				} 
			} else {
				await closeMutilBrowserAndPage([page]);
				return ;
			}
		});
	}

	static async createBrowserToken(inforAccounts) {
		const length = inforAccounts.length;
		if(length > MAX_PAGE){
			return ;
		}
		const browser = await Browser.newBrowser();

		const pageForTokens = inforAccounts.map(e => Browser.createPageToken(browser, e));

		return Promise.all(pageForTokens).then(async res => {
			await browser.close().catch(error => console.log(error));

			return res;
		});
	}

	static getMultiToken(inforAccounts) {
		const length = inforAccounts.length;

		if(length > MAX_BROWSER){
			return ;
		}

		const browserForTokens = inforAccounts.map(e => Browser.createBrowserToken(browser, e));

		return Promise.all(browserForTokens);
	}

	static closeMutilBrowserAndPage(arr) {
		if(arr) {
			const arrClose = arr.map(e => e.close().catch(error => {console.log(error)}));

			return Promise.all(arrClose);
		}
	}

	static waitForSelector(page, selector, arr) {
		return page.waitForSelector(selector)
		.catch(async error => {
			await Browser.closeMutilBrowserAndPage(arr);

			// throw new Error(error);
		});
	}

	static test(a) {
		console.log("testa");
	}

	static test() {
		console.log("test");
	}

	static createPromiseEventOnce(page, callback) {
		return new Promise(resolve => page.once('popup', res => {
				callback(res);
				resolve(res)
			}
		));
	}	

	static createPromiseEventOnce(page) {
		return new Promise(resolve => page.once('popup', res => {
				resolve(res)
			}
		));
	}

	static getPopupPage(page) {
		return new Promise(resolve => page.once('popup', res => {
				resolve(res)
			}
		));
	}

}