const createUpdatableSetting = (updateButton, inputField, updateURL, updateMethod) => {
    const stateFunc = (e) => {
        if (!e.target.value || e.target.value === e.target.placeholder) {
            updateButton.setAttribute("data-state", "pristine");
        } else {
            updateButton.setAttribute("data-state", "dirty");
        }
    }
    updateButton.addEventListener("click", (e) => {
        updateButton.setAttribute("data-state", "loading");
        const body = {};
        body[inputField.name] = inputField.value;
        magpieFetch(updateURL, {
            method: updateMethod,
            body: JSON.stringify(body)
        }).then(resp => {
            if (resp.ok) {
                if (!inputField.classList.contains("password")) {
                    inputField.placeholder = inputField.value;
                }
                inputField.value = "";
                document.getElementById("error-message").innerText = "";
                updateButton.setAttribute("data-state", "uploaded");
            } else {
                updateButton.setAttribute("data-state", "error");
                return resp.json()
            }
        }).then(json => {
            if (json) {
                document.getElementById("error-message").innerText = json.detail || "Update Error";
            }
        }).catch(error => {
            document.getElementById("error-message").innerText = "Update Error";
            updateButton.setAttribute("data-state", "error");
        })
    });
    inputField.addEventListener("input", stateFunc);
    stateFunc({target: inputField});
}

document.addEventListener('DOMContentLoaded', () => {
    const page = document.getElementById("account-settings-page");
    const validLabels = ["user", "group", "network"];
    let currentHashLabel = (window.location.hash || `#${validLabels[0]}`).slice(1);
    if (!validLabels.includes(currentHashLabel)) {
        currentHashLabel = validLabels[0];
        window.location.hash = "";
    }
    page.setAttribute("data-form", currentHashLabel);
    validLabels.forEach(label => {
        document.getElementById(`${label}-settings`).addEventListener("click", (e) => {
            window.location.hash = label;
            page.setAttribute("data-form", label);
            document.getElementById("error-message").innerText = "";
        })
    })
    window.magpieSession.then(json => {
        document.getElementById("user-email").setAttribute("placeholder", json.user.email)
        createUpdatableSetting(document.getElementById("user-email-update"), document.getElementById("user-email"), `/users/${json.user.user_name}`, "PATCH")
        createUpdatableSetting(document.getElementById("user-password-update"), document.getElementById("user-password"), `/users/${json.user.user_name}`, "PATCH")
    })
    magpieFetch("/register/groups").then(resp => resp.json()).then(json => {
        window.magpieSession.then(sessionJson => {
            const currentGroups = sessionJson.user.group_names;
            const groups = json.group_names;
            const template = document.getElementById("group-template");
            const groupsContainer = document.getElementById("group-settings-container");
            groups.forEach(group_name => {
                const group = document.importNode(template.content, true);
                group.querySelector(".group-name").innerText = group_name;
                group.querySelector(".group-container").setAttribute("data-member", currentGroups.includes(group_name))
                groupsContainer.appendChild(group);
            })
            if (!groups.length) {
                if (window.location.hash === "#group") {
                    window.location.hash = validLabels[0];
                    page.setAttribute("data-form", validLabels[0]);
                }
                document.getElementById("group-settings").style.display = "none";
            }
        })
    })
    if (true) {
        // TODO: this disables the network options for now, implement this properly in the future!
        if (window.location.hash === "#network") {
            window.location.hash = validLabels[0];
            page.setAttribute("data-form", validLabels[0]);
        }
        document.getElementById("network-settings").style.display = "none";
    }
})

{% include "partials/js/form-content.js" %}
