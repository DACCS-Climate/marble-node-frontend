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
    var buttonLabel = document.getElementById("buttonLabel");
    var animatedSpinner = document.getElementById("spinnerAnimated");

    if(buttonLabel.innerText === "Save Changes"){
        buttonLabel.innerText = "Saving";
    }
    else if (buttonLabel.innerText === "Saving" ){
        buttonLabel.innerText = "Save Changes";
    }
    else
    {
        null
    }

    animatedSpinner.classList.toggle("spinner-visible");
}

//TODO
//Make function for mouseover and mouseout event on the provider buttons
//The ID for the button will be set using jinja in the existing button template file
//It will set  the mouseover to look for the given id and swap the button icon logo to the white version
//It will set the mouseout to look for the given id and swap the button icon logo back to the original coloured version

//TODO
//Hide spinner logo or make invisible so the text will be centered in the button