document.addEventListener("DOMContentLoaded", function () {
    var sessionDetailsJSON = getSessionDetails();
    var editEmailCaption = document.getElementById("emailCaptionNodeName");

    //Call getBaseURL function from main.js
    getBaseURL(sessionDetailsJSON).then(baseURL => {
        setNodeName(baseURL,editEmailCaption)
    });

    //Set username and email in Settings page
    setUserDetails();

    var saveChangesButton = document.getElementById("buttonSave");
    saveChangesButton.addEventListener("click",updateUserDetails);

    var deleteUserButton = document.getElementById("deleteUserButton");
    deleteUserButton.addEventListener("click",updateUserDetails);
})

function setUserDetails(){
    //TODO Remove placeholder username once design is approved
    var placeholder_username = "XYZ";

    var usernameElement = document.getElementById("settingsUsername");
    var passwordElement = document.getElementById("settingsEditPassword");
    var emailTextbox = document.getElementById("settingsEditEmail");

    if(sessionStorage.getItem("username")){
        usernameElement.innerText = sessionStorage.getItem("username");
    }
    else{
        usernameElement.innerText = placeholder_username;
    }

    emailTextbox.value = sessionStorage.getItem("email");
}

function updateUserDetails(){
    var username = document.getElementById("settingsUsername")
    var password = document.getElementById("settingsEditPassword");
    var email = document.getElementById("settingsEditEmail");

    if (password != ""){
        updateUserPassword(username, password);
    }

    updateUserEmail(username, email);
}

function updateUserEmail(username, email){
    const updateURLFragment = "users/" + username;
    const updateURL =  nodeURL + "users/" + username;

    //TODO Replace updateURL with updateURL Fragment
    fetch(updateURL, {
        method: "PATCH",
        body:{
            "user_name":username,
            "email": email,
            "status": 1
        }
    })
}

function updateUserPassword(username, password){
    const updateURLFragment = "users/" + username;
    const updateURL =  nodeURL + "users/" + username;

    //TODO Replace updateURL with updateURL Fragment
    fetch(updateURL, {
        method: "PATCH",
        body:{
            "user_name": username,
            "password": password,
            "status": 1
        }
    })
}