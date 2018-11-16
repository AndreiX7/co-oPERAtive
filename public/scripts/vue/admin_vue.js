(function() {
    var adminVue = new Vue({
      el: '#adminVue',
      data: {
        username: localStorage.getItem("username"),
        password: null,
        userType: null,
        user: null,
        isWalletBound: false,

        txtUsername: {
            text: localStorage.getItem("username")
        },
        txtNemBalance: {
            value: localStorage.getItem("nemBalance")
        },
        txtNemBind: {
          text: ""
        }
      },
      created: function(req, res) {
        //adminVue.txtUsername.text = localStorage.getItem("username");
        //alert(res);
        //txtNemBalance.value = res.body.nemBalance;
        //console.log(res);
        //if (adminVue.txtNemBalance.value == "null") alert("No NEM Wallet");
        console.log("test: " + localStorage.getItem("nemBalance"));
        try { if(localStorage.getItem("nemBalance") == "null") { this.txtNemBalance.value = "0"; this.txtNemBind.text = "( BIND )"; } 
              else { this.isWalletBound = true; } 
        }
        catch (err) {  }
        
      },

      methods: {
        
      }
    }
    )
})();