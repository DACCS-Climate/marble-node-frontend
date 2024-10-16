document.addEventListener("DOMContentLoaded", function () {
    var signInButton =  document.getElementById("buttonSignIn");
    var emailButton = document.getElementById("buttonSelectEmail");
    var userPasswordTextbox = document.getElementById("userPassword");

    signInButton.addEventListener('click', (event) => {
        login();
    })

    userPasswordTextbox.addEventListener('keypress', function (event){
        if(event.code == 13){
            login();
        }
    })

    emailButton.addEventListener('click', (event) => {
        loginModeEmail();
    })

    setNodeAdminEmail();
})








