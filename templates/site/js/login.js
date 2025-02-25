function set_login_mode(mode) {
    divLoginContentRight = document.getElementById("loginContentRight");
    if (mode === "provider") {
        document.documentElement.style.setProperty("--login-email-only", "none");
        document.documentElement.style.setProperty("--login-provider-only", "flex");
        divLoginContentRight.classList.replace("login-provider-background", "login-email-background")
    } else {
        document.documentElement.style.setProperty("--login-email-only", "flex");
        document.documentElement.style.setProperty("--login-provider-only", "none");
        divLoginContentRight.classList.replace("login-email-background", "login-provider-background")
        document.getElementById("hiddenProviderName").value = "ziggurat"
    }
}

function login(){
    const loginErrorMessage = document.getElementById("loginErrorMessage");
    const termsAndConditionsCheckbox = document.getElementById("termsAndConditionsCheckbox");

    if (termsAndConditionsCheckbox && !termsAndConditionsCheckbox.checked) {
        loginErrorMessage.innerText = "Please accept the terms and conditions before logging in.";
        return
    }

    fetch("{{ configs['magpie_path'] }}/signin", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_name: document.getElementById("userName").value,
            password: document.getElementById("userPassword").value,
            provider_name: document.getElementById("hiddenProviderName").value
       })
    }).then(response => response.json()).then(json => {
        if (json.code === 200) {
            window.location.href = accountHome;
        } else {
            if (json.detail) {
                loginErrorMessage.innerText = json.detail;
            } else {
                loginErrorMessage.innerText = "Incorrect username or password!";
            }
        }
    })
}

document.addEventListener("DOMContentLoaded", function () {
    var signInButton =  document.getElementById("buttonSignIn");
    var emailButton = document.getElementById("buttonSelectEmail");
    var userPasswordTextbox = document.getElementById("userPassword");

    signInButton.addEventListener('click', (event) => {
        login();
    })

    userPasswordTextbox.addEventListener('keypress', (event) => {
        if(event.code == "Enter"){
            login();
        }
    })

    emailButton.addEventListener('click', (event) => {
        set_login_mode("email");
    })

    set_login_mode("email");
})
