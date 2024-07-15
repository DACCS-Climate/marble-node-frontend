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

    //Set contact email for node admin on the error message when login is incorrect.  Allows user to contact node
    //admin to create account
    setNodeAdminEmail();
})

//Swap Select Provider and Sign In With Email buttons
//Swap background images for right side for Provider and Email
//Swap Provider image and name area
//Make password input field visible again
function loginModeEmail(){
    var divProviderTitle = document.getElementById("divProviderTitle");
    var divPasswordInput = document.getElementById("divPasswordInput");
    var hiddenProviderName = document.getElementById("hiddenProviderName");
    var divLoginContentRight = document.getElementById("loginContentRight");
    var emailButton = document.getElementById("divEmailButton");
    var providerButton = document.getElementById("divProviderButton");
    var loginTypeTitle = document.getElementById("loginTypeTitle");
    var chooseDifferentProvider = document.getElementById("chooseDifferentProvider");
    var divForgotPassword = document.getElementById("divForgotPassword");

    hiddenProviderName.value = ""; //Erase provider name stored in the hidden text field
    divLoginContentRight.classList.replace("login-email-background", "login-provider-background");
    loginTypeTitle.innerText = "Already have an account with a provider?";

    if(chooseDifferentProvider.classList.contains("display-flex")){
        chooseDifferentProvider.classList.replace("display-flex", "display-none");
    }

    if(divProviderTitle.classList.contains("display-flex")){
        divProviderTitle.classList.replace("display-flex", "display-none");
    }

    if(emailButton.classList.contains("display-flex")){
        emailButton.classList.replace("display-flex", "display-none");
    }

    if(providerButton.classList.contains("display-none")){
        providerButton.classList.replace("display-none", "display-flex");
    }

    if(divPasswordInput.classList.contains("display-none")){
        divPasswordInput.classList.replace("display-none", "display-flex");
    }

    divForgotPassword.classList.remove(...divForgotPassword.classList);
    divForgotPassword.classList.add("display-flex");
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
                else{
                    if(loginErrorMessage.classList.contains("display-none")){
                        loginErrorMessage.classList.toggle("display-flex");
                    }
                }

            }catch (error){
                console.log(error);
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
                    //window.location.href = accountHome;
                    console.log(json);
                }
                else{
                    if(loginErrorMessage.classList.contains("display-none")){
                        loginErrorMessage.classList.toggle("display-flex");
                    }
                }

            }catch (error){
                 //throw new Error(error)
                console.log(error);

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