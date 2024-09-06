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
            "user_name": "",
            "password": "",
            "provider_name":"ziggurat"
            })
        }).then(response   =>  {
            authCookie = getAuthTkt(response);
            if(authCookie != null){
                //TODO replace username with variable "usernameInput"
                storeUserDetails("alexandercyu", authCookie);
            }
    })
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