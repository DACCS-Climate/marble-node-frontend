document.addEventListener("DOMContentLoaded", function () {
    // Get the modal
    var modal = document.getElementById("modalDisplay");
    var openModalButton = document.getElementById("openModal");
    var closeModalButton = document.getElementById("closeModal");

    // When the user clicks on the button, open the modal
    openModalButton.addEventListener("click", function(){
         modal.showModal();
         customizeOpenModalButton();
    });
    
    closeModalButton.addEventListener("click", () => {
        modal.close();
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
          modal.close();
      }
    }

    customizeModalElements();
})

