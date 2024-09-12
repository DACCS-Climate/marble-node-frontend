/*TODO
Get the root url using /session to use with the endpoints in the function below

* */
//TODO: When done remove nodeURL
const nodeURL = "https://redoak.cs.toronto.edu";
const testNodeURL = "https://infomatics-dcs.cs.toronto.edu";
//TODO Use user credentials (username) to access database (POSTGres) and get their details for Edit page

document.addEventListener("DOMContentLoaded", function () {
    //var signoutButton = document.getElementById("accountLogoutButton");
    //signoutButton.addEventListener("click",signout);

    //var updateButton = document.getElementById("settingsUpdateButton");
    //signoutButton.addEventListener("click",updateUserDetails);




    testLogin();
    //testLogin2();

    //var email = getNodeContact();
    //console.log(email);
    //var userDetailsJSON = getUserDetails();
    //displayAccountDetails(userDetailsJSON);


});


//TODO: When done remove this function.  This is only for mocking a user logging in
//NOTE: the cookie "auth_tkt" is in the xmlhttprequest response and not the fetch response
function testLogin(){
    let authCookie;
    //NOTE:  In an actual login the username would come from the username field
    //const usernameInput = document.getElementById("userName").value;
    //const passwordInput = document.getElementById("userPassword").value;

    const nodeSignIn = nodeURL + "/magpie/signin";
    //const nodeSignInFragment = "/magpie/signin"

    console.log("testLogin");
    fetch(nodeSignIn, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
        credentials: 'include',
        body: JSON.stringify({
            user_name: "alexandercyu",
            password: "a30nD@CCSUTlive",
            provider_name:"ziggurat"
            })
        }).then(response   =>  {
            authCookie = getAuthTkt(response);
            if(authCookie != null){
                //TODO replace username with variable "usernameInput"
                storeUserDetails("alexandercyu", authCookie);
            }
    })
}

function login(){
    const usernameInput = document.getElementById("userName").value;
    const passwordInput = document.getElementById("userPassword").value;
    const providerInput = document.getElementById("hiddenProviderName").value

    const nodeSignInURLFragment = "magpie/signin";
    const nodeSignIn = nodeURL + "magpie/signin";
    const accountHome = "account.html";
    let loginErrorMessage = document.getElementById("loginError");

    //TODO Replace nodeSignIn in fetch with nodeSignInURLFragment variable when done
    //TODO Replace providersSignIn in fetch with providerSignInURLFragment variable when done
    if(providerInput){
        const providerSignInURLFragment = "magpie/providers/" + providerInput + "/signin";
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
                password: passwordInput,
                provider_name:"ziggurat"
                })
            }).then(response => response.json()).then(json  => {

            try{
                if(json.code == 200){

                    window.location.href = accountHome;
                    //console.log(json);
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

function getAuthTkt(response){
    let authTkt;
    var json = response.json();

    try{

        if(json.code == 200){

            var cookieArray = response.headers.getSetCookie();

            if(cookieArray.length > 0){
                authTkt = cookieArray[0];
                return authTkt;
            }
        }
        else{
            return null;
        }

    }
    catch (error){
         //throw new Error(error)
        console.log("Error caught:")
        console.log(error);

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
    //TODO Remove sessionURL and use sessionURLFragment
    //TODO Remove nodeURL and use {MAGPIE_URL}
    const sessionURLFragment = "session";
    const sessionURL = nodeURL + "/magpie/session"
    //const testSessionURL = testNodeURL + "/magpie/session"
    return fetch(sessionURL,{
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
function getUserDetails(username, cookie){
    //Use fetch to get user details from user/username endpoint in api
    //Use details returned to populate fields

    //TODO: When done remove loggedUserUrl and put loggedUserURLFragment for the fetch url.  base url should resolve when run from birdhouse
    const loggedUserURL = nodeURL + "/magpie/users/" + username;
    //const loggedUserURL = nodeURL + "/magpie/users/current";
    //const loggedUserURLFragment = "users/current";
    return fetch(loggedUserURL,{
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json",
            "Authorization": cookie, //TODO use Authorization header when request is same-origin
            }
        }).then(response => {return response.json()}).then(json =>{
            console.log("user details");
            console.log(json);
            return json;
        })
}

function storeUserDetails(username, cookie){
    getUserDetails(username, cookie).then(json => {
        json.then(userData => {
            sessionStorage.setItem("username", userData["user"].user_name);
            sessionStorage.setItem("email", userData["user"].email);
        })
    })

}

function deleteUser(username){
    const deleteURLFragment = "users/" + username;
    const deleteURL = nodeURL + "/magpie/users/" + username;

    fetch(deleteURL,{
            method: "DELETE",
            headers: {
                "Accept": "application/json, text/plain",
                "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(json =>{

                    if(json.code == 200){
                        sessionStorage.clear();
                        window.location.href = loginHome;
                    }

                })
}


//Page functionality and page details functions

//Matches base url of the current node with the node registry and sets the email for the reset password modal and
//the error message for a login error

function setNodeAdminEmail(){
    const githubURL = "{{ node_registry_url }}";
    const sessionURLFragment = "magpie/session";
    let nodeAdminEmail = document.getElementById("nodeAdminEmail");
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
                                nodeAdminEmail.setAttribute("href", "mailto:" + json[key].contact);
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

function displayAccountDetails(username, cookie){
    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");
    var dropdownMenuTitle = document.getElementById("dropdownMenuTitle");


    h3Header.innerText = "Hi, " + sessionStorage.getItem("username");
    accountUsername.innerText = sessionStorage.getItem("username");
    accountEmail.innerText = sessionStorage.getItem("email");
    dropdownMenuTitle.innerText = sessionStorage.getItem("username");

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
    let signoutURL;
    const signoutURLFragment = "signout";

    var sessionDetails = getSessionDetails();

    getBaseURL(sessionDetails).then(data => {
        //TODO Replace signoutURL with signoutURLFragment in the fetch
        signoutURL = data + "/magpie/signout";
        var signoutURLFragment = "signout";
        fetch(signoutURL).then(response => response.json()).then(json => {
            if(json.code && json.code == 200){
                sessionStorage.clear();
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