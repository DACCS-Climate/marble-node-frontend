//Remove when done
const nodeURL = "https://redoak.cs.toronto.edu/";

document.addEventListener("DOMContentLoaded", function () {
    var signInButton =  document.getElementById("buttonSignIn");
    var emailButton = document.getElementById("buttonSelectEmail");

    signInButton.addEventListener('click', (event) => {
        login();
    })

    emailButton.addEventListener('click', (event) => {
        swapEmailProviderPanel();
    })

    //Set contact email for node admin on the error message when login is incorrect.  Allows user to contact node
    //admin to create account
    setNodeAdminEmail();
})

//Swap Select Provider and Sign In With Email buttons
//Swap background images for right side for Provider and Email
//Swap Provider image and name area
//Make password input field visible again
function swapEmailProviderPanel(){
    var divProviderTitle = document.getElementById("divProviderTitle");
    var divPasswordInput = document.getElementById("divPasswordInput");
    var hiddenProviderName = document.getElementById("hiddenProviderName");
    var divLoginContentRight = document.getElementById("loginContentRight");
    var emailButton = document.getElementById("divEmailButton");
    var providerButton = document.getElementById("divProviderButton");


    divPasswordInput.classList.toggle("div-login-password-input-invisible");
    divProviderTitle.classList.toggle("div-provider-title-visible");
    hiddenProviderName.value = ""; //Erase provider name stored in the hidden text field
    providerButton.classList.replace("div-provider-button-invisible", "div-provider-button");
    emailButton.classList.replace("div-email-button", "div-email-button-invisible");
    divLoginContentRight.classList.replace("login-email-background", "login-provider-background");
}


function login(){
    const usernameInput = document.getElementById("userName").value;
    const passwordInput = document.getElementById("userPassword").value;
    const providerInput = document.getElementById("hiddenProviderName").value

    const nodeSignIn = nodeURL + "magpie/signin";
    const accountHome = "account.html";
    let loginErrorMessage = document.getElementById("loginError");

    //Replace nodeSignIn in fetch with endpoint when done
    //"/magpie/signin"
    if(providerInput){
        const providerSignIn = nodeURL + "magpie/providers/" + providerInput + "/signin";

        fetch(providerSignIn, {
            method: "GET",
            headers:{
                 Accept: "application/json, text/plain",
                "Content-Type": "application/json"
            }
        }).then(response => response.json().then(json => {
            try{
                if(json.code == 200){
                    //window.location.href = accountHome;
                    console.log(json);
                }

            }catch (error){
                 throw new Error(error)
                loginErrorMessage.classList.toggle("login-error-visible");
            }

        }))
    }
    else{
        fetch(nodeSignIn, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                user_name: usernameInput,
                password: passwordInput
                })
            }).then(response => response.json()).then(json  => {

            try{
                if(json.code == 200){
                    //Replace magpieHome with /magpie when done
                    window.location.href = magpieHome;
                }

            }catch (error){
                 throw new Error(error)
                loginErrorMessage.classList.toggle("login-error-visible");
            }
        })
    }
}

//Sets the email contact on the error message for the particular node's admin/contact
function setNodeAdminEmail(){
    const githubURL = "{{ node_registry_url }}";
    let currentURL = window.location.href;
    let contactEmail = document.getElementById("nodeAdminEmail");


    fetch(githubURL).then(resp => resp.json()).then(json => {
        var node_keys = Object.keys(json);

        node_keys.forEach((key, index) => {
            if(key.links){
                key.links.forEach((link) =>{
                    if(link.rel && link.rel === "service"){
                        if(link.href in currentURL){
                            console.log(link.href);
                            contactEmail.setAttribute("href", "mailto:" + link.href);
                        }

                    }
                })
            }
        })

    })
}