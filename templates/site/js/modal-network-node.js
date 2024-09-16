document.addEventListener("DOMContentLoaded", function () {
    setModal("networkNodeModal", "openNetworkModalButton", "openNetworkModalLink", "closeNetworkModal");

    var deleteNodeUserButton = document.getElementById("deleteNodeUserButton");
    deleteNodeUserButton.addEventListener("click",deleteNodeUser);

})