function replaceListItem(titleItemID, selectedItemID){
    var firstItem = document.getElementById(titleItemID);
    var secondItem = document.getElementById(selectedItemID);
    var selectedID;
    var selectedIndex;
    var selectedOffset;

    firstItem.innerHTML = secondItem.innerHTML;
    selectedID = secondItem.id;
    selectedIndex = secondItem.getAttribute("data-selected_index");
    firstItem.setAttribute("data-selected_index", selectedIndex);
    firstItem.setAttribute("selected_id", selectedID);

    if(secondItem.hasAttribute("data-selected_offset")){
        selectedOffset = secondItem.getAttribute("data-selected_offset");
        firstItem.setAttribute("data-selected_offset", selectedOffset);
    }
}

function generateTimezoneDropdownListItems(dropdownContainerID, dropdownID, dropdownButtonTextID){
    var timezoneSet = new Set();
    var timezoneSetArray;
    var dropdownTitleLabel = document.getElementById(dropdownButtonTextID);
    var dropdownULElement = document.getElementById(dropdownID);
    var generatedTimezonesList = generateTimezoneWithOffset();
    var dropdownContainer = document.getElementById(dropdownContainerID);
    var hiddenSelectDropdownInputField = document.createElement("input");

    dropdownTitleLabel.setAttribute("data-selected_offset", "");

    hiddenSelectDropdownInputField.id = "hiddenTimezoneDropdown";
    hiddenSelectDropdownInputField.classList.add("dropdown-hidden-inputfield");

    dropdownContainer.appendChild(hiddenSelectDropdownInputField);

    //Make a new list with only UTC and GMT timezone identifiers
    generatedTimezonesList.forEach( (generatedTimezoneListItem) => {
       timezoneSet.add(generatedTimezoneListItem.offset);
    });

    //Sort timezones
    timezoneSetArray = [...timezoneSet];
    timezoneSetArray.sort();

    //Put the timezone offset as an attribute in the anchor tag.  Use it to select the list item
    //when filling out the form with server data.
    timezoneSetArray.forEach( (timezoneSetArrayItem) => {
        var timezoneLabel;
        var timezoneName = timezoneSetArrayItem;
        var dropdownLIElement = document.createElement("li");
        var dropdownAnchorElement = document.createElement("a");
        var dropdownAnchorID = dropdownID + "_" + timezoneSetArrayItem;
        var timezoneOffsetArray = timezoneSetArrayItem.split("GMT");
        var timezoneOffset = timezoneOffsetArray[1];

        if(timezoneOffset == "+00:00"){
            timezoneLabel = "GMT";
        }
        else{
            timezoneLabel = timezoneSetArrayItem;
        }

        dropdownLIElement.classList.add("dropdown-default-list-item");

        dropdownAnchorElement.classList.add("subtitle-1","dropdown-default-list-item-text");
        dropdownAnchorElement.setAttribute("role", "button");
        dropdownAnchorElement.setAttribute("data-selected_index", timezoneName);
        dropdownAnchorElement.setAttribute("data-selected_offset", timezoneOffset);
        dropdownAnchorElement.id = dropdownAnchorID;
        dropdownAnchorElement.innerText = timezoneLabel;
        dropdownAnchorElement.addEventListener('click', function() {
            replaceListItem(dropdownButtonTextID, dropdownAnchorID);
        });

        dropdownLIElement.appendChild(dropdownAnchorElement);
        dropdownULElement.appendChild(dropdownLIElement);
    });
}