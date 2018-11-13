var nem = require('nem-sdk').default;

var endpoint = nem.model.objects.create('endpoint')(
  nem.model.nodes.defaultTestnet, // Change to "defaultMainnet"
  nem.model.nodes.defaultPort
);

// Create a common object holding key (password and private key is required)
var common = nem.model.objects.create('common')('1234', 'ab25157929888adcfd0646d74ee09f5b3c848ddaae1d784de3abcf0c79a8be1c'); // Change your password and privatekey
var address = "TAVI33BIPEIKN2OH5PHKL7E3DDN4UY4QROM2R23E";


    var mosaicDefinitionMetaDataPair = nem.model.objects.get(
      'mosaicDefinitionMetaDataPair'
    );

    // MOSAIC Tranfer use 1 XEM
    var transferTransaction = nem.model.objects.create('transferTransaction')(
      "TAVI33BIPEIKN2OH5PHKL7E3DDN4UY4QROM2R23E",
      1,
      ''
    );

    // Create a mosaic attachment object
    var mosaicAttachment = nem.model.objects.create('mosaicAttachment')(
      'yunyonbank.pasada', // namespace required
      'loancredit', // masaicName required
      5
    );

    // Push attachment into transaction mosaics
    transferTransaction.mosaics.push(mosaicAttachment);

    nem.com.requests.namespace
      .mosaicDefinitions(endpoint, mosaicAttachment.mosaicId.namespaceId)
      .then(
        function(res) {
          var neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(
            res.data,
            ['loancredit'] // masaicName required
          );

          // Get full name of mosaic to use as object key
          var fullMosaicName = nem.utils.format.mosaicIdToName(
            mosaicAttachment.mosaicId
          );

          // Check if the mosaic was found
          if (undefined === neededDefinition[fullMosaicName])
            return console.error('Mosaic not found !');
			else console.log('ok');
          // Set eur mosaic definition into mosaicDefinitionMetaDataPair
          mosaicDefinitionMetaDataPair[fullMosaicName] = {};
          mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition =
            neededDefinition[fullMosaicName];

          // Prepare the transfer transaction object
          var transactionEntity = nem.model.transactions.prepare(
            'mosaicTransferTransaction'
          )(
            common,
            transferTransaction,
            mosaicDefinitionMetaDataPair,
            nem.model.network.data.testnet.id
          );

          // Serialize transfer transaction and announce
          nem.model.transactions.send(common, transactionEntity, endpoint);
          console.log(res);
        },
        function(err) {
          console.error(err);
        }
      );
