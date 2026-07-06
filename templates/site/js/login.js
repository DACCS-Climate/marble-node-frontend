document.addEventListener('DOMContentLoaded', () => { 
    document.getElementById("login").addEventListener("submit", (e) => {
        e.submitter.setAttribute("disabled", true)
        e.preventDefault();
        const isMarbleLogin = document.getElementById("login-panel").classList.contains("marble");
        const formData = new FormData(e.target);
        const body = {
            user_name: formData.get("user_name"),
            provider_name: isMarbleLogin ? "ziggurat" : formData.get("provider"),
        }
        if (isMarbleLogin) {
            body["password"] = formData.get("password");
        }
        magpieFetch("/signin", {
            method: "POST",
            body: JSON.stringify(body)
        }).then(resp => {
            if (resp.ok) {
                const params = new URLSearchParams(document.location.search);
                window.location.replace(params.get("login-from") || "home.html")
            } else {
                return resp.json()
            }
        }).then(json => {
            if (json) {
                document.getElementById("error-message").innerText = json.detail || "Login Error";
            }
        }).catch(error => {
            document.getElementById("error-message").innerText = "Login Error";
            e.submitter.removeAttribute("disabled")
        })
    })

    {% if configs["login_providers"]["enable"] %}
    {# Note: sets the disabled attribute so that it is not considered for client side validation #}
    document.getElementById("external-login").addEventListener("click", (e) => {
        window.location.hash = "external";
        document.getElementById("login-panel").classList.replace("marble", "external");
        document.getElementById("user-password").setAttribute("disabled", "true")
        document.getElementById("provider").removeAttribute("disabled")

    })
    document.getElementById("marble-login").addEventListener("click", (e) => {
        window.location.hash = "";
        document.getElementById("login-panel").classList.replace("external", "marble");
        document.getElementById("provider").setAttribute("disabled", "true")
        document.getElementById("user-password").removeAttribute("disabled")
    })
    if ( window.location.hash === "#external" ) {
        document.getElementById("external-login").click();
    }
    {% endif %}
});

{% include "partials/js/form-content.js" %}
