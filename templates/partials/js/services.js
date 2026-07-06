
document.addEventListener('DOMContentLoaded', () => { 
    fetch("{{ configs['services_path'] }}").then(res => res.json()).then(json => {
        const template = document.getElementById("service-template");
        const serviceContainer = document.getElementById("services");
        const rel2title = {
            "service-doc": "Documentation",
            "service-desc": "Description"
        }        
        for (service of json["services"]) {
            if (! service.types.includes("management")) {
                const card = document.importNode(template.content, true);
                card.querySelector(".service-card-title").innerText = service.name;
                card.querySelector(".service-card-version-content").innerText = service.version;
                card.querySelector(".service-card-description").innerText = service.description;
                const links = card.querySelector(".service-card-links");
                for (link of service.links) {
                    const anchor = document.createElement("a");
                    anchor.classList.add("service-link");
                    const span = document.createElement("span");
                    span.innerText = link.title || rel2title[link.rel] || link.rel;
                    anchor.appendChild(span);
                    for (const [key, value] of Object.entries(link)) {
                        anchor.setAttribute(key, value)
                    }
                    links.appendChild(anchor)
                }
                services.appendChild(card);
            }
        }
    })
});

