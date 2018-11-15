(function() {
    var userDashboard = new Vue({
      el: '#userDashboard',
      data: {
        cooperative: null,
        address: null,
        amount: null,
        loans: []
      },
      methods: {
        btnApplyLoan: function() {
          var self = this;
          var loanData = {
            cooperative: self.cooperative,
            address: self.address,
            amount: self.amount
          };
          axios.post('/process/userdashboard', loanData)
            .then(res => {
              self.loans = res.data;
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }
    )
    console.log(userDashboard);
})();    
