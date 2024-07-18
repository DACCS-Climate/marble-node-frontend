function setModal(modalElementID, openModalButtonElementID, openModalLinkElementID, closeModalElementID){
    // Get the modal
    var modalElement = document.getElementById(modalElementID);
    var bodyHTMLCollection = document.getElementsByTagName("body");
    var bodyTags = Array.from(bodyHTMLCollection);

    if(openModalButtonElementID != ""){
        var openModalButton = document.getElementById(openModalButtonElementID);

        // When the user clicks on the button, open the modal
        openModalButton.addEventListener("click", function(){
            bodyTags.forEach(body => {
                body.classList.remove(...body.classList);
                body.classList.add("stop-scroll");
            })

            modalElement.showModal();
        });
    }

    if(closeModalElementID != ""){
        var closeModalButton = document.getElementById(closeModalElementID);

        closeModalButton.addEventListener("click", () => {
            bodyTags.forEach(body => {
                body.classList.remove(...body.classList);
            })
            modalElement.close();
        });
    }
    
    if(openModalLinkElementID != ""){
        var openModalLink = document.getElementById(openModalLinkElementID);

        openModalLink.addEventListener('click', () => {
            bodyTags.forEach(body => {
                body.classList.remove(...body.classList);
                body.classList.add("stop-scroll");
            })
            modalElement.showModal();
        })
    }

    // When the user clicks anywhere outside of the modal, close it
    modalElement.addEventListener("click", () => {
        if(event.target.id == modalElementID){
            bodyTags.forEach(body => {
                body.classList.remove(...body.classList);
            })
            modalElement.close();
        }
    } )
}