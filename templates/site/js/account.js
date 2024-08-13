/*TODO
Get the root url using /session to use with the endpoints in the function below

* */
//TODO: When done remove nodeURL
const nodeURL = "https://redoak.cs.toronto.edu";
//const nodeURL = "https://pavics.ouranos.ca";

//TODO Use user credentials (username) to access database (POSTGres) and get their details for Edit page

document.addEventListener("DOMContentLoaded", function () {
    //var signoutButton = document.getElementById("accountLogoutButton");
    //signoutButton.addEventListener("click",signout);

    //var updateButton = document.getElementById("settingsUpdateButton");
    //signoutButton.addEventListener("click",updateUserDetails);

    //var backButton = document.getElementById("settingsBackButton");
    //backButton.addEventListener("click", goPreviousPage);


    //testLogin();
    //var email = getNodeContact();
    //console.log(email);
    //var userDetailsJSON = getUserDetails();
    //displayAccountDetails(userDetailsJSON);


});

//TODO: When done remove this function.  This is only for mocking a user logging in
function testLogin(){

    const nodeSignIn = nodeURL + "/magpie/signin"
    //const nodeSignInFragment = "/magpie/signin"
        //const nodeSignIn = nodeURL + "/magpie/ui/login"
    console.log("testLogin");
    fetch(nodeSignIn, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
        body: {
            "user_name": "alexandercyu",
            "password": "a30nD@CCSUTlive",
            "provider":"ziggurat"
            }
        }).then(response => response.json()).then(json  => {
 console.log("signin");
            console.log(json);
        try{

            if(json.code == 200){

                //window.location.href = accountHome;
                //console.log("test login");

                console.log(json.code);
                //console.log(json);
                //console.log(user_name);
                //getSessionDetails();
                //getUserDetails();
                //return json.code;

            }
            else{
                return json.code;
            }

        }catch (error){
             //throw new Error(error)
            console.log("Error caught:")
            console.log(error);

        }
    })
}

function getNodeRegistry() {
    const githubURL = "{{ node_registry_url }}";
    return fetch(githubURL).then(response => {
        return response.json().then(json => {
            return json;
        })
    })
}

function getSessionDetails(){
    //TODO Remove sessionURL and use sessionURLFragment
    //TODO Remove nodeURL and use {MAGPIE_URL}
    const sessionURLFragment = "session";
    const sessionURL = nodeURL + "/magpie/session"
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

function getBaseURL(json){

    return json.then( sessionData =>
    {
        var urlArray = sessionData.url.split("/magpie");
        return urlArray[0];
    })
}

function getUserDetails(){
    //Use fetch to get user details from user/username endpoint in api
    //Use details returned to populate fields

    //TODO: When done remove loggedUserUrl and put loggedUserURLFragment for the fetch url.  base url should resolve when run from birdhouse
    //const loggedUserURL = nodeURL + "/magpie/users/alexandercyu";
    const loggedUserURL = nodeURL + "/magpie/users/current";
    const loggedUserURLFragment = "users/current";
    return fetch(loggedUserURL,{
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
            }
        }).then(response => {return response.json()}).then(json =>{
            console.log("user details");
            console.log(json);
            return json;
        })
}

function getNodeContact(nodeBaseURL){
    const githubURL = "{{ node_registry_url }}";
    return fetch(githubURL).then(response => {return  response.json()}).then(json => {
        var node_keys = Object.keys(json);
        node_keys.forEach((key, index) => {
            if(json[key].links){
                json[key].links.forEach((link) =>{
                    if(link.rel && link.rel === "service"){
                        if(nodeBaseURL.includes(link.href)){
                            /*
                            nodeAdminEmail.setAttribute("href", "mailto:" + json[key].contact);
                            passwordResetEmail.setAttribute("href", "mailto:" + json[key].contact);
                            passwordResetEmail.innerText = json[key].contact;
                            */
                            return json[key].contact
                        }
                    }
                })
            }
        })
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
                                elementID.href = node_info["contact"];
                                elementID.innerText = node_info["contact"];
                            }
                        }
                    })
                }
            })
        })
    });
}



function displayAccountDetails(json){
    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");
    var dropdownMenuTitle = document.getElementById("dropdownMenuTitle");

    json.then(userData => {
        h3Header.innerText = "Hi, " + userData["user"].user_name;
        accountUsername.innerText = userData["user"].user_name;
        accountEmail.innerText = userData["user"].email;
        dropdownMenuTitle.innerText = userData["user"].user_name;
    })
}


function updateUserDetails(username, email, password){
    const updateURLFragment = "users/" + username;
    const updateURL =  nodeURL + "users/" + username;

    fetch(updateURL, {
        method: "PATCH",
        body:{
            "user_name":username,
            "email": email,
            "password": password,
            "status": 1
        }
    })
}

function updateUserEmail(email){
    const updateURLFragment = "users/" + username;
    const updateURL =  nodeURL + "users/" + username;

    fetch(updateURL, {
        method: "PATCH",
        body:{
            "user_name":username,
            "email": email,
            "status": 1
        }
    })
}

function updateUserPassword(email){
    const updateURLFragment = "users/" + username;
    const updateURL =  nodeURL + "users/" + username;

    fetch(updateURL, {
        method: "PATCH",
        body:{
            "user_name":username,
            "password": password,
            "status": 1
        }
    })
}

function signout(){
    const loginHome = "index.html"
    let signoutURL;
    const signoutURLFragment = "signout";

    var sessionDetails = getSessionDetails();

    getBaseURL(sessionDetails).then(data => {
        signoutURL = data + "/magpie/signout";
        fetch(signoutURL).then(response => response.json()).then(json => {
            if(json.code && json.code == 200){
                window.location.href = loginHome;
            }
        })
    });
}

function goPreviousPage(){
    history.back();
}