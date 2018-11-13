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
                  

              })
              .catch(err => {
                  console.log(err);
              })
          }
      }
    }
    )
})();