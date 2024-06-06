/*Initialize Popper.js and Tooltips.js*/
$(document).ready(function() {
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

})

/*Toggle eye icon and password text in password input field*/
function togglePassword() {
    var passwordInput = document.getElementById("userPassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

function toggleEyeIcon(element) {
    var eyeIcon = element.firstElementChild;

    eyeIcon.classList.toggle("fa-eye");
    eyeIcon.classList.toggle("fa-eye-slash");
}


window.onload = () => {
    var userPassword = document.getElementById("userPassword");
    var eyeIconContainer = userPassword.nextElementSibling;

    eyeIconContainer.addEventListener("click", (event) =>{
      toggleEyeIcon(eyeIconContainer);
      togglePassword();
    })
}

/*Show spinner on button on click*/
function showSpinner(){
    var animatedSpinner = document.getElementById("spinnerAnimated");
    animatedSpinner.classList.toggle("visible")
}