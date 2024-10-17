const converters = {
    "_default": (val) => val,
    "services": (val) => {
        const services_row = document.createElement("div");
        services_row.id = "nodeServices";
        services_row.classList.add("d-flex", "flex-wrap", "justify-content-between", "width-node-services-div");

        Object.entries(val).forEach( ([index, service]) => {
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
}

document.addEventListener("DOMContentLoaded", function () {

    setServices()

})

function setServices(){
    getNodeServices().then(json => {

        Object.entries(json).forEach(([key, val]) => {

            const elem = document.getElementById("services");
            const converted_val = (converters[key] || converters["_default"])(val, "RedOak")

            if (elem !== null) {
                elem.replaceChildren(converted_val);
            }

            let services_title = document.getElementById("servicesTitle");
            services_title.innerText = `Services by {{ current_node_name }}`;
        })
    })
}
