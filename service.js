import Browser from './browser';
import models from './models/index';

const { Users, sclSocialAccounts } = models;

// sclSocialAccounts.findAll().then(res => console.log(res));

export default {
	startGetToken: async () => {
		let socialAccounts = Array.from(await sclSocialAccounts.findAll());
		socialAccounts = socialAccounts.filter(e => e.saPassword && e.saLoginName).map(e => { return { password: e.saPassword, email: e.saLoginName, saId: e.saId } });
		
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
		const newSocialAccounts = newInforAccounts.reduce((arr, subArr) => arr.concat(...subArr), []).filter(e => e.saToken);
		return await Promise.all(
			newSocialAccounts.map(e => { console.log(e); return sclSocialAccounts.update(
				{
					saToken: e.saToken,
					saTokenExpired: 0
				},
				{
					where: {
						saId: e.saId
					}
				}).catch(error => error)
			})
		);
	}
}