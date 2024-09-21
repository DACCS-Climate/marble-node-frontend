document.addEventListener("DOMContentLoaded", function () {
    setModal("networkNodeModal", "openNetworkModalButton", "openNetworkModalLink", "closeNetworkModal");

    var deleteNodeUserButton = document.getElementById("deleteNodeUserButton");
    deleteNodeUserButton.addEventListener("click",deleteNodeUser);

    backgroundColourOnScroll();
})

function backgroundColourOnScroll(){
    const networkNodeModal = document.getElementById("networkNodeModal");
    const networkNodeHeader = document.querySelector(".popup-network-header");
    const networkNodeHeaderTitle = document.querySelector(".popup-network-title");
    const networkNodeCloseIcon = document.getElementById("closeNetworkModal");
    const networkNodeBorder =  document.querySelector(".border-network-title");

    networkNodeModal.onscroll = (event) => {
        if(networkNodeModal.scrollTop > 0){
            networkNodeHeader.classList.add("header-scroll");
            networkNodeHeaderTitle.classList.add("header-scroll");
            networkNodeCloseIcon.classList.add("image-close-icon-dark");
            networkNodeCloseIcon.classList.remove("image-close-icon");
            networkNodeBorder.classList.add("header-scroll");
        }
        else{
            networkNodeHeader.classList.remove("header-scroll");
            networkNodeHeaderTitle.classList.remove("header-scroll");
            networkNodeCloseIcon.classList.remove("image-close-icon-dark");
            networkNodeCloseIcon.classList.add("image-close-icon");
            networkNodeBorder.classList.remove("header-scroll");
        }
    }
}