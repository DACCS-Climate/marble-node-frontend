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
    deleteUserButton.addEventListener("click",deleteUser);
})

function setUserDetails(){
    //TODO Remove placeholder username once design is approved
    const placeholder_username = "XYZ";

    var usernameElement = document.getElementById("settingsUsername");
    var emailTextbox = document.getElementById("settingsEditEmail");

    if(localStorage.getItem("username")){
        usernameElement.innerText = getClientSessionItem("username");
    }
    else{
        usernameElement.innerText = placeholder_username;
    }

    emailTextbox.value = localStorage.getItem("email");
}