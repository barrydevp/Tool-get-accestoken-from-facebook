import express from 'express';
import service from './service';
import config from './config';
// import axios from 'axios';
import Queue from './utils/queue';
import logger from './utils/logger';

const app = new express();
const APP_PORT = process.env.WEB_PORT || '8888';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';
const queue = new Queue();

let timer;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/startGetToken', (req, res, next) => {
  const milisecons = Number(config.DEFAULT_MILISECONS);
  console.log(milisecons);
  
  try {
    clearInterval(timer);
    timer = queue.createCycleJob('get token', service.startGetToken, milisecons);
    // timer = setInterval(service.startGetToken, milisecons);
    logger.log('info', 'Start tool Success');
    res.send('Start Success');
  } catch (error) {
    logger.log('error', 'Start tool Fail\n' + 'Error: ' + error.message);
    res.send('Start Fail\n' + 'Error: ' + error.message);
  }
});

app.get('/startGetToken/:milisecons', (req, res, next) => {
  const milisecons = Number(req.params.milisecons) || Number(config.DEFAULT_MILISECONS);
  console.log(milisecons);
  try {
    clearInterval(timer);
    // timer = setInterval(service.startGetToken, milisecons);
    timer = queue.createCycleJob('get token', service.startGetToken, milisecons);
    logger.log('info', 'Start tool Success');
    res.send('Start Success');
  } catch(error) {
    logger.log('error', 'Start tool Fail\n' + 'Error: ' + error.message);
    res.send('Start Fail\n' + 'Error: ' + error.message);
  }
});

app.get('/stopGetToken', (req, res, next) => {
  try {
    clearInterval(timer);
    logger.log('info', 'Stop tool Success');
    res.send('Stop Success');
  } catch (error) {
    logger.log('error', 'Stop tool Fail\n' + 'Error: ' + error.message);
    res.send('Stop Fail\n' + 'Error: ' + error.message);
  }
});

// app.get('/axios', (req, res, next) => {
//   try {
//     clearInterval(timer);
//     res.send('Stop Success');
//   } catch (error) {
//     res.send('Stop Fail\n' + 'Error: ' + error.message);
//   }
// });

app.listen(APP_PORT, APP_HOST, () => {
  console.log('Facebook-get-token is running on port ' + APP_PORT);
});
