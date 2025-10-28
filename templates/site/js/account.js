function displayAccountDetails(){
    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");
    
    window.session_info.then(json => {
        h3Header.innerText = "Hi " + json.user["user_name"];
        accountUsername.innerText = json.user["user_name"];
        accountEmail.innerText = json.user["email"];
    })
}

document.addEventListener("DOMContentLoaded", displayAccountDetails);
