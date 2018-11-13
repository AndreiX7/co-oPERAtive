(function() {
    var loginVue = new Vue({
      el: '#loginVue',
      data: {
        userName: null,
        password: null,
        userType: null,
        user: null
      },
      methods: {
          logIn: function() {
            var self = this;
            var userData = {
                userName: self.userName,
                password: self.password
                //userType: self.userType
            };

            axios.post('/process/login', userData)
              .then(res => { // Client-side actions
                const endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.defaultTestnet, nem.model.nodes.defaultPort);
                const common = nem.model.objects.create("common")('1234', 'ab25157929888adcfd0646d74ee09f5b3c848ddaae1d784de3abcf0c79a8be1c');
                const transferTransaction = nem.model.objects.create('transferTransaction')("TAVI33BIPEIKN2OH5PHKL7E3DDN4UY4QROM2R23E", 44, "hello p0hwzx");
                const preparedTransaction = nem.model.transactions.prepare('transferTransaction')(common, transferTransaction, nem.model.network.data.testnet.id);
                nem.model.transactions.send(common, preparedTransaction, endpoint).then(function(res){
                    console.log(res);
                }, function(err){
                    console.log(err);
                })

              })
              .catch(err => {
                  console.log(err);
              })
          }
      }
    }
    )
})();