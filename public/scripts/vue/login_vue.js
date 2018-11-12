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
              axios.get('/process/login', userData)
                .then(res => {
                    console.log(res);

                })
                .catch(err => {
                    console.log(err);
                })
          },
          logIn2: function() {
            var self = this;
            var userData = {
                userName: self.userName,
                password: self.password
                //userType: self.userType
            };
            axios.post('/process/login', userData)
              .then(res => {
                  console.log(res);

              })
              .catch(err => {
                  console.log(err);
              })
          }
      }
    }
    )
})();