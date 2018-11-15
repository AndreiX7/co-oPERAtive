(function() {
    var adminDashboard = new Vue({
      el: '#adminDashboard',
      data: {
        loans: []
      },
      created: function() {
        var self = this;
        axios.get('http://localhost:3300/api/loans')
          .then(res => {
            self.loans = res.data;
          })
          .catch(err => {
            self.loans = [];
            console.log(err);
          });
      },
      methods: {
        approveLoan: function(loan) {
          console.log(loan);
          var loanData = {
            cooperative: loan.cooperative,
            address: loan.address,
            amount: loan.amount
          };
          axios.post('/process/loan', loanData)
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
    console.log(adminDashboard);
})();
