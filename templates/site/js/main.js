const loginHome = `{{ current_login_home }}`;
const accountHome = "index.html";

//User functions
//--------------

function displayAccountMenuDetails(){
    var dropdownMenuTitle = document.getElementById("dropdownMenuTitle");

    window.session_info.then(json => {
        dropdownMenuTitle.innerText = json.user["user_name"];
    })  
}

function displayAccountDetails(){
    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");
    
    window.session_info.then(json => {
        h3Header.innerText = "Hi " + json.user["user_name"];
        accountUsername.innerText = json.user["user_name"];
        accountEmail.innerText = json.user["email"];
    })
}

function displaySettingsPageUserDetails(){
    var usernameElement = document.getElementById("settingsUsername");
    var emailTextbox = document.getElementById("settingsEditEmail");

    window.session_info.then(json => {
        usernameElement.innerText = json.user["user_name"];
        emailTextbox.value = json.user["email"];
    })
}

function updateUserDetails(){
    resetSaveButton();
    let bodyParams = {};
    const updateURLFragment = "/magpie/users/current";

    var password = document.getElementById("userPassword").value;
    var email = document.getElementById("settingsEditEmail").value;

    if((password != null && password != "")){
        bodyParams["password"] = password;
    }

    if((email != null && email != "")){
        bodyParams["email"] = email;
    }

    showSpinner()

    fetch(updateURLFragment, {
        method: "PATCH",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyParams)
    }).then(response => response.json()).then(json =>{
            if(json.code && json.code == 200){
                showSaveCheckmark();
            }
            else{
                showSaveError();
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