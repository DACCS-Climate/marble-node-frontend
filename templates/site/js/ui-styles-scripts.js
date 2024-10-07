$(document).ready(function() {
    /*Initialize Popper.js and Tooltips.js*/
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    /*Toggle password field eye icon*/
    var userPassword = document.getElementById("userPassword");
    var eyeIconContainer = userPassword.nextElementSibling;

    eyeIconContainer.addEventListener("click", (event) =>{
      toggleEyeIcon(eyeIconContainer);
      togglePassword();
    })

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

    eyeIcon.classList.toggle("icon-eye");
    eyeIcon.classList.toggle("icon-eye-slash");
}

/*Show spinner on button on click*/
function showSpinner(){
    var saveChangesButton = document.getElementById("saveUserChangesButton");

    var buttonLabel = document.getElementById("buttonLabel");
    var animatedSpinner = document.getElementById("spinnerAnimated");




    if(buttonLabel.innerText === "Save Changes"){
        buttonLabel.innerText = "Saving";
    }

    animatedSpinner.classList.toggle("spinner-visible");
}

function showSaveCheckmark(){
    var buttonLabel = document.getElementById("buttonLabel");
    var animatedSpinner = document.getElementById("spinnerAnimated");

    if (buttonLabel.innerText === "Saving" ) {
        buttonLabel.innerText = "Saved";
    }
    animatedSpinner.classList.toggle("spinner-visible");
    saveButtonCheckmark.classList.toggle("checkmark-visible");
}