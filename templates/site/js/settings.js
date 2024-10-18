document.addEventListener("DOMContentLoaded", function () {
    //Set username and email in Settings page
    displaySettingsPageUserDetails()
    resetSaveButton();

    var saveChangesButton = document.getElementById("saveUserChangesButton");
    saveChangesButton.addEventListener("click",updateUserDetails);

    var deleteUserButton = document.getElementById("deleteUserButton");
    deleteUserButton.addEventListener("click",deleteUser);
})
