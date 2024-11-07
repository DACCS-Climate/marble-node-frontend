function setModal(modalElementID, openElementIDs, closeElementIDs) {
    const bodyElem = document.getElementsByTagName("body")[0];
    const modalElement = document.getElementById(modalElementID);

    document.addEventListener("keydown", (event) => {
        if (event.code == "Escape") {
            bodyElem.classList.remove("stop-scroll");
            modalElement.close();
        }
    })

    openElementIDs.forEach(elem_id => {
        const elem = document.getElementById(elem_id);
        if (elem) {
            elem.addEventListener("click", function(){
                bodyElem.classList.add("stop-scroll");
                modalElement.showModal();
            });
        }
    })

    closeElementIDs.forEach(elem_id => {
        const elem = document.getElementById(elem_id);
        if (elem) {
            elem.addEventListener("click", function(){
                bodyElem.classList.remove("stop-scroll");
                modalElement.close();
            });
        }
    })
}
