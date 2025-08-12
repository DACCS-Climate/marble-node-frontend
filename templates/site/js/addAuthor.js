function initializeAuthor(divAuthorBoxID){

    var authorBox = document.getElementById(divAuthorBoxID);

    var divAuthorContainer = document.createElement("div");
    divAuthorContainer.id = "author_1";
    divAuthorContainer.classList.add("child", "author-child");

    var divFirstNameContainer = document.createElement("div");
    divFirstNameContainer.classList.add("author-details");
    var labelFirstName = document.createElement("label");
    labelFirstName.setAttribute("for", "fname_1");
    labelFirstName.classList.add("subtitle-1", "margin-input-label");
    labelFirstName.innerText = "First Name:";
    var inputFirstName = document.createElement("input");
    inputFirstName.setAttribute("type", "text");
    inputFirstName.setAttribute("name", "fname_1");
    inputFirstName.setAttribute("required", "required");
    inputFirstName.classList.add("input-textbox", "margin-input-field");
    inputFirstName.id = "fname_1";

    var divLastNameContainer = document.createElement("div");
    divLastNameContainer.classList.add("author-details");
    var labelLastName = document.createElement("label");
    labelLastName.setAttribute("for", "lname_1");
    labelLastName.classList.add("subtitle-1", "margin-input-label");
    labelLastName.innerText = "Last Name:";
    var inputLastName = document.createElement("input");
    inputLastName.setAttribute("type", "text");
    inputLastName.setAttribute("name", "lname_1");
    inputLastName.setAttribute("required", "required");
    inputLastName.classList.add("input-textbox", "margin-input-field");
    inputLastName.id = "lname_1";

    var divEmailContainer = document.createElement("div");
    divEmailContainer.classList.add("author-details");
    var labelEmail = document.createElement("label");
    labelEmail.setAttribute("for", "email_1");
    labelEmail.classList.add("subtitle-1", "margin-input-label");
    labelEmail.innerText = "Email:";
    var inputEmail = document.createElement("input");
    inputEmail.setAttribute("type", "text");
    inputEmail.setAttribute("name", "email_1");
    inputEmail.setAttribute("required", "required");
    inputEmail.classList.add("input-textbox", "margin-input-field");
    inputEmail.id = "email_1";

    var divRemoveAuthorContainerParent = document.createElement("div");
    divRemoveAuthorContainerParent.classList.add("remove-button");
    var divRemoveAuthorContainer = document.createElement("div");
    divRemoveAuthorContainer.id = "author_remove_container_1";
    divRemoveAuthorContainer.classList.add("display-none");
    var buttonRemoveAuthor = document.createElement("button");
    buttonRemoveAuthor.setAttribute("type", "button");
    buttonRemoveAuthor.setAttribute("name", "author_remove_1");
    buttonRemoveAuthor.setAttribute("required", "required");
    buttonRemoveAuthor.classList.add("button-med", "d-button-text");
    buttonRemoveAuthor.id = "author_remove_1";
    buttonRemoveAuthor.innerText = "Remove Point";

    divFirstNameContainer.appendChild(labelFirstName);
    divFirstNameContainer.appendChild(inputFirstName);

    divLastNameContainer.appendChild(labelLastName);
    divLastNameContainer.appendChild(inputLastName);

    divEmailContainer.appendChild(labelEmail);
    divEmailContainer.appendChild(inputEmail);

    divRemoveAuthorContainer.appendChild(buttonRemoveAuthor);
    divRemoveAuthorContainerParent.appendChild(divRemoveAuthorContainer);

    divAuthorContainer.appendChild(divFirstNameContainer);
    divAuthorContainer.appendChild(divLastNameContainer);
    divAuthorContainer.appendChild(divEmailContainer);
    divAuthorContainer.appendChild(divRemoveAuthorContainerParent);

    authorBox.appendChild(divAuthorContainer);
}

