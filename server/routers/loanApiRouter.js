const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const collections = ['loans'];
const db = mongojs('yunyon.ddns.net/yunyondb', collections);

router.get('/', (req, res, next) => {
  console.log('Loan API GET');
  next();
}, (req, res) => {
  db.loans.find((err, docs) => {
    res.json(docs);
  });
});

module.exports = router;
