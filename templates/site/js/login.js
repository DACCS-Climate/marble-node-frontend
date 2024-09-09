//Remove when done
const nodeURL = "https://redoak.cs.toronto.edu/";

document.addEventListener("DOMContentLoaded", function () {
    var signInButton =  document.getElementById("buttonSignIn");
    var emailButton = document.getElementById("buttonSelectEmail");

    signInButton.addEventListener('click', (event) => {
        login();
    })

    emailButton.addEventListener('click', (event) => {
        loginModeEmail();
    })

    setNodeAdminEmail();
})








