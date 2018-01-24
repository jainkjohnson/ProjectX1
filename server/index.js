const config = require('./config');

const session = require('express-session');

const express = require('express');
const userApi = require('./api/user');
const timelineApi = require('./api/timeline');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');

mongoose.connect(config.databaseURL, (err) => {
	// incase of an error return it
  if (err) throw err;
  console.log('Connected to the database');
});

// middle
app.use(express.static(`${__dirname}/public`));
app.use(logger('dev'));
// explicitly stating usage of body-parser
app.use(bodyParser.json());
// allows us to give and use elements through url
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'SOME SECRET KEY TO ENCRYPT SESSION_ID',
  resave: true,
  saveUninitialized: false,
  cookie: {
    // [TODO] I have a dream – one day we provide HTTPS
    // secure: true
    expires: new Date(+new Date() + 1.8e6) // 30mins from now
  }
}));

app.use('/user', userApi);
app.use('/timeline', timelineApi);

// setting up the server's listening port
console.log('port : ', config.API_PORT);
app.listen(config.API_PORT, (err) => {
  // incase of an error return it
  if (err) throw err;
  // keep the user aware of the status of the server
  console.log('Server running on port: ', config.API_PORT); // eslint-disable-line
});
