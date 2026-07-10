document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split("/").pop();
    for (elem of document.getElementsByClassName("menu-item")) {
        if (elem.getAttribute("href") === currentPath) {
            elem.classList.add("highlight")
        }
    }
    const dropdownContent = document.getElementById("menu-dropdown-content");
    document.getElementById("menu-dropdown").addEventListener("click", (e) => {
        e.stopPropagation() // doesn't trigger the document click listener (below)
        dropdownContent.classList.toggle("collapsed");
    })
    document.addEventListener("click", (e) => {
        if (! e.target.closest("#menu-dropdown-content")) {
            dropdownContent.classList.add("collapsed")
        }
    })
    document.getElementById("logout").addEventListener("click", (e) => {
        magpieFetch("/signout").then(resp => {
            if (resp.ok) {
                window.location.assign("{{ configs['login_home'] }}"); // no login-from param
            }
        })
    })
})
