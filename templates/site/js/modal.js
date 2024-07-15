function setModal(modalDialogID, openModalButtonElementID, openModalLinkElementID, closeModalElementID){
    // Get the modal
    var modal = document.getElementById(modalDialogID);
    var bodyHTMLCollection = document.getElementsByTagName("body");
    var bodyTags = Array.from(bodyHTMLCollection);
    var openModalButton = document.getElementById(openModalButtonElementID);
    var openModalLink = document.getElementById(openModalLinkElementID);
    var closeModalButton = document.getElementById(closeModalElementID);

    // When the user clicks on the button, open the modal
    openModalButton.addEventListener("click", function(){
        bodyTags.forEach(body => {
            body.classList.remove(...body.classList);
            body.classList.add("stop-scroll");
        })

        modal.showModal();
    });
    
    closeModalButton.addEventListener("click", () => {
        bodyTags.forEach(body => {
            body.classList.remove(...body.classList);
        })
        modal.close();
    });

    openModalLink.addEventListener('click', () => {
        bodyTags.forEach(body => {
            body.classList.remove(...body.classList);
            body.classList.add("stop-scroll");
        })
        modal.showModal();
    })

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
          bodyTags.forEach(body => {
            body.classList.remove(...body.classList);
        })
          modal.close();
      }
    }
}