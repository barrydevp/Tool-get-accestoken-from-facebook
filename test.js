import getToken from './puppeteer'; 
import Service from './service'; 

Service.startGetToken().then(res => console.log(res));