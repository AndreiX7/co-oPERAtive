const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
let db = mongojs('yunyondb');

router.get('/', function (req, res) {
  let viewModel = req.viewModel;
  res.sendFile('test2.html', { root: './server/views' });
});

module.exports = router;