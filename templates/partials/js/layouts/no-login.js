document.addEventListener('DOMContentLoaded', () => {
    window.magpieSession.then(json => {            
        const loginButton = document.getElementById("login-button")
        if (json.authenticated) {
            loginButton.classList.add("hidden")
        } else {
            loginButton.addEventListener("click", () => window.location.assign("{{ configs['login_home'] }}"))
        }
    })
})
