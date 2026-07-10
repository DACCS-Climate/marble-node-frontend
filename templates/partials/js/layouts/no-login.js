document.addEventListener('DOMContentLoaded', () => {
    window.magpieSession.then(json => { 
        for (link of document.querySelectorAll("#login-register a")) {
            if (json.authenticated) {
                link.classList.add("hidden");
            }
        }
    })
    {# TODO: there has to be a better way to check if user-registration is enabled. #}
    magpieFetch("/register/users").then(resp => {
        if (resp.status === 404) {
            document.getElementById("register-button").classList.add("hidden");
        }
    })
})
