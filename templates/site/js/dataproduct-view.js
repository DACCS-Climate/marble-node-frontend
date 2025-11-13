async function getUploadedDataProducts(url) {
    var currentUser = (await  window.session_info).user.user_name;
    var fetchURL = "";
    var marbleAPIUserURL = "{{ configs['marble_api_path'] }}/v1/users/" + currentUser + "/data-requests/";
    var dataRequestViewURL = "publish-dataproduct.html?id=";
    var dataRequestsContainer = document.getElementById("dataRequestTableContainer");
    var previousLinkButton = document.getElementById("dataRequestPrevious");
    var nextLinkButton = document.getElementById("dataRequestNext");
    var errorMessageContainer = document.getElementById("dataRequestErrorContainer");
    var errorMessage = document.getElementById("dataRequestErrorMessage");

    dataRequestsContainer.innerHTML = "";
    errorMessageContainer.classList.remove("display-flex");
    errorMessageContainer.classList.add("display-none");

    previousLinkButton.setAttribute("disabled", "disabled");
    previousLinkButton.classList.add("disabled");
    nextLinkButton.setAttribute("disabled", "disabled");
    nextLinkButton.classList.add("disabled");

    if(url){
        fetchURL = url;
    }
    else{
        fetchURL = marbleAPIUserURL;
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
            var userHeaderSpan = document.createElement("span");
            var titleHeaderSpan = document.createElement("span");

            userHeaderSpan.classList.add("subtitle-1");
            titleHeaderSpan.classList.add("subtitle-1");

            userHeaderSpan.innerText = "Username";
            titleHeaderSpan.innerText = "Title";

            userHeaderCell.appendChild(userHeaderSpan);
            titleHeaderCell.appendChild(titleHeaderSpan);

            dataRequestHeaderRow.appendChild(userHeaderCell);
            dataRequestHeaderRow.appendChild(titleHeaderCell);

            dataRequestTableHead.appendChild(dataRequestHeaderRow);
            dataRequestTable.classList.add("table-datarequest");

            dataRequestTable.appendChild(dataRequestTableHead);
            dataRequestTable.appendChild(dataRequestTableBody);
            dataRequestsContainer.appendChild(dataRequestTable);

            for(request of marbleResult.data_requests){
                var dataRequestRow = document.createElement("tr");
                var userCell = document.createElement("td");
                var titleCell = document.createElement("td");
                var linkAnchor = document.createElement("a");
                var userCellSpan = document.createElement("span");

                userCellSpan.classList.add("body-1");
                linkAnchor.classList.add("body-1", "a-text-style");

                userCellSpan.innerText = request.user;
                linkAnchor.href = dataRequestViewURL + request.id;
                linkAnchor.innerText = request.title;

                userCell.appendChild(userCellSpan);
                titleCell.appendChild(linkAnchor);

                dataRequestRow.appendChild(userCell);
                dataRequestRow.appendChild(titleCell);

                dataRequestTableBody.appendChild(dataRequestRow);
            }

            if(marbleResult.links){
                var nextLink;
                var previousLink;

                for(link of marbleResult.links){
                    if(link.rel === "prev"){
                        previousLink = link.href;
                        previousLinkButton = document.getElementById("dataRequestPrevious");
                        var oldPreviousButton = previousLinkButton;
                        var newPreviousButton = oldPreviousButton.cloneNode(true);

                        newPreviousButton.addEventListener("click", function(){
                            getUploadedDataProducts(previousLink);
                        });

                        newPreviousButton.removeAttribute("disabled");
                        newPreviousButton.classList.remove("disabled");

                        oldPreviousButton.parentNode.replaceChild(newPreviousButton, oldPreviousButton);
                    }

                    if(link.rel === "next"){
                        nextLink = link.href
                        nextLinkButton = document.getElementById("dataRequestNext");
                        var oldNextButton = nextLinkButton;
                        var newNextButton = oldNextButton.cloneNode(true);

                        newNextButton.addEventListener("click", function(){
                            getUploadedDataProducts(nextLink);
                        });

                        newNextButton.removeAttribute("disabled");
                        newNextButton.classList.remove("disabled");

                        oldNextButton.parentNode.replaceChild(newNextButton, oldNextButton);
                    }
                }
            }
        }
        else{
            errorMessage.innerHTML = "Server error <br>  Data Products cannot be retrieved";

            errorMessageContainer.classList.remove("display-none");
            errorMessageContainer.classList.add("display-flex");

            previousLinkButton.setAttribute("disabled", "disabled");
            previousLinkButton.classList.add("disabled");

            nextLinkButton.setAttribute("disabled", "disabled");
            nextLinkButton.classList.add("disabled");
        }
    } catch (error) {
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", function () {
   getUploadedDataProducts(null);
});