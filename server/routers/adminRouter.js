const express = require('express');
const nem = require('nem-sdk').default;
const router = express.Router();
const endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);

router.get('/admin/dashboard/test', function (req, res) {
    nem.com.requests.account.data(endpoint, "TBCI2A67UQZAKCR6NS4JWAEICEIGEIM72G3MVW5S").then(function(res) {
        console.log(res);
    });
});


router.post('/', function (req, res) {

});

module.exports = router;
