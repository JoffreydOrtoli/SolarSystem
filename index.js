const express = require('express');
const server = express();
const port = 3001;
const router = require('./app/router');

server.locals = {
    author: 'Joffrey',
  };

server.set('view engine', 'ejs');
server.set('views', './app/views');

server.use(express.static('assets'));
server.use(router);

server.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });