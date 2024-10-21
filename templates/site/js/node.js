async function getNodeServices(){
    const servicesURLFragment = "/services";

    const response = await fetch(servicesURLFragment, {
        method: "GET",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
        }
    });
    return await response.json();
}

function createServiceRow(services_json) {
    const services_row = document.createElement("div");
    services_row.id = "nodeServices";
    services_row.classList.add("d-flex", "flex-wrap", "justify-content-between", "width-node-services-div");

    Object.entries(services_json).forEach( ([index, service]) => {
        const node_card_template = document.getElementById("node-card-template")
        const node_card = node_card_template.content.cloneNode(true);

        const name_elem = node_card.getElementById("node-card-template-name")
        const desc_elem = node_card.getElementById("node-card-template-description")
        const link_elem = node_card.getElementById("node-card-template-link")
        const doc_elem = node_card.getElementById("node-card-template-doc")

        desc_elem.classList.add("height-node-description");
        link_elem.setAttribute("target", "_blank");
        doc_elem.setAttribute("target", "_blank");

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

document.addEventListener("DOMContentLoaded", function () {
    getNodeServices().then(json => {
        const elem = document.getElementById("services");
        elem.replaceChildren(createServiceRow(json.services));
        let services_title = document.getElementById("servicesTitle");
        services_title.innerText = "Services by {{ current_node_name }}";
    })
})
