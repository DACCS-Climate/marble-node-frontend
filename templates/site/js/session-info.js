window.session_info = fetch("{{ configs['magpie_path'] }}/session", {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        }
    }).then(response => {return response.json()})

window.session_info.then(json => {
    if (json.authenticated && window.location.pathname.endsWith(loginHome)) {
        window.location.href = accountHome;
    } else if (!json.authenticated && !window.location.pathname.endsWith(loginHome)) {
        window.location.href = loginHome;
    }
})
