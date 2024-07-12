function customizeOpenModalButton(){

}

//Customize the elements in a modal panel
function customizeModalElements(){
    setProviderButtonActions();
}

function swapProviderEmailPanel(){
    var divLoginContentRight = document.getElementById("loginContentRight");
    var loginTypeTitle = document.getElementById("loginTypeTitle");
    var emailButton = document.getElementById("divEmailButton");
    var providerButton = document.getElementById("divProviderButton");

    loginTypeTitle.innerText = "Already have an account?";
    providerButton.classList.replace("div-provider-button", "div-provider-button-invisible");
    emailButton.classList.replace("div-email-button-invisible", "div-email-button");
    divLoginContentRight.classList.replace("login-provider-background", "login-email-background");
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
    var buttonTags = document.getElementsByTagName("button");
    var buttons = Array.from(buttonTags);

    var loginProviderTitle = document.getElementsByClassName("div-provider-title");
    var titles = Array.from(loginProviderTitle);

    var loginProviderLogo = document.getElementById("loginProviderLogo");
    var loginProviderName = document.getElementById("loginProviderName");
    var loginHiddenProviderName = document.getElementById("hiddenProviderName")

    var userPasswordInput = document.getElementById("divPasswordInput");

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

                titles.forEach(title => {
                    title.classList.toggle("div-provider-title-visible");
                })

                userPasswordInput.classList.toggle("div-login-password-input-invisible");
                swapProviderEmailPanel();
                modal.close();
        })
        }
    })
}