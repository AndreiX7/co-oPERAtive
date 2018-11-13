const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const collections = ['users'];
let db = mongojs('yunyon.ddns.net/yunyondb', collections);

router.get('/', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  //res.render('index.html', viewModel);
  //res.sendFile(__dirname + '/index.html');
  db.users.findOne({ "username": req.body.userName}, (err, test) => 
    {
        //res.send(req.body.userName);
        if(test == null) res.send("NOT FOUND");
        else res.send("OK");
    });
  
});

router.get('/login', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  res.sendFile('login.html', { root: './server/views' });
});

router.post('/', function (req, res) {
    db.users.findOne({ "username": req.body.userName}, (err, test) => 
    {
        //res.send(req.body.userName);
        //if(test == null) res.send("NOT FOUND");
        //else res.send("OK");
        res.send(req.body);
    });
});

module.exports = router;
