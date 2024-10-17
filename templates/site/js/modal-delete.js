document.addEventListener("DOMContentLoaded", function () {
    setModal("deleteAttentionModal", "openDeleteModalButton", "", "closeDeleteModal");

    setModal("deleteNodeAttentionModal", "openDeleteNodePlaceholderID", "", "closeDeleteNodeAttentionModal")

    if(document.getElementById("deleteUserButton") && document.getElementById("deleteUserButton") != null){
        var attentionModalDeleteButton = document.getElementById("deleteUserButton");
        attentionModalDeleteButton.addEventListener("click",deleteUser);
    }

})