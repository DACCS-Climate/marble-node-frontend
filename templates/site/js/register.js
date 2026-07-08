const showOtherSelectOption = (select, other) => {
    other.removeAttribute("required");
    if (select.value === "__other") {
        other.classList.remove("hidden");
        if (select.hasAttribute("required")) {
            other.setAttribute("required", true);
        }
    } else {
        other.classList.add("hidden");
    }
}

const submitForm = async (e) => {
    e.submitter.setAttribute("disabled", true);
    e.preventDefault();

    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");
    successMessage.innerText = "";
    errorMessage.innerText = "";

    const password = document.getElementById("user-password");
    const passwordConfirm = document.getElementById("user-password-confirmation");
    if (password.value != passwordConfirm.value) {
        passwordConfirm.setCustomValidity("Password confirmation does not match");
        passwordConfirm.reportValidity();
        [password, passwordConfirm].forEach(elem => elem.addEventListener("input", () => {
            document.getElementById("user-password-confirmation").setCustomValidity("");
        }, {once: true}))
    }
    const body = {
        user_name: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: password.value
    }
    magpieFetch("/register/users", {
        method: "POST",
        body: JSON.stringify(body)
    }).then(resp => {
        if (resp.ok) {
            successMessage.innerText = "User registration successfully submitted"
        } else {
            return resp.json()
        }
    }).then(json => {
        if (json) {
            errorMessage.innerText = json.detail || "Registration Error";
        }
    }).catch(error => {
        errorMessage.innerText = "Registration Error";
    }).finally(() => {
        e.submitter.removeAttribute("disabled");
    })
}

document.addEventListener('DOMContentLoaded', () => { 
    // hide register link when already on login page
    document.getElementById("register-button").classList.add("hidden");

    for (let elem of document.getElementsByClassName("select-other")) {
        const selectFor = document.getElementById(elem.getAttribute("data-other-for"));
        selectFor.addEventListener("change", e => showOtherSelectOption(e.target, elem))
        showOtherSelectOption(selectFor, elem)
    }

    document.forms[0].addEventListener("submit", submitForm);
})

{% include "partials/js/form-content.js" %}
