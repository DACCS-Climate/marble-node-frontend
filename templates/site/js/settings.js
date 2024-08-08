document.addEventListener("DOMContentLoaded", function () {
    var sessionDetailsJSON = getSessionDetails();
    var editEmailCaption = document.getElementById("emailCaptionNodeName");

    //Call getBaseURL function from account.js
    getBaseURL(sessionDetailsJSON).then(baseURL => {
        setNodeName(baseURL,editEmailCaption)
    });
})

function setNodeName(node_url, elementID){

    getNodeRegistry().then(json => {
        var node_keys = Object.keys(json);
        let node_info;

        node_keys.forEach(key => {
        node_info = json[key];
        Object.entries(node_info).forEach(([node_details_key, node_details]) => {

                if(node_details_key == "links"){
                    node_info[node_details_key].forEach((link) => {

                        if(link.rel == "service"){
                            if(node_url == link.href){
                                elementID.innerText = node_info["name"];
                            }
                        }
                    })
                }
            })
        })
    })
}