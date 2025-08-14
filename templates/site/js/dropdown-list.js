function replaceListItem(placeholderValue, firstItemID, secondItemID){
    var firstItem = document.getElementById(firstItemID);
    var secondItem = document.getElementById(secondItemID);

    firstItem.innerHTML = secondItem.innerHTML;
}