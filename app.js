// import getToken from './puppeteer.js';
import express from 'express';

const app = new express();
const port = 8888;

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, 'localhost', () => {
  console.log('Facebook-get-token is running on port ' + port);
});
