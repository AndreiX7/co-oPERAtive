const express = require('express');
const router = express.Router();
const nem = require('nem-sdk').default;
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const mongojs = require('mongojs');
const collections = ['users'];
const redis = require('redis');
var client = redis.createClient({
    port: 6379,
    host: 'yunyon.ddns.net'
});
var nemBalance = null;

const app = express();

app.use(session({
    secret: 'thisisatestsecretkey',
    // create new redis store.
    store: new redisStore({ host: 'yunyon.ddns.net', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false
  }));

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
            else {
                session.key=req.body.username;
                session.user=req.body.username;
                session.balance=null;
                var nemBalance;
                //res.end('done');
                //res.send("OK");
                console.log(getNemBalance());
                getNemBalance(callback => {
                    session.balance = callback;
                    res.json({auth: 'OK', username: req.body.username, balance: session.balance });
                });
            }
        } catch (err) { res.send("SERVER_ERROR"); console.log(err); }
        try {
            client.set(req.body.username, req.body.username, redis.print);
            //console.log(app.session.user);
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

 function getNemBalance(callback) {
    const endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
    var balance = null;
    
    nem.com.requests.account.data(endpoint, "TBA34RRWCPIP53RHKQ3P363BMP4KZ4VA3UMVRXLT").then(function(res) {
        //console.log(res.account.balance);
        console.log(res);
        balance = (res.account.balance/1000000);
        callback(balance);
    }, function(err) { //console.log("err"); 
        callback(null); 
    });
 }
module.exports = router;
