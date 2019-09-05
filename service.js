import Browser from './utils/browser';
import fetch from './utils/fetch';
import axios from 'axios';
import models from './models/index';
import config from './config';

const { Users, sclSocialAccounts } = models;

export default {
	startGetTokenWithinDatabse: async (cycleTime) => {
		let socialAccounts = Array.from(await sclSocialAccounts.findAll());
		socialAccounts = socialAccounts.filter(e => e.saPassword && e.saLoginName && e.saTokenExpired != 0).map(e => { return { password: e.saPassword, email: e.saLoginName, saId: e.saId } });
		
		console.log(socialAccounts);
		const inforAccounts = []

		const MAX_PAGE = 5;
		let index = -1;
		socialAccounts.forEach((e, i) => {
			if(i % 5 === 0) {
				inforAccounts.push([e]);
				index++;
			} else {
				inforAccounts[index].push(e);
			}
		});

		const newInforAccounts = Array.from(await Browser.getMultiToken(inforAccounts));
		const newSocialAccounts = newInforAccounts.reduce((arr, subArr) => arr.concat(...subArr), []).map(e => {
			const update = {};
			if(e.saTokenExpired == 3) {
				update.saTokenExpiredDescription = e.saTokenExpiredDescription;
			} else {
				update.saToken = e.saToken;
			}

			return [e.saId, { ...update, saTokenExpired: e.saTokenExpired }];
		});

		return await Promise.all(
			newSocialAccounts.map(e => { console.log(e); return sclSocialAccounts.update(
				e[1],
				{
					where: {
						saId: e[0]
					}
				}).catch(error => error)
			})
		);
	},
	startGetToken: async (cycleTime) => {
		let socialAccounts = await fetch(config.URL_GET_INFOR + '/get/all');
		socialAccounts = Array.from(socialAccounts.data.result);
		socialAccounts = socialAccounts.filter(e => e.saPassword && e.saLoginName && e.saTokenExpired != 0 && e.saTokenExpired != 3).map(e => { return { password: e.saPassword, email: e.saLoginName, saId: e.saId } });

		console.log(socialAccounts);
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

			console.log('AXIOS status response: ', response.status);
		} else {
			console.log('No data to post request!')
		}
		
	}
}