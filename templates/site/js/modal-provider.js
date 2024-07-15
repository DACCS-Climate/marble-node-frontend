document.addEventListener("DOMContentLoaded", function () {
    setModal("providerModal", "openModal", "openModalLink", "closeModal");
    setProviderButtonActions();
})

function swapProviderEmailPanel(){
    var divLoginContentRight = document.getElementById("loginContentRight");
    var loginTypeTitle = document.getElementById("loginTypeTitle");
    var emailButton = document.getElementById("divEmailButton");
    var providerButton = document.getElementById("divProviderButton");

    loginTypeTitle.innerText = "Already have an account?";
    divLoginContentRight.classList.replace("login-provider-background", "login-email-background");

    if(providerButton.classList.contains("display-flex")){
        providerButton.classList.replace("display-flex", "display-none");
    }

    if(emailButton.classList.contains("display-none")){
        emailButton.classList.replace("display-none", "display-flex");
    }
}

/*Adds click event listener to each button in the provider popup
* On click it:
* Populates the provider logo and name in the login page.
* The provider logo and name is made visible and now appears above the Username field.
* The Password input field is hidden
* Swap the picture on the right side
* Swap the button so it says "Sign in with Email"
* Closes the providers modal panel
* */
function setProviderButtonActions(){
    var modal = document.getElementById("modalDisplay");
    var bodyHTMLCollection = document.getElementsByTagName("body");
    var bodyTags = Array.from(bodyHTMLCollection);
    var buttonTags = document.getElementsByTagName("button");
    var buttons = Array.from(buttonTags);
    var loginProviderTitle = document.getElementById("divProviderTitle");
    var loginProviderLogo = document.getElementById("loginProviderLogo");
    var loginProviderName = document.getElementById("loginProviderName");
    var loginHiddenProviderName = document.getElementById("hiddenProviderName");
    var userPasswordInput = document.getElementById("divPasswordInput");
    var chooseDifferentProvider = document.getElementById("chooseDifferentProvider");
    var divForgotPassword = document.getElementById("divForgotPassword");

    buttons.forEach(button => {
        if(button.value){
            button.addEventListener("click", function() {
                var buttonLogo = document.getElementById(button.id).getElementsByTagName("img");
                var logos = Array.from(buttonLogo);

                logos.forEach(logo => {
                    var largerLogoSrc = logo.src.replace(".svg", "2.svg") ;
                    loginProviderLogo.src = largerLogoSrc;
                })
                loginProviderName.innerText = button.value.toUpperCase();
                loginHiddenProviderName.value = button.value;

                if(loginProviderTitle.classList.contains("display-none")){
                    loginProviderTitle.classList.replace("display-none", "display-flex");
                }

                if(userPasswordInput.classList.contains("display-flex")){
                    userPasswordInput.classList.replace("display-flex", "display-none");
                }

                divForgotPassword.classList.remove(...divForgotPassword.classList);
                divForgotPassword.classList.add("display-none");

                bodyTags.forEach(body => {
                    body.classList.remove(...body.classList);
                })

                chooseDifferentProvider.classList.replace("display-none", "display-flex");
                swapProviderEmailPanel();
                modal.close();
        })
        }
    })
}

function hideOpenModalLink(){
    var chooseDifferentProvider = document.getElementById("chooseDifferentProvider");

    chooseDifferentProvider.addEventListener('click', () => {
        chooseDifferentProvider.classList.replace("display-flex", "display-none");
    })
}