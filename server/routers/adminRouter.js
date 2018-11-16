const express = require('express');
const nem = require('nem-sdk').default;
const router = express.Router();

var loan = {};

router.get('/', (req, res, next) => {
  res.send(loan.amount);
}); 

router.post('/', (req, res) => {
  loan.cooperative = req.body.cooperative,
  loan.address = req.body.address,
  loan.amount = req.body.amount;

  mosaicTransfer(loan.cooperative, loan.address, loan.amount, (reply) => {
    console.log(reply);
  })
});

function mosaicTransfer(cooperative, address, amount, callback) {
  const endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
  const common = nem.model.objects.create("common")("1234", "ab25157929888adcfd0646d74ee09f5b3c848ddaae1d784de3abcf0c79a8be1c");
  const transferTransaction = nem.model.objects.create('transferTransaction')(address, 0, "mosaic transaction program");
  var mosaicDefinitions = nem.model.objects.get("mosaicDefinitionMetaDataPair");
  var mosaicAttachment = nem.model.objects.create("mosaicAttachment")(cooperative, "loan", amount);
  transferTransaction.mosaics.push(mosaicAttachment);
  nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId).then(function(res){
  var definition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, ["loan"]);
  var fullName = nem.utils.format.mosaicIdToName(mosaicAttachment.mosaicId);
  mosaicDefinitions[fullName] = {};
  mosaicDefinitions[fullName].mosaicDefinition = definition[fullName];
  var preparedTransaction = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitions, nem.model.network.data.testnet.id);
  preparedTransaction.fee = 1000000;
  nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
    callback(res);
  }, function(err){
    console.log(err);
  });
  }, function(err){
  console.log(err);
  });
};

module.exports = router;
