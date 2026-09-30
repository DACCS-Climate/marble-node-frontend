const setRequiredOnLabels = () => {
    for (elem of document.querySelectorAll("label[for]")) {
        const labelable = document.getElementById(elem.getAttribute("for"));
        if (labelable && labelable.getAttribute("required") !== null) {
            elem.classList.add("required")
        }
    }
}

document.addEventListener('DOMContentLoaded', () => { 
    for (elem of document.getElementsByClassName("password-show-toggle")) {
        elem.addEventListener("click", (e) => {
            const pwdInput = e.target.previousElementSibling;
            pwdInput.setAttribute("type", pwdInput.getAttribute("type") === "text" ? "password" : "text");
        }) 
    }
    setRequiredOnLabels()
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const elem = document.activeElement
        if (elem.tagName === "INPUT" && elem.getAttribute("type") === "checkbox") {
            e.preventDefault();
            elem.checked = !elem.checked;
        }
    }
})
