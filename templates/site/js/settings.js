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

document.addEventListener("DOMContentLoaded", function () {
    //Set username and email in Settings page
    displaySettingsPageUserDetails()

    var saveChangesButton = document.getElementById("saveUserChangesButton");
    saveChangesButton.addEventListener("click", updateUserDetails);
})
