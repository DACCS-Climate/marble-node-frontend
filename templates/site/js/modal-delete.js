function deleteUser(){
    const deleteURLFragment = "{{ configs['magpie_path'] }}/users/current";

    fetch(deleteURLFragment,{
        method: "DELETE",
        headers: {
            "Accept": "application/json, text/plain",
            "Content-Type": "application/json"
            }
        }).then(response => response.json()).then(json => {
            if(json.code == 200){
                window.location.href = loginHome;
            }
        })
}

document.addEventListener("DOMContentLoaded", function () {
    setModal("deleteAttentionModal", ["openDeleteModalButton"], ["closeDeleteModal"]);

    const attentionModalDeleteButton = document.getElementById("deleteUserButton");
    attentionModalDeleteButton.addEventListener("click", deleteUser);
})
