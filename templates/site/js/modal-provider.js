function customizeOpenModalButton(){

}

function customModalFunctions(){
    providerButtonActions();
}

function swapProviderEmailPanel(){
    var divLoginContentRight = document.getElementById("loginContentRight");
    var emailButton = document.getElementById("divEmailButton");
    emailButton.classList.toggle("div-email-button");


}


/*Adds click event listener to each button in the provider popup
* On click it:
* Populates the provider logo and name in the login page.
* The provider logo and name is made visible and now appears above the Username field.
* The Password input field is hidden
* Closes the providers modal panel
* */
function providerButtonActions(){
    var modal = document.getElementById("modalDisplay");
    var buttonTags = document.getElementsByTagName("button");
    var buttons = Array.from(buttonTags);

    var loginProviderTitle = document.getElementsByClassName("div-provider-title");
    var titles = Array.from(loginProviderTitle);

    var loginProviderLogo = document.getElementById("loginProviderLogo");
    var loginProviderName = document.getElementById("loginProviderName");

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

                titles.forEach(title => {
                    title.classList.toggle("div-provider-title-visible");
                })

                userPasswordInput.classList.toggle("div-login-password-input-invisible");
                modal.close();
        })
        }
    })
}