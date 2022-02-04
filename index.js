require('dotenv').config();
const express = require('express');
const server = express();
const session = require('express-session');
const PORT = process.env.PORT || 3001;
const router = require('./app/router');

server.locals = {
    author: 'Joffrey',
  };

server.set('view engine', 'ejs');
server.set('views', './app/views');

server.use(express.static('assets'));
server.use(router);

server.use(session({
  secret: 'kwwaahh',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: true
  }
}));

server.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
});