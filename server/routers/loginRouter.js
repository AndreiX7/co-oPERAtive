const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const collections = ['users'];
const redis = require('redis');
var rc = redis.createClient({
    port: 6379,
    host: 'yunyon.ddns.net'
});


var crypto = require('crypto'),
    algorithm = 'aes-256-gcm',
    password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
    // do not use a global iv for production, 
    // generate a new one for each encryption
    iv = '60iP0h6vJoEa'

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
    db.users.findOne({ "username": req.body.username, "password": req.body.password }, (err, test) => 
    {
        //console.log(req);
        //res.send(req.body.userName);
        //if(test == null) res.send("NOT FOUND");
        //else res.send("OK");
        //console.log("HASHED: " + decrypt("71e72dfb7a"));
        try {
            if(test == null) res.send("NOT FOUND");
            else res.send("OK");
        } catch (err) { res.send("SERVER_ERROR"); }
        try {
            rc.set(req.body.username, req.body.username, redis.print);
            //console.log(encrypt(req.body.username));
        }
        catch (err) { res.send("REDIS_ERROR"); }
    });
});

function encrypt(text) {
    var cipher = crypto.createCipheriv(algorithm, password, iv)
    var encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();
    return {
      content: encrypted,
      tag: tag
    };
  }
  
  function decrypt(encrypted) {
    var decipher = crypto.createDecipheriv(algorithm, password, iv)
    decipher.setAuthTag(encrypted.tag);
    var dec = decipher.update(encrypted.content, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }

module.exports = router;
