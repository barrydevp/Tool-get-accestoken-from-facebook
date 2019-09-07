import Browser from './utils/browser';
import fetch from './utils/fetch';
import axios from 'axios';
import config from './config';
import logger from './utils/logger';

export default {
	startGetToken: async (cycleTime) => {
		let socialAccounts = await fetch(config.URL_GET_INFOR + '/get/all');
		// console.log(socialAccounts);
		socialAccounts = Array.from(socialAccounts.data.result);
		socialAccounts = socialAccounts.filter(e => e.saPassword && e.saLoginName && e.saTokenExpired != 0 && e.saTokenExpired != 3).map(e => { return { password: e.saPassword, email: e.saLoginName, saId: e.saId } });

		// console.log(socialAccounts);
		const inforAccounts = []

		const MAX_PAGE = Number(config.MAX_PAGE);
		let index = -1;
		socialAccounts.forEach((e, i) => {
			if (i % 5 === 0) {
				inforAccounts.push([e]);
				index++;
			} else {
				inforAccounts[index].push(e);
			}
		});

		const newInforAccounts = Array.from(await Browser.getMultiToken(inforAccounts));
		const newSocialAccounts = newInforAccounts.reduce((arr, subArr) => arr.concat(...subArr), []).map(e => {
			const update = {};
			if (e.saTokenExpired == 3) {
				update.saTokenExpiredDescription = e.saTokenExpiredDescription;
			} else {
				update.saToken = e.saToken;
			}

			return [e.saId, { ...update, saTokenExpired: e.saTokenExpired }];
		});

		if (newSocialAccounts.length !== 0) {
			const response = await axios({ url: config.URL_GET_INFOR + '/updateToken', method: 'post', data: { newSocialAccounts } });
			// console.log(response.data);
			logger.log('info', 'Data input: ' + response.status + '\nDate response: ' + JSON.stringify(newSocialAccounts));
			// console.log(response.data);
			logger.log('info', 'AXIOS status response: ' + response.status + '\nDate response: ' + JSON.stringify(Array.from(response.data.result).map((e, i) => { return {saId: newSocialAccounts[i], status: e, mess: e ? 'succes' : 'error' }})));
			console.log('AXIOS status response: ', response.status);
		} else {
			logger.log('info', 'All accounts don\'t need to get token or can\'t get token!');
			console.log('All accounts don\'t need to get token or can\'t get token!');
		}
		
	}
}