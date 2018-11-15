const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const collections = ['loans'];
const db = mongojs('yunyon.ddns.net/yunyondb', collections);

router.get('/', (req, res) => {
  let viewModel = req.viewModel;
  res.sendFile('userdashboard.html', { root: './server/views' });
});

router.post('/', (req, res) => {
  var loan = {
    cooperative : req.body.cooperative,
    address : req.body.address,
    amount : req.body.amount
  };
  insertLoanDetails(loan.cooperative, loan.address, loan.amount);
});

function insertLoanDetails(cooperative, address, amount) {
  db.loans.insert({ "cooperative" : cooperative, "address" : address, "amount" : amount });
};

module.exports = router;
