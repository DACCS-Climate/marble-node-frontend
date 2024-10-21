document.addEventListener("DOMContentLoaded", function () {
    setModal("providerModal", "openProviderModal", "openProviderModalLink", "closeProviderModal");
    setProviderButtonActions();
})

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
    const providerModal = document.getElementById("providerModal");
    const loginProviderLogo = document.getElementById("loginProviderLogo");
    const loginProviderName = document.getElementById("loginProviderName");
    const loginHiddenProviderName = document.getElementById("hiddenProviderName");

    Array.from(document.getElementsByClassName("provider-button")).forEach(button_div => {
        const button = button_div.getElementsByTagName("button")[0]
        button.addEventListener("click", (event) => {
            const img = button.getElementsByTagName("img")[0];
            loginProviderLogo.src = img.src;
            loginProviderName.innerText = button.value.toUpperCase();
            loginHiddenProviderName.value = button.value;
            set_login_mode("provider");
            providerModal.close();
        })
    })
}
