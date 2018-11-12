function login() {
    alert("test");
    db.users.findOne({ "username": "admin"}, (err, test) => 
    {
        console.log(test); 
    });
}

var btnLogin = document.querySelector("#btnLogin");
btnLogin.addEventListener("click", login);