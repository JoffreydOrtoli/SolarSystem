const express = require('express');
const path = require('path');
const server = express();
const port = 3000;
const router = require('./router');

server.locals = {
    author: 'Joffrey',
  };

server.set('view engine', 'ejs');
const pathToViews = path.resolve(__dirname, 'views');
server.set('views', pathToViews);

const pathToSetDirectory = path.resolve(__dirname,'../assets');
const allStaticFiles = express.static(pathToSetDirectory);

server.use(allStaticFiles);
server.use(router);

server.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
  });