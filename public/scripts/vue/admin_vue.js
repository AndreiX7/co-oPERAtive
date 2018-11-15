(function() {
    var adminVue = new Vue({
      el: '#adminVue',
      data: {
        username: localStorage.getItem("username"),
        password: null,
        userType: null,
        user: null,
        isLoggingIn: false,
        isInvalid: false,
        isAuthenticated: false,

        txtUsername: {
            text: localStorage.getItem("username")
       }
      },
      created: function() {
        alert('test');
        adminVue.txtUsername.text = localStorage.getItem("username");
      },

      methods: {
        
      }
    }
    )
})();