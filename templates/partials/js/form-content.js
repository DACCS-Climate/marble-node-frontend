document.addEventListener('DOMContentLoaded', () => { 
    for (elem of document.getElementsByClassName("password-show-toggle")) {
        elem.addEventListener("click", (e) => {
            const pwdInput = e.target.previousElementSibling;
            pwdInput.setAttribute("type", pwdInput.getAttribute("type") === "text" ? "password" : "text");
        }) 
    }
});
