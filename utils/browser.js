import puppeteer from 'puppeteer';
import config from '../config';

export default class Browser {

	static async newBrowser() {
		const browser = await puppeteer.launch({ headless: config.TURN_HEADLESS === 'true' });
		return browser;
	}

	static async newEmptyPage(browser) {
		if(!browser) {
			browser = await Browser.newBrowser();
		}

		const page = await browser.newPage();
		return page;
	}

	static async newPage(url, callback, browser) {
		if (url) {
			if (!browser) {
				browser = await Browser.newBrowser();
			}

			const page = await browser.newPage();
			await page.goto(url);

			if (callback) {
				callback();
			}

			return page;
		}

		return await this.newEmptyPage(browser);
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

				  const email = await Browser.waitForSelector(newPage, config.EMAIL_INPUT_SELECTOR, [browser, page, newPage]);
				  await email.type(inforAccount.email || 'test');
				  const password = await Browser.waitForSelector(newPage, config.PASSWORD_INPUT_SELECTOR, [browser, page, newPage]);
				  await password.type(inforAccount.password || 'test');
				  const buttonLogin = await Browser.waitForSelector(newPage, config.LOGIN_BUTTON_SELECTOR, [browser, page, newPage]);
				  await buttonLogin.click();

				  const buttonSubmit = await newPage.waitForSelector(config.ACCEPT_BUTTON_SELECTOR).catch(error => console.error(error));

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

			if (inforAccount.email && inforAccount.password) {
				const page = await browser.newPage();

				if(!page.isClosed()){
					await page.goto(config.URL_LOGIN_FACEBOOK);

				  let newPage = await Browser.getPopupPage(page);

				  newPage.on('close', async () => {
				    const token = await page.evaluate(() => {
				      return window.responseLogin.authResponse.accessToken;
						}).catch (error => console.log('Error in newPage.on("close") event'));

				    await page.close().catch(error => console.log('Error to close page'));
						
						if (token)
							resolve({ saId: inforAccount.saId, saToken: token, saTokenExpired: 0 });
						else {
							console.log('Something wrong when get token from main Page, please try get token again');
							resolve({ saId: inforAccount.saId, saTokenExpired: 1 });
						}
				  })

				  const email = await Browser.waitForSelector(newPage, config.EMAIL_INPUT_SELECTOR, [page, newPage]);
				  await email.type(inforAccount.email);
				  const password = await Browser.waitForSelector(newPage, config.PASSWORD_INPUT_SELECTOR, [page, newPage]);
				  await password.type(inforAccount.password);
				  const buttonLogin = await Browser.waitForSelector(newPage, config.LOGIN_BUTTON_SELECTOR, [page, newPage]);
				  await buttonLogin.click();
					
					Browser.handleAfterLogin(page, newPage).catch(error => {
						console.log(error.message);
						resolve({ saId: inforAccount.saId, saTokenExpired: 3, saTokenExpiredDescription: error.message });
					});

				} 
			} else {
				await closeMutilBrowserAndPage([page]);
				return ;
			}
		});
	}
	
	static async createBrowserToken(inforAccounts) {
		const length = inforAccounts.length;
		if(length > Number(config.MAX_PAGE)){
			return ;
		}
		const browser = await Browser.newBrowser();

		const pageForTokens = inforAccounts.map(e => Browser.createPageToken(browser, e));

		return Promise.all(pageForTokens).then(async res => {
			await browser.close().catch(error => console.log('error to close browser'));

			return res;
		});
	}

	static getMultiToken(inforAccounts) {
		const length = inforAccounts.length;

		if (length > Number(config.MAX_BROWSER)){
			return ;
		}

		const browserForTokens = inforAccounts.map(e => Browser.createBrowserToken(e));

		return Promise.all(browserForTokens);
	}

	static closeMutilBrowserAndPage(arr) {
		if(arr) {
			const arrClose = arr.map(e => e.close().catch(error => {console.log('error to close mutil Browser and Page')}));

			return Promise.all(arrClose);
		}
	}

	static async handleAfterLogin_old(page, newPage) {
		const loginError = newPage.waitForSelector(config.ERROR_BOX_SELECTOR).catch(error => console.log('Error to get Error Login box'));
		const buttonAccept = newPage.waitForSelector(config.ACCEPT_BUTTON_SELECTOR).catch(error => console.log('Error to get buttonAccept'));
		const buttonSubmitCheck = newPage.waitForSelector(config.CHECK_BUTTON_SELECTOR).catch(error => console.log('Error to get buttonSubmitCheck'));

		const res = await Promise.all([loginError, buttonSubmitCheck, buttonAccept]);

		if(res[0]) {
			await Browser.closeMutilBrowserAndPage([page, newPage]).catch(error => console.log('Error to close mutil page and newpage'));
			throw new Error('Login Error, wrong infor login!')
		} else {
			if (res[1]) {
				await Browser.closeMutilBrowserAndPage([page, newPage]).catch(error => console.log('Error to close mutil page and newpage'));
				throw new Error('Login Succes but occur checkpoint!')
			} else {
				if (res[2]) {
					await buttonAccept.click().catch(error => console.log('Error to click buttonAccept'));
				}

				await newPage.close().catch(error => console.log('Error to close newPage'));
			}
		}
	}

	static async handleAfterLogin(page, newPage) {
		const loginError = newPage.waitForSelector(config.ERROR_BOX_SELECTOR).catch(error => console.log('Error to get Error Login box')).then(res => {
			if (res) {
				Browser.closeMutilBrowserAndPage([page, newPage]).catch(error => console.log('Error to close mutil page and newpage'));
				throw new Error('Login Error, wrong infor login!');
			}
		});
		const buttonAccept = newPage.waitForSelector(config.ACCEPT_BUTTON_SELECTOR).catch(error => console.log('Error to get buttonAccept')).then(async res => {
			if (res) {
				await res.click().catch(error => console.log('Error to click buttonAccept'));
			}

			await newPage.close().catch(error => console.log('Error to close newPage'));
		});
		const buttonSubmitCheck = newPage.waitForSelector(config.CHECK_BUTTON_SELECTOR).catch(error => console.log('Error to get buttonSubmitCheck')).then(res => {
			if (res) {
				Browser.closeMutilBrowserAndPage([page, newPage]).catch(error => console.log('Error to close mutil page and newpage'));
				throw new Error('Login Succes but occur checkpoint!')
			}
		});

		return Promise.all([loginError, buttonSubmitCheck, buttonAccept]);
	}

	static waitForSelector(page, selector, arr) {
		return page.waitForSelector(selector)
		.catch(async error => {
			await Browser.closeMutilBrowserAndPage(arr);
		});
	}

	static createPromiseEventOnce(event, page, callback) {
		return new Promise((resolve, reject) => {
			if (event && page) {
				page.once(event, res => {
					if(callback) {
						callback(res);
					}
				
					resolve(res)
				});
			} else reject(new Error('event or page are undefined'));
		});
	}	

	static getPopupPage(page, callback) {
		return new Promise((resolve, reject) => {
			if(page) {
				page.once('popup', res => {
					if (callback) {
						callback(res);
					}

					resolve(res)
				});
			} else reject(new Error('page is undefined'));
		});
	}

}