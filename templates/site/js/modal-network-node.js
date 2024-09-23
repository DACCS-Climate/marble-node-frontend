document.addEventListener("DOMContentLoaded", function () {
    setModal("networkNodeModal", "openNetworkModalButton", "openNetworkModalLink", "closeNetworkModal");

    var deleteNodeUserButton = document.getElementById("deleteNodeUserButton");
    deleteNodeUserButton.addEventListener("click",deleteNodeUser);

    backgroundColourOnScroll();
})

function backgroundColourOnScroll(){
    let networkNodeCloseIcon;
    const networkNodeModal = document.getElementById("networkNodeModal");
    const networkNodeHeader = document.getElementById("popupNetworkHeader");
    const networkNodeHeaderTitle = document.querySelector(".popup-network-title");
    const networkNodeBorder =  document.querySelector(".border-network-title");

    var headerNodeList = networkNodeHeader.querySelectorAll(".image-close-icon");
    if(headerNodeList.length > 0){
        networkNodeCloseIcon = headerNodeList[0]
    }

    networkNodeModal.onscroll = (event) => {
        if(networkNodeModal.scrollTop > 0){
            networkNodeHeader.classList.add("header-scroll");
            networkNodeHeaderTitle.classList.add("header-scroll");
            networkNodeBorder.classList.add("header-scroll");
            networkNodeCloseIcon.classList.replace("image-close-icon","image-close-icon-dark");
        }
        else{
            networkNodeHeader.classList.remove("header-scroll");
            networkNodeHeaderTitle.classList.remove("header-scroll");
            networkNodeBorder.classList.remove("header-scroll");
            networkNodeCloseIcon.classList.replace("image-close-icon-dark","image-close-icon");
        }
    }
}