function addAuthor(divElementID) {

    var currentAuthorIndex;
    var autindex;
    var authorDiv = document.getElementById(divElementID);
    var authorArray = document.querySelectorAll("[id^=fname]");

    var authorDivIDArray = divElementID.split("_");
    var geometryType = authorDivIDArray[0];


    autindex = updateIndex(authorArray);

    var authorArrayItem = authorArray[0]
    var currentAuthorFieldID = authorArrayItem.id;
    var currentAuthorIDArray = currentAuthorFieldID.split("_");
    currentAuthorIndex = currentAuthorIDArray[1];

    var firstRemoveButton = document.getElementById(geometryType + "_remove_container_" + currentAuthorIndex);

    if(!firstRemoveButton.classList.contains("show")){
        firstRemoveButton.classList.add("show");
    }


    var div_box = document.createElement("div");
    div_box.id = "author_" + autindex;
    div_box.classList.add("child", "author-additional-child");

    var divFirstName = document.createElement("div");
    divFirstName.classList.add("author-details");

    var divLastName = document.createElement("div");
    divLastName.classList.add("author-details");

    var divEmail = document.createElement("div");
    divEmail.classList.add("author-details");

    var divRemoveAuthor = document.createElement("div");
    divRemoveAuthor.id = "author_remove_container_" + autindex;
    divRemoveAuthor.classList.add("display-none", "show");

    var divRemoveAuthorParent = document.createElement("div");
    divRemoveAuthorParent.classList.add("remove-button");

    var label1 = document.createElement("label");
    label1.innerText = "First Name:";
    label1.classList.add("subtitle-1");
    label1.setAttribute("for", "fname_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "fname_" + autindex);
    input1.setAttribute("name", "fname_[]"); // Make it an array input
    input1.addEventListener("input", updateAuthorList); // Update list on input

    var label2 = document.createElement("label");
    label2.innerText = "Last Name:";
    label2.classList.add("subtitle-1");
    label2.setAttribute("for", "lname_" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "lname_" + autindex);
    input2.setAttribute("name", "lname_[]"); // Changed name to array input for last name

    var label3 = document.createElement("label");
    label3.innerText = "Email:";
    label3.classList.add("subtitle-1");
    label3.setAttribute("for", "email_" + autindex);

    var input3 = document.createElement("input");
    input3.classList.add("input-textbox", "margin-input-field");
    input3.setAttribute("type", "text");
    input3.setAttribute("id", "email_" + autindex);
    input3.setAttribute("name", "email_[]"); // Make it an array input

    var removeAuthorButton = document.createElement("input");
    removeAuthorButton.setAttribute("type", "button");
    removeAuthorButton.value = "Remove Author";
    removeAuthorButton.classList.add("button-med", "d-button-text", "author-remove-button");
    removeAuthorButton.addEventListener("click", function() {
        removeEntry("author_box", "author_" + autindex)
    });

    divFirstName.appendChild(label1);
    divFirstName.appendChild(input1);
    divLastName.appendChild(label2);
    divLastName.appendChild(input2);
    divEmail.appendChild(label3);
    divEmail.appendChild(input3);
    divRemoveAuthor.appendChild(removeAuthorButton);
    divRemoveAuthorParent.appendChild(divRemoveAuthor);

    div_box.appendChild(divFirstName);
    div_box.appendChild(divLastName);
    div_box.appendChild(divEmail);
    div_box.appendChild(divRemoveAuthorParent);

    authorDiv.appendChild(div_box);

}

function removeEntry(parentElementID, elementID){
    var inputArray;
    var currentInputIndex;
    var firstRemoveButton;
    var elementIDArray = elementID.split("_");
    var geometryType = elementIDArray[0];
    var parentDiv = document.getElementById(parentElementID);
    var coordinateEntry = document.getElementById(elementID);

    parentDiv.removeChild(coordinateEntry);

    if(geometryType == "author") {
        inputArray = document.querySelectorAll("[id^=fname]");

        if(inputArray.length == 1) {
            var inputArrayItem = inputArray[0]
            var currentInputFieldID = inputArrayItem.id;
            var currentInputIDArray = currentInputFieldID.split("_");
            currentInputIndex = currentInputIDArray[1];
            firstRemoveButton = document.getElementById(geometryType + "_remove_container_" + currentInputIndex);
            
            if(!firstRemoveButton.classList.contains("show")){
                firstRemoveButton.classList.add("show");
            }
            else{
                firstRemoveButton.classList.remove("show");
            }
        }
    }
    else{
        var coordinateIDPrefix = geometryType + "_lat_";
        inputArray = document.querySelectorAll(`[id^=${coordinateIDPrefix}]`);
        if(inputArray.length == 1) {
            var inputArrayItem = inputArray[0]
            var currentInputFieldID = inputArrayItem.id;
            var currentInputIDArray = currentInputFieldID.split("_");
            currentInputIndex = currentInputIDArray[2];

            firstRemoveButton = document.getElementById(geometryType + "_remove_container_" + currentInputIndex);

            if(!firstRemoveButton.classList.contains("show")){
                firstRemoveButton.classList.add("show");
            }
            else{
                firstRemoveButton.classList.remove("show");
            }
        }
    }
}

function updateIndex(additionalInputArray){
    var lastInput = additionalInputArray[additionalInputArray.length - 1]
    var lastInputID = lastInput.id;
    var lastInputIDArray = lastInputID.split("_");

    var inputFieldIndex;

    if(lastInputIDArray.length > 2){
        inputFieldIndex = parseInt(lastInputIDArray[2]) + 1;
    }
    else{
        inputFieldIndex = parseInt(lastInputIDArray[1]) + 1;
    }

    return inputFieldIndex
}

// Function to update the hidden input field before form submission
function updateAuthorList() {
    var authorsFNames = [];
    var authorsLNames = [];
    var authorsEmails = [];

    // Select all first name and last name inputs
    var inputs1 = document.querySelectorAll("[name='fname_[]'], #fname_1"); // First name inputs (including the initial one)
    var inputs2 = document.querySelectorAll("[name='lname_[]'], #lname_1"); // Last name inputs (including the initial one)
    var inputs3 = document.querySelectorAll("[name='email_[]'], #email_1"); // Last name inputs (including the initial one)

    inputs1.forEach(input => {
        if (input.value.trim() !== "") {
            authorsFNames.push(input.value.trim()); // Add to first names list
        }
    });

    inputs2.forEach(input => {
        if (input.value.trim() !== "") {
            authorsLNames.push(input.value.trim()); // Add to last names list
        }
    });

    inputs3.forEach(input => {
        if (input.value.trim() !== "") {
            authorsEmails.push(input.value.trim()); // Add to emails list
        }
    });

    // Store both first and last names as JSON strings
    document.getElementById("authorFNames").value = JSON.stringify(authorsFNames);
    document.getElementById("authorLNames").value = JSON.stringify(authorsLNames);
    document.getElementById("authorEmails").value = JSON.stringify(authorsEmails);
}

//TODO: Ask Cassie if 'authorForm' ID is used anywhere
// If not, delete this function
// Ensure the list is updated before submitting the form
/*
document.getElementById("authorForm").addEventListener("submit", function() {
    updateAuthorList();
    updateGeoList();
});
*/