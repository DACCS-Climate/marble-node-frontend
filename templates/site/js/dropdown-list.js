function replaceListItem(titleItemID, selectedItemID){
    var firstItem = document.getElementById(titleItemID);
    var secondItem = document.getElementById(selectedItemID);
    var selectedID;
    var selectedIndex;
    var selectedOffset;

    firstItem.innerHTML = secondItem.innerHTML;
    selectedID = secondItem.id;
    selectedIndex = secondItem.getAttribute("selected_index");
    firstItem.setAttribute("selected_index", selectedIndex);
    firstItem.setAttribute("selected_id", selectedID);

    if(secondItem.hasAttribute("selected_offset")){
        selectedOffset = secondItem.getAttribute("selected_offset");
        firstItem.setAttribute("selected_offset", selectedOffset);
    }
}