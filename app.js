// import getToken from './puppeteer.js';
import express from 'express';
// import Browser from './browser';

const app = new express();
const port = 8888;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/getToken', (req, res, next) => {

// })

app.listen(port, 'localhost', () => {
  console.log('Facebook-get-token is running on port ' + port);
});
