document.addEventListener("DOMContentLoaded", function () {
    setModal("networkNodeModal", "openNetworkModalButton", "openNetworkModalLink", "closeNetworkModal");

    var deleteNodeUserButton = document.getElementById("deleteNodeUserButton");
    deleteNodeUserButton.addEventListener("click",deleteNodeUser);

    backgroundColourOnScroll();
})

function backgroundColourOnScroll(){
    const networkNodeModal = document.getElementById("networkNodeModal");
    const networkNodeTable = document.querySelector(".popup-network-table");
    const networkNodeTableHeader = document.querySelector(".popup-network-header");

    networkNodeModal.onscroll = (event) => {
        if(networkNodeModal.scrollTop > 0){
            networkNodeTable.classList.add("header-scroll-background");
            networkNodeTableHeader.classList.remove("border-network-header");
        }
        else{
            networkNodeTable.classList.remove("header-scroll-background");
            networkNodeTableHeader.classList.add("border-network-header");
        }
    }
}