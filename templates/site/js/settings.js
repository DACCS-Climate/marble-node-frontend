document.addEventListener("DOMContentLoaded", function () {
    //Set username and email in Settings page
    setUserDetails();

    //Set node name in email hint caption
    setCaptionNodeName("emailCaptionNodeName");

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

    getUserDetails().then(json => {
        if(json.user["user_name"]){
            usernameElement.innerText = json.user["user_name"];
        }
        else{
            usernameElement.innerText = placeholder_username;
        }

        emailTextbox.value = json.user["email"];
        })
}