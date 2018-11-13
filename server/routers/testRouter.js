const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
let db = mongojs('yunyondb');

router.get('/', function (req, res) {
  let viewModel = req.viewModel;
  //res.render('index.html', viewModel);
  //res.sendFile(__dirname + '/index.html');
  res.sendFile('test.html', { root: './server/views' });
});

module.exports = router;