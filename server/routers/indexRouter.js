const express = require('express');
const router = express.Router();

router.get('/', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  //res.render('index.html', viewModel);
  //res.sendFile(__dirname + '/index.html');
  res.sendFile('index.html', { root: './server/views' });
});

router.get('/login', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  res.sendFile('login.html', { root: './server/views' });
});

router.post('/', function submitNotes(req, res) {

});

module.exports = router;
