document.addEventListener("DOMContentLoaded", function () {
    var signInButton =  document.getElementById("buttonSignIn");
    var emailButton = document.getElementById("buttonSelectEmail");
    var userPasswordTextbox = document.getElementById("userPassword");

    signInButton.addEventListener('click', (event) => {
        login();
    })

    userPasswordTextbox.addEventListener('keypress', (event) => {
        if(event.code == "Enter"){
            login();
        }
    })

    emailButton.addEventListener('click', (event) => {
        loginModeEmail();
    })

})
