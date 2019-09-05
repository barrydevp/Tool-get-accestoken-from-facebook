import express from 'express';
import service from './service';
// import Queue from './utils/queue';

const app = new express();
const port = 8888;
// const queue = new Queue();

let timer;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/startGetToken', (req, res, next) => {
  // timer = queue.createCycleJob('get token', service.startGetToken, 40000);
  service.startGetToken;
  timer = setInterval(service.startGetToken, 30000);

  res.send('Start Success');
});

app.get('/stopGetToken', (req, res, next) => {
  clearInterval(timer);

  res.send('Stop Success');
});

app.listen(port, 'localhost', () => {
  console.log('Facebook-get-token is running on port ' + port);
});
