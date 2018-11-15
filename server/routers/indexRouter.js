const express = require('express');
const app = express();
const router = express.Router();
const redis   = require("redis");
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient({
  port: 6379,
  host: 'yunyon.ddns.net'
});

app.use(session({
  secret: 'thisisatestsecretkey',
  // create new redis store.
  store: new redisStore({ host: 'yunyon.ddns.net', port: 6379, client: client,ttl :  260}),
  saveUninitialized: false,
  resave: false
}));

router.get('/', function (req, res) {
  let viewModel = req.viewModel;
  //res.render('index.html', viewModel);
  //res.sendFile(__dirname + '/index.html');
  res.sendFile('index.html', { root: './server/views' });
});

router.get('/login', function (req, res) {
  let viewModel = req.viewModel;
  res.sendFile('login.html', { root: './server/views' });
});

router.get('/admin/dashboard', function (req, res) {
  let viewModel = req.viewModel;
  res.sendFile('admin_dashboard.html', { root: './server/views' });
  console.log(session.key);
  if (session.key == null) {
    console.log(req.body.username);
    //res.send('<script>alert("Hello")</script>');
    //res.json({ isSessionValid: false} );
    res.redirect('/');
  }
})

router.get('/test', function (req, res) {
  let viewModel = req.viewModel;
  res.sendFile('test.html', { root: './server/views' });
})

router.get('/404', function (req, res) {
  let viewModel = req.viewModel;
  res.sendFile('404.html', { root: './server/views' });
})

router.post('/', function (req, res) {

});

module.exports = router;
