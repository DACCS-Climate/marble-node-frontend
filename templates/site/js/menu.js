function displayAccountMenuDetails(){
    var dropdownMenuTitle = document.getElementById("dropdownMenuTitle");

    window.session_info.then(json => {
        dropdownMenuTitle.innerText = json.user["user_name"];
    })  
}

function signout(){
    var signoutURLFragment = "{{ configs['magpie_path'] }}/signout";
    fetch(signoutURLFragment).then(response => response.json()).then(json => {
        if(json.code && json.code == 200){
            window.location.href = loginHome;
        }
    })
}

document.addEventListener("DOMContentLoaded", function () {
    var accountButton = document.getElementById('menuItemAccount');
    var settingsButton = document.getElementById('menuItemSettings');
    var helpButton = document.getElementById('menuItemHelp');
    var logoutButton = document.getElementById("accountLogoutButton");
    var currentPath = window.location.pathname;

    if (currentPath.endsWith("index.html")) {
        accountButton.classList.add("nav-item-highlight");
    } else if (currentPath.includes("settings.html")) {
        settingsButton.classList.add("nav-item-highlight");
    } else if (currentPath.includes("help.html")) {
        helpButton.classList.add("nav-item-highlight");
    }
    displayAccountMenuDetails()
    logoutButton.addEventListener("click", signout);
})