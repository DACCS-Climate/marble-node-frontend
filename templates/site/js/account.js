document.addEventListener("DOMContentLoaded", function () {
    var signoutButton = document.getElementById("accountLogoutButton");
    signoutButton.addEventListener("click",signout);

    var updateButton = document.getElementById("settingsUpdateButton");
    updateButton.addEventListener("click",updateUserDetails);


    testLogin();
    //var email = getNodeContact();
    //console.log(email);
    var userDetailsJSON = getUserDetails();
    displayAccountDetails(userDetailsJSON);


});