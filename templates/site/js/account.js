document.addEventListener("DOMContentLoaded", function () {
    var signoutButton = document.getElementById("accountLogoutButton");
    signoutButton.addEventListener("click",signout);

    var updateButton = document.getElementById("settingsUpdateButton");
    updateButton.addEventListener("click",updateUserDetails);

    //var backButton = document.getElementById("settingsBackButton");
    //backButton.addEventListener("click", goPreviousPage);


    testLogin();
    //var email = getNodeContact();
    //console.log(email);
    var userDetailsJSON = getUserDetails();
    displayAccountDetails(userDetailsJSON);


});