function login(){
    const nodeSignInURLFragment = "/magpie/signin";
    const accountHome = "account.html";

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
                    setClientSessionItem("username", usernameInput);
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

function getNodeRegistry() {
    const githubURL = "{{ node_registry_url }}";
    return fetch(githubURL).then(response => {
        return response.json().then(json => {
            return json;
        })
    })
}
function getBaseURL(json){
    return json.then( sessionData =>
    {
        var urlArray = sessionData.url.split("/magpie");
        return urlArray[0];
    })
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
function getUserDetails(username){
    const loggedUserURLFragment = "/magpie/users/" + username;
    return fetch(loggedUserURLFragment,{
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
            }
        }).then(response => {return response.json()}).then(json =>{
            return json;
        })
}

function storeUserDetails(){
    var username = getClientSessionItem("username");

    getUserDetails(username).then(json => {
        localStorage.setItem("email", json.user["email"]);
    })
}

function setClientSessionItem(sessionItemName, sessionItem){
    localStorage.setItem(sessionItemName, sessionItem);
}

function getClientSessionItem(sessionItem){
    var retrievedSessionItem = localStorage.getItem(sessionItem) ;
    return retrievedSessionItem
}

function updateUserDetails(){
    var username = getClientSessionItem("username");
    var sessionEmail = getClientSessionItem("email");
    var password = document.getElementById("userPassword").value;
    var email = document.getElementById("settingsEditEmail").value;

    showSpinner()

    if (password != "" || password != null){
        updateUserPassword(username, password);
    }

    if(email != sessionEmail && email != null){
        updateUserEmail(username, email);
    }
}

function updateUserEmail(username,email){
    const updateURLFragment = "/magpie/users/"  + username;

    fetch(updateURLFragment, {
        method: "PATCH",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "email": email
        })
    }).then(response => response.json()).then(json =>{
            if(json.code && json.code == 200){
                showSaveCheckmark()
            }
        })
}

function updateUserPassword(username, password){
    const updateURLFragment = "/magpie/users/" + username;

    fetch(updateURLFragment, {
        method: "PATCH",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            "password": password
        })
    }).then(response => response.json()).then(json =>{
            if(json.code && json.code == 200){
                showSaveCheckmark()
            }
        })
}

function deleteUser(){
    var username = getClientSessionItem("username");
    const deleteURLFragment = "/magpie/users/" + username;
    const loginHome = "index.html";

    fetch(deleteURLFragment,{
            method: "DELETE",
            headers: {
                "Accept": "application/json, text/plain",
                "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(json =>{

                    if(json.code == 200){
                        localStorage.clear();
                        window.location.href = loginHome;
                    }

                })
}

//TODO: Placeholder function for deleting a user from a specific node
// Depends on functionality from a future feature that will enable a user to see all the nodes they are registered on
function deleteNodeUser(username, nodeName){
    const deleteURLFragment = "/magpie/users/" + username;

    fetch(deleteURLFragment,{
            method: "DELETE",
            headers: {
                "Accept": "application/json, text/plain",
                "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(json =>{

                    if(json.code == 200){
                        localStorage.clear();
                    }

                })
}

//Page functionality and page details functions
//---------------------------------------------

//TODO Check if all usages of this function are replaced with the config file rendering
//Matches base url of the current node with the node registry and sets the email for the reset password modal and
//the error message for a login error
function setNodeAdminEmail(){
    const githubURL = "{{ node_registry_url }}";
    const sessionURLFragment = "/magpie/session";
    let passwordResetEmail = document.getElementById("passwordResetEmail");

    getSessionDetails().then(sessionJSON => {
        var currentNodeURL = sessionJSON.url.replace(sessionURLFragment, "");
        fetch(githubURL).then(resp => resp.json()).then(json => {
            var node_keys = Object.keys(json);
            node_keys.forEach((key, index) => {
                if (json[key].links) {
                    json[key].links.forEach((link) => {
                        if (link.rel && link.rel === "service") {
                            if (currentNodeURL.includes(link.href)) {
                                passwordResetEmail.setAttribute("href", "mailto:" + json[key].contact);
                                passwordResetEmail.innerText = json[key].contact;
                            }
                        }
                    })
                }
            })
        })
    })
}
//TODO Check if all usages of this function are replaced with the config file rendering
function setNodeName(node_url, elementID){

    getNodeRegistry().then(json => {
        var node_keys = Object.keys(json);
        let node_info;

        node_keys.forEach(key => {
        node_info = json[key];
        Object.entries(node_info).forEach(([node_details_key, node_details]) => {

                if(node_details_key == "links"){
                    node_info[node_details_key].forEach((link) => {

                        if(link.rel == "service"){
                            if(node_url == link.href){
                                elementID.innerText = node_info["name"];
                            }
                        }
                    })
                }
            })
        })
    })
}

function getNodeServices(){
    const servicesURLFragment = "/services";

    return fetch(servicesURLFragment,{
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
            }
        }).then(response => {return response.json()}).then(json =>{
            return json;
        })
}

function displayAccountDetails(){
    var username = getClientSessionItem("username");

    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");


    getUserDetails(username).then(json => {
        h3Header.innerText = "Hi, " + json.user["user_name"];
        accountUsername.innerText = json.user["user_name"];
        accountEmail.innerText = json.user["email"];
    })
}

function displayAccountMenuDetails(){
    var username = getClientSessionItem("username");
    var dropdownMenuTitle = document.getElementById("dropdownMenuTitle");

    getUserDetails(username).then(json => {
        dropdownMenuTitle.innerText = json.user["user_name"];
    })
}

//Sets email link on an anchor tag
function setNodeContact(node_url, elementID){
    getNodeRegistry().then(json => {
        var node_keys = Object.keys(json);
        let node_info;

        node_keys.forEach(key => {
        node_info = json[key];
        Object.entries(node_info).forEach(([node_details_key, node_details]) => {

                if(node_details_key == "links"){
                    node_info[node_details_key].forEach((link) => {

                        if(link.rel == "service"){
                            if(node_url == link.href){
                                elementID.href = "mailto:" + node_info["contact"];
                                elementID.innerText = node_info["contact"];
                            }
                        }
                    })
                }
            })
        })
    });
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
    const loginHome = "index.html"
    var sessionDetails = getSessionDetails();

    getBaseURL(sessionDetails).then(data => {

        var signoutURLFragment = "/magpie/signout";
        fetch(signoutURLFragment).then(response => response.json()).then(json => {
            if(json.code && json.code == 200){
                localStorage.clear();
                window.location.href = loginHome;
            }
        })
    });
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