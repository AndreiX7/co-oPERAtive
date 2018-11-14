(function() {
    var userDashboard = new Vue({
      el: '#userDashboard',
      data: {
        cooperative: null,
        account: null,
        amount: null,
        loans: []
      },
      methods: {
        btnApplyLoan: function() {
          var self = this;
          var loanData = {
            cooperative: self.cooperative,
            account: self.account,
            amount: self.amount
          };
          console.log(loanData);
          axios.post('/process/userdashboard', loanData)
            .then(res => {
              self.loans = res.data;
              console.log(res.data);
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
