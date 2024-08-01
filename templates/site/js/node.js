const converters = {
    "_default": (val) => val,
    "services": (val) => {
        const services_row = document.createElement("div");
        services_row.id = "nodeServices";
        services_row.classList.add("d-flex", "flex-wrap", "justify-content-between", "width-node-services-div");

        val.forEach( (service, index) => {
            const node_card_template = document.getElementById("node-card-template")
            const node_card = node_card_template.content.cloneNode(true);

            const name_elem = node_card.getElementById("node-card-template-name")
            const desc_elem = node_card.getElementById("node-card-template-description")
            const link_elem = node_card.getElementById("node-card-template-link")
            const doc_elem = node_card.getElementById("node-card-template-doc")

            desc_elem.classList.add("height-node-description");

            name_elem.id = `node-card-${index}-name`
            desc_elem.id = `node-card-${index}-description`
            link_elem.id = `node-card-${index}-link`
            doc_elem.id = `node-card-${index}-doc`

            name_elem.innerText = service.name.toUpperCase();

            desc_elem.innerText = service.description
            service.links.forEach(link => {
                if (link.rel === "service") {
                    Object.entries(link).forEach(([attr, value]) => link_elem.setAttribute(attr, value));
                } else if (link.rel === "service-doc") {
                    Object.entries(link).forEach(([attr, value]) => doc_elem.setAttribute(attr, value));
                }
            })
            services_row.appendChild(node_card)
        })
        return services_row
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const githubURL = "{{ node_registry_url }}";
    var sessionDetailsJSON = getSessionDetails();
    var baseURL;
    var currentNode;

    //Call getBaseURL function from account.js
    getBaseURL(sessionDetailsJSON).then(data => {
        baseURL = data;
        getServices(baseURL);
    });
})

function getServices(node_url){
    const githubURL = "{{ node_registry_url }}";

    fetch(githubURL).then(resp =>  resp.json()).then(json => {

        var node_keys = Object.keys(json);
        let node_info;

        node_keys.forEach(key => {
            node_info = json[key];

            Object.entries(node_info).forEach(([node_details_key, node_details]) => {

                if(node_details_key == "links"){
                    node_info[node_details_key].forEach((link) => {

                        if(link.rel == "service"){
                            if(node_url == link.href){
                                const elem = document.getElementById("services");
                                const converted_val = (converters["services"] || converters["_default"])(node_info["services"], node_info)

                                if (elem !== null) {
                                    elem.replaceChildren(converted_val);
                                }

                                let services_title = document.getElementById("servicesTitle");
                                services_title.innerText = `Services by ${node_info["name"]}`;
                            }
                        }
                    })
                }
            })
        })
    })
}

function capitalize(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
}