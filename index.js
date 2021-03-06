const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const html = require('html');
const nem = require('nem-sdk');
const app = express();
const port = 3300;
//const mongojs = require('mongojs');
//const axios = require('axios');
//const redis = require('redis');
//const collections = ['users'];
//var db = mongojs("127.0.0.1:27017/"+db, collections);
/*let db = mongojs('yunyon.ddns.net/yunyondb', collections); // MongoDB 
var rc = redis.createClient({
  port: 6379,
  host: 'yunyon.ddns.net'
}); // Redis Client*/

// Routers Declaration
const indexRouter = require('./server/routers/indexRouter');
const loginRouter = require('./server/routers/loginRouter');
const adminRouter = require('./server/routers/adminRouter');
const testRouter = require('./server/routers/testRouter');
const userDashboardRouter = require('./server/routers/userDashboardRouter');
const loanApiRouter = require('./server/routers/loanApiRouter');

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
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/process/loan', adminRouter);
app.use('/process/login', loginRouter);
app.use('/process/test', testRouter);
app.use('/process/userdashboard', userDashboardRouter);
app.use('/api/loans', loanApiRouter);

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`${port}`);
});

app.get('*', function(req, res) {
  res.redirect('/404');
});

app.get('/',function(req,res){  
  //console.log("Req data is: " + res.data.isSessionValid);
  // create new session object.
  if(req.session.key != null) {
      // if email key is sent redirect.
      res.redirect('/dashboard/admin');
  } else {
      // else go to home page.
      res.render('index.html');
  }
});

/*db.on('connect', function () {
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

db.loan.find((err, docs) => {
	console.log(docs);
})

rc.on('connect', function() {
  console.log('Redis client connected');
});*/
