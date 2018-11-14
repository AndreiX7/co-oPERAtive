const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const collections = ['loans'];
let db = mongojs('yunyon.ddns.net/yunyondb', collections);

router.get('/', (req, res) => {
  let viewModel = req.viewModel;
  res.sendFile('userdashboard.html', { root: './server/views' });
});

router.post('/', (req, res) => {
  var loan = {
    cooperative : req.body.cooperative,
    account : req.body.account,
    amount : req.body.amount
  };
  insertLoanDetails(loan.cooperative, loan.account, loan.amount);
});

function insertLoanDetails(cooperative, account, amount) {
  db.loans.insert({ "cooperative" : cooperative, "account" : account, "amount" : amount });
};

module.exports = router;
