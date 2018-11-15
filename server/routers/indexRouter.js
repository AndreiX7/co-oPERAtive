const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let viewModel = req.viewModel;
  //res.render('index.html', viewModel);
  //res.sendFile(__dirname + '/index.html');
  res.sendFile('index.html', { root: './server/views' });
});

router.get('/login', (req, res) => {
  let viewModel = req.viewModel;
  res.sendFile('login.html', { root: './server/views' });
});

router.get('/admin/dashboard', (req, res) => {
  let viewModel = req.viewModel;
  res.sendFile('admin_dashboard.html', { root: './server/views' });
})

router.get('/admin/loans', (req, res) => {
  let viewModel = req.viewModel;
  res.sendFile('admin_loan.html', { root: './server/views' });
  //res.render('admin_loan.pug', viewModel);
});

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
