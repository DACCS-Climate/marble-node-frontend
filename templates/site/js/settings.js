document.addEventListener("DOMContentLoaded", function () {
    //Set username and email in Settings page
    setUserAccountDetails(displaySettingsPageUserDetails);

    //Set node name in email hint caption
    setCaptionNodeName("emailCaptionNodeName");

    resetSaveButton();

    var saveChangesButton = document.getElementById("buttonSave");
    saveChangesButton.addEventListener("click",updateUserDetails);

    var deleteUserButton = document.getElementById("deleteUserButton");
    deleteUserButton.addEventListener("click",deleteUser);
})