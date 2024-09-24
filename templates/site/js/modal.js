function setModal(modalElementID, openModalButtonElementID, openModalLinkElementID, closeModalElementID){
    let modalElement;
    var bodyHTMLCollection = document.getElementsByTagName("body");
    var bodyTags = Array.from(bodyHTMLCollection);

    // Get the modal
    if(modalElementID != "" && document.getElementById(modalElementID) != null){
        modalElement = document.getElementById(modalElementID);

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

    //Adds open modal function to a button
    if(openModalButtonElementID != "" && document.getElementById(openModalButtonElementID) != null){
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

    if(closeModalElementID != "" && document.getElementById(closeModalElementID) != null){
        var closeModalButton = document.getElementById(closeModalElementID);

        closeModalButton.addEventListener("click", () => {
            bodyTags.forEach(body => {
                body.classList.remove(...body.classList);
            })
            modalElement.close();
        });
    }

    //Adds open modal function to a text link
    if(openModalLinkElementID != "" && document.getElementById(openModalLinkElementID) != null){
        var openModalLink = document.getElementById(openModalLinkElementID);

        openModalLink.addEventListener('click', () => {
            bodyTags.forEach(body => {
                body.classList.remove(...body.classList);
                body.classList.add("stop-scroll");
            })
            modalElement.showModal();
        })
    }
}