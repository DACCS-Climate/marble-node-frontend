document.addEventListener("DOMContentLoaded", function () {

    var accountButton = document.getElementById('menuItemAccount');
    var settingsButton = document.getElementById('menuItemSettings');
    var helpButton = document.getElementById('menuItemHelp');
    var logoutButton = document.getElementById("accountLogoutButton");
    var currentPath = window.location.pathname;

    if (currentPath.includes("account.html")) {
        accountButton.classList.add("nav-item-highlight");
        settingsButton.classList.remove("nav-item-highlight");
        helpButton.classList.remove("nav-item-highlight");
    } else if (currentPath.includes("settings.html")) {
        accountButton.classList.remove("nav-item-highlight");
        settingsButton.classList.add("nav-item-highlight");
        helpButton.classList.remove("nav-item-highlight");
    } else if (currentPath.includes("help.html")) {
        accountButton.classList.remove("nav-item-highlight");
        settingsButton.classList.remove("nav-item-highlight");
        helpButton.classList.add("nav-item-highlight");
    } else {
        accountButton.classList.remove("nav-item-highlight");
        settingsButton.classList.remove("nav-item-highlight");
        helpButton.classList.remove("nav-item-highlight");
    }
    displayAccountMenuDetails();
    logoutButton.addEventListener("click",signout);
    checkUserAuthenticated();
})