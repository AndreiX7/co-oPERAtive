(function() {
    var loginVue = new Vue({
      el: '#loginVue',
      data: {
        username: null,
        password: null,
        userType: null,
        user: null,
        isLoggingIn: false,
        isInvalid: false,
        isAuthenticated: false,

        btnLogin: {
             text: 'Log In'
        } 
      },
      methods: {
          logIn: function() {
            loginVue.btnLogin.text = 'Logging in...';
            var self = this;
            var userData = {
                username: self.username,
                password: self.password
                //userType: self.userType
            };

            self.isLoggingIn = true;
            self.isInvalid = false;


            axios.post('/process/login', userData)
              .then(res => { // Client-side actions
                    self.isLoggingIn = false;
                    if (res.data.auth == "OK") {
                        self.isAuthenticated = true;
                        loginVue.btnLogin.text = '✓ Successful login ';
                        setTimeout(() => {
                                if(res.data.usertype == "1") window.location.href = '/admin/dashboard';
                                if(res.data.usertype == "2") window.location.href = '/cooperative/dashboard';
                                if(res.data.usertype == "3") window.location.href = '/process/userdashboard';
                        }, 500);
                        localStorage.setItem("username", res.data.username);
                        localStorage.setItem("nemBalance", res.data.balance);
                    }
                    else if (res.data.auth == "SERVER_ERROR") {
                        self.isInvalid = true;
                        loginVue.btnLogin.text = 'Internal server error. Try again';
                    }
                    else if (res.data.auth == "REDIS_ERROR") {
                        self.isInvalid = true;
                        loginVue.btnLogin.text = 'Redis server error. Try again';
                    }
                    else {
                        self.isInvalid = true;
                        loginVue.btnLogin.text = 'Invalid Credentials';
                    }
                    setTimeout(() => {
                        if (self.isAuthenticated == false) {
                            self.isInvalid = false;
                            loginVue.btnLogin.text = 'Log In';
                        }
                    }, 1500);
              })
              .catch(err => {
                  console.log(err);
              })
          }
      }
    }
    )
})();