if (typeof window.requireLogin === "undefined") {
    // By default pages require user to be logged in
    window.requireLogin = true;
}

const loginHome = new URL("{{ configs['login_home'] }}", window.location)
loginHome.searchParams.set("login-from", window.location)

const JSONAPIFetch = async (url, opts = {}) => {
    opts.headers = {Accept: "application/json", "Content-Type": "application/json", ...opts.headers}
    return await fetch(url, opts)
}

const magpieFetch = async (path, opts = {}) => {
    return await JSONAPIFetch("{{ configs['magpie_path'] }}" + path, opts);
}

const marbleAPIFetch = async (path, opts = {}) => {
    return await JSONAPIFetch("{{ configs['marble_api_path'] }}/v1" + path, opts);
}

window.magpieSession = magpieFetch("/session", {
    method: "GET"
}).then(response => {
    if (!response.ok && window.requireLogin) {
        // redirect to login page if not signed in
        window.location.assign(loginHome);
    }
    return response.json();
})

window.magpieSession.then(json => {
    if (window.requireLogin && !json.authenticated) {
        window.location.assign(loginHome);
    }
})
