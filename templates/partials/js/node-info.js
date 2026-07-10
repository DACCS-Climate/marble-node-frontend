document.addEventListener('DOMContentLoaded', () => { 
    fetch("{{ configs['version_path'] }}").then(res => res.json()).then(json => {
        document.getElementById("version").innerText = json.version;
        const release = new Date(json.release_time).toLocaleTimeString(undefined, {
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric"
        });
        document.getElementById("release-time").innerText = release;
    })
})