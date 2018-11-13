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
  const nem = require("nem-sdk").default;
                const endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
                const common = nem.model.objects.create("common")('1234', 'ab25157929888adcfd0646d74ee09f5b3c848ddaae1d784de3abcf0c79a8be1c');
                const transferTransaction = nem.model.objects.create('transferTransaction')("TAVI33BIPEIKN2OH5PHKL7E3DDN4UY4QROM2R23E", 44, "hello p0hwzx");
                const preparedTransaction = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);
                nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
                    console.log(res);
                }, function(err){
                    console.log(err);
                })
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
