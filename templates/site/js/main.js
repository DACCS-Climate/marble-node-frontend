const loginHome = `{{ current_login_home }}`;
const accountHome = "account.html";

function login(){
    const nodeSignInURLFragment = "/magpie/signin";

    const usernameInput = document.getElementById("userName").value;
    const passwordInput = document.getElementById("userPassword").value;
    const providerInput = document.getElementById("hiddenProviderName").value

    let loginErrorMessage = document.getElementById("loginErrorMessage");

    if(providerInput){
        const providerSignInURLFragment = "/magpie/providers/" + providerInput + "/signin";

        fetch(providerSignInURLFragment, {
            method: "POST",
            headers:{
                 Accept: "application/json, text/plain",
                "Content-Type": "application/json"
            }
        }).then(response => response.json().then(json => {

            try{
                if(json.code == 200){
                    window.location.href = accountHome;
                }
                else{
                    if(loginErrorMessage.classList.contains("display-none")){
                        loginErrorMessage.classList.toggle("display-none");
                    }
                }

            }catch (error){
                console.log(error);
            }

        }))
    }
    else{
        fetch(nodeSignInURLFragment, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json"
                },
            body: JSON.stringify({
                user_name: usernameInput,
                password: passwordInput,
                provider_name:"ziggurat"
                })
            }).then(response => response.json().then(json  => {

            try{
                if(json.code == 200){
                    window.location.href = accountHome;
                }
                else{
                    if(loginErrorMessage.classList.contains("display-none")){
                        loginErrorMessage.classList.toggle("display-none");
                    }
                }

            }catch (error){
                console.log(error);

            }
        }))
    }
}

function getSessionDetails(){
    const sessionURLFragment = "/magpie/session";

    return fetch(sessionURLFragment,{
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
            }
        }).then(response => { return response.json().then(json =>{
                return json;
            })
        })
}

//User functions
//--------------
function checkUserAuthenticated(){
    getSessionDetails().then(json => {
        if(json.code && json.code == 200) {
            if (json.authenticated === false) {
                window.location.href = loginHome;
            }
        }
    })
}

function getUserDetails(){
    const loggedUserURLFragment = "/magpie/users/current";
    return fetch(loggedUserURLFragment,{
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
            }
        }).then(response => {return response.json()})
}

function updateUserDetails(){
    const updateURLFragment = "/magpie/users/current";

    var password = document.getElementById("userPassword").value;
    var email = document.getElementById("settingsEditEmail").value;

    showSpinner()

    fetch(updateURLFragment, {
        method: "PATCH",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "password": password,
            "email": email
        })
    }).then(response => response.json()).then(json =>{
            if(json.code && json.code == 200){
                showSaveCheckmark()
            }
        })

}

function deleteUser(){
    const deleteURLFragment = "/magpie/users/current";

    fetch(deleteURLFragment,{
            method: "DELETE",
            headers: {
                "Accept": "application/json, text/plain",
                "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(json =>{

                    if(json.code == 200){
                        window.location.href = loginHome;
                    }

                })
}

//TODO: Placeholder function for deleting a user from a specific node
// Depends on functionality from a future feature that will enable a user to see all the nodes they are registered on
function deleteNodeUser(nodeName){
    const deleteURLFragment = "/magpie/users/current";

    fetch(deleteURLFragment,{
            method: "DELETE",
            headers: {
                "Accept": "application/json, text/plain",
                "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(json =>{

                    if(json.code == 200){
                       
                    }

                })
}

//Page functionality and page details functions
//---------------------------------------------
function setNodeAdminEmail(){
    var nodeEmailHref = `mailto:{{ current_node_admin_email }}`;
    let passwordResetEmail = document.getElementById("passwordResetEmail");
    passwordResetEmail.setAttribute("href", nodeEmailHref);
    passwordResetEmail.innerText = `{{ current_node_admin_email }}`;
}

function setCaptionNodeName(element_id){
    var captionElement = document.getElementById(element_id);
    captionElement.innerText = `{{ current_node_name }}`;
}

//Sets email link on an anchor tag
function setNodeContact(elementID){
    elementID.href = "mailto:" + `{{ current_node_admin_email }}`;
    elementID.innerText = `{{ current_node_admin_email }}`;
}

function getNodeServices(){
    const servicesURLFragment = "/services";

    return fetch(servicesURLFragment,{
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
            }
        }).then(response => {return response.json()})
}

function displayAccountDetails(){
    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");


    getUserDetails().then(json => {
        h3Header.innerText = "Hi " + json.user["user_name"];
        accountUsername.innerText = json.user["user_name"];
        accountEmail.innerText = json.user["email"];
    })
}

function displayAccountMenuDetails(){
    var dropdownMenuTitle = document.getElementById("dropdownMenuTitle");

    getUserDetails().then(json => {
        dropdownMenuTitle.innerText = json.user["user_name"];
    })
}

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

function signout(){
    var signoutURLFragment = "/magpie/signout";
        fetch(signoutURLFragment).then(response => response.json()).then(json => {
            if(json.code && json.code == 200){
                window.location.href = loginHome;
            }
        })
}

//Node functions

//TODO Add function that adds a user to a node
// Function takes node name, username and user email
// on click it sends an email to the node admin with the user's details and an automated message requesting and account
// be made on the given node.
// The return should be sent to the user's email either with a token that authenticates them or a request to set a password
function createNode(){

}

//TODO Add function that removes a user from a node
function deleteNode(){

}