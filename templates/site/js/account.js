document.addEventListener("DOMContentLoaded", function () {
    displayAccountDetails();
});

function displayAccountDetails(){
    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");

    var hiddenUsername = document.getElementById("hiddenUsername");
    var hiddenEmail = document.getElementById("hiddenEmail");

    console.log(hiddenUsername.value)
    console.log(hiddenEmail.value)
    h3Header.innerText = "Hi " + hiddenUsername.value;
    accountUsername.innerText = hiddenUsername.value;
    accountEmail.innerText = hiddenEmail.value;

}