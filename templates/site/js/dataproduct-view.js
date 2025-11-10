async function getUploadedDataProducts(url) {
    var fetchURL = "";
    var marbleAPIURL = "{{ configs['marble_api_path'] }}/v1/data-requests/";
    var dataRequestsContainer = document.getElementById("dataRequestTop");

    dataRequestsContainer.innerHTML = "";

    if(url){
        fetchURL = url;
    }
    else{
        fetchURL = marbleAPIURL;
    }

    try {
        const marbleResponse = await fetch(fetchURL, {
            method: "GET"
        });

        var marbleResult = await marbleResponse.json();

        if(marbleResponse.status == 200){
            var dataRequestTable = document.createElement("table");
            var dataRequestTableHead = document.createElement("thead");
            var dataRequestTableBody = document.createElement("tbody");
            var dataRequestHeaderRow = document.createElement("tr");
            var userHeaderCell = document.createElement("th");
            var titleHeaderCell = document.createElement("th");
            var linkHeaderCell = document.createElement("th");

            userHeaderCell.innerText = "Username";
            titleHeaderCell.innerText = "Title";
            linkHeaderCell.innerText = "Link";

            dataRequestHeaderRow.appendChild(userHeaderCell);
            dataRequestHeaderRow.appendChild(titleHeaderCell);
            dataRequestHeaderRow.appendChild(linkHeaderCell);

            dataRequestTableHead.appendChild(dataRequestHeaderRow);
            dataRequestTable.classList.add("datarequest-table");

            dataRequestTable.appendChild(dataRequestTableHead);
            dataRequestTable.appendChild(dataRequestTableBody);
            dataRequestsContainer.appendChild(dataRequestTable);

            for(request of marbleResult.data_requests){
                var dataRequestRow = document.createElement("tr");
                var userCell = document.createElement("td");
                var titleCell = document.createElement("td");
                var linkCell = document.createElement("td");
                var linkAnchor = document.createElement("a");

                userCell.innerText = request.user;
                titleCell.innerText = request.title;
                linkAnchor.href = marbleAPIURL + "?id=" + request.id;
                linkAnchor.innerText = marbleAPIURL + "?id=" + request.id;
                linkCell.appendChild(linkAnchor);

                dataRequestRow.appendChild(userCell);
                dataRequestRow.appendChild(titleCell);
                dataRequestRow.appendChild(linkCell);

                dataRequestTableBody.appendChild(dataRequestRow);
            }

            if(marbleResult.links){
                var nextLink;
                var previousLink;

                if(marbleResult.links.length > 1){

                    if(marbleResult.links[0].rel == "next"){
                        nextLink = marbleResult.links[0];
                        previousLink = marbleResult.links[1];
                    }
                    else
                    {
                        nextLink = marbleResult.links[1];
                        previousLink = marbleResult.links[0];
                    }

                    for(link of marbleResult.links){
                        if(link.rel === "prev"){
                            var previousLinkButton = document.getElementById("dataRequestPrevious");
                            var oldPreviousButton = previousLinkButton;
                            var newPreviousButton = oldPreviousButton.cloneNode(true);

                            newPreviousButton.addEventListener("click", function(){
                                getUploadedDataProducts(previousLink.href);
                            });

                            newPreviousButton.removeAttribute("disabled");
                            newPreviousButton.classList.remove("disabled");

                            oldPreviousButton.parentNode.replaceChild(newPreviousButton, oldPreviousButton);
                        }

                        if(link.rel === "next"){

                            var nextLinkButton = document.getElementById("dataRequestNext");
                            var oldNextButton = nextLinkButton;
                            var newNextButton = oldNextButton.cloneNode(true);

                            newNextButton.addEventListener("click", function(){
                                getUploadedDataProducts(nextLink.href);
                            });

                            newNextButton.removeAttribute("disabled");
                            newNextButton.classList.remove("disabled");

                            oldNextButton.parentNode.replaceChild(newNextButton, oldNextButton);
                        }
                    }
                }
                else{
                    if(marbleResult.links[0].rel == "prev"){
                        previousLink = marbleResult.links[0];

                        var previousLinkButton = document.getElementById("dataRequestPrevious");
                        var nextLinkButton = document.getElementById("dataRequestNext");

                        previousLinkButton.addEventListener("click", function(){
                            getUploadedDataProducts(previousLink.href);
                        });

                        nextLinkButton.setAttribute("disabled", "disabled");
                        nextLinkButton.classList.add("disabled");

                    }

                     if(marbleResult.links[0].rel == "next"){
                         nextLink = marbleResult.links[0];

                         var previousLinkButton = document.getElementById("dataRequestPrevious");
                         var nextLinkButton = document.getElementById("dataRequestNext");

                         nextLinkButton.addEventListener("click", function(){
                             getUploadedDataProducts(nextLink.href);
                         });

                        previousLinkButton.setAttribute("disabled", "disabled");
                        previousLinkButton.classList.add("disabled");
                    }
                }
            }
        }
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", function () {
   getUploadedDataProducts(null);
});