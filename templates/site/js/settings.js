document.addEventListener("DOMContentLoaded", function () {
    //Set username and email in Settings page
    setUserDetails();

    //Set node name in email hint caption
    setCaptionNodeName("emailCaptionNodeName");

    resetSaveButton();

    var saveChangesButton = document.getElementById("buttonSave");
    saveChangesButton.addEventListener("click",updateUserDetails);

    var deleteUserButton = document.getElementById("deleteUserButton");
    deleteUserButton.addEventListener("click",deleteUser);
})

function setUserDetails(){
    var usernameElement = document.getElementById("settingsUsername");
    var emailTextbox = document.getElementById("settingsEditEmail");

    getUserDetails().then(json => {
        usernameElement.innerText = json.user["user_name"];
        emailTextbox.value = json.user["email"];
        })
}