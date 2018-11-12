const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const html = require('html');
const nem = require('nem-sdk');
const app = express();
const port = 3300;
const mongojs = require('mongojs');
const axios = require('axios');
let db = mongojs('yunyondb');
// Routers Declaration
const indexRouter = require('./server/routers/indexRouter');
const loginRouter = require('./server/routers/loginRouter');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.use((req, res, next) => {
  req.viewModel = {
    title: 'Test'
  };
  next();
});

app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'html');

app.use('/', indexRouter);
app.use('/process/login', loginRouter);

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`${port}`);
});

db.on('connect', function () {
	console.log('Database connection: OK');
})

db.on('error', function (err) {
	console.log('database error', err)
})

db.mycollection.find(function (err, docs) {
	console.log(docs);
})

db.users.findOne({ "username": "admin"}, (err, test) => 
{
  console.log(test);
});