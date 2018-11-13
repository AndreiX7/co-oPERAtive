(function() {
    var testVue = new Vue({
      el: '#testVue',
      data: {
        userName: null,
        password: null,
        userType: null,
        user: null
      },
      methods: {
          transferXEM: function() {
            alert('a');
            var self = this;
            var endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
            var common = nem.model.objects.create("common")("", "ab25157929888adcfd0646d74ee09f5b3c848ddaae1d784de3abcf0c79a8be1c");
            var mosaicDefinitionMetaDataPair = nem.model.objects.get("mosaicDefinitionMetaDataPair");
            var transferTransaction = nem.model.objects.create("transferTransaction")("TBCI2A67UQZAKCR6NS4JWAEICEIGEIM72G3MVW5S", 1, "Hello");
            var mosaicAttachment = nem.model.objects.create("mosaicAttachment")("nem", "xem", 1000000);

            // Push attachment into transaction mosaics
            transferTransaction.mosaics.push(mosaicAttachment);
            
            /**
             * ATTACHING ANOTHER MOSAIC
             *
             * Need to get mosaic definition using com.requests
             */
            
            // Create another mosaic attachment
            var mosaicAttachment2 = nem.model.objects.create("mosaicAttachment")("nw.fiat", "eur", 10000); // 100 nw.fiat.eur (divisibility is 2 for this mosaic)
            
            // Push attachment into transaction mosaics
            transferTransaction.mosaics.push(mosaicAttachment2);
            
            // Need mosaic definition of nw.fiat:eur to calculate adequate fees, so we get it from network.
            // Otherwise you can simply take the mosaic definition from api manually (http://bob.nem.ninja/docs/#retrieving-mosaic-definitions) 
            // and put it into mosaicDefinitionMetaDataPair model (objects.js) next to nem:xem (be careful to respect object structure)
            nem.com.requests.namespace.mosaicDefinitions(endpoint, mosaicAttachment2.mosaicId.namespaceId).then(function(res) {
            
                // Look for the mosaic definition(s) we want in the request response (Could use ["eur", "usd"] to return eur and usd mosaicDefinitionMetaDataPairs)
                var neededDefinition = nem.utils.helpers.searchMosaicDefinitionArray(res.data, ["eur"]);
                
                // Get full name of mosaic to use as object key
                var fullMosaicName  = nem.utils.format.mosaicIdToName(mosaicAttachment2.mosaicId);
            
                // Check if the mosaic was found
                if(undefined === neededDefinition[fullMosaicName]) return console.error("Mosaic not found !");
            
                // Set eur mosaic definition into mosaicDefinitionMetaDataPair
                mosaicDefinitionMetaDataPair[fullMosaicName] = {};
                mosaicDefinitionMetaDataPair[fullMosaicName].mosaicDefinition = neededDefinition[fullMosaicName];
            
                // Prepare the transfer transaction object
                var transactionEntity = nem.model.transactions.prepare("mosaicTransferTransaction")(common, transferTransaction, mosaicDefinitionMetaDataPair, nem.model.network.data.testnet.id);
            
                // Serialize transfer transaction and announce
                nem.model.transactions.send(common, transactionEntity, endpoint)
            }, 
            function(err) {
                console.error(err);
            })
            axios.post('/process/login', userData)
              .then(res => { // Client-side actions
                  
                    
              })
              .catch(err => {
                  console.log(err);
              })
          }
      }
    }
    )
})();    
    