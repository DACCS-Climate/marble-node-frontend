function addAuthor(divElementID) {

    var authorDiv = document.getElementById(divElementID);
    var autindex = document.querySelectorAll("[id^=fname]").length + 1; // Count existing authors

    var div_box = document.createElement("div");
    div_box.id = "author" + autindex;
    div_box.classList.add("child", "author-additional-child");

    var divFirstName = document.createElement("div");
    divFirstName.classList.add("author-details");

    var divLastName = document.createElement("div");
    divLastName.classList.add("author-details");

    var divEmail = document.createElement("div");
    divEmail.classList.add("author-details");

    var divRemoveAuthor = document.createElement("div");
    divRemoveAuthor.classList.add("remove-button");

    var label1 = document.createElement("label");
    label1.innerText = "First Name:";
    label1.classList.add("subtitle-1");
    label1.setAttribute("for", "fname" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "fname" + autindex);
    input1.setAttribute("name", "fname[]"); // Make it an array input
    input1.addEventListener("input", updateAuthorList); // Update list on input

    var label2 = document.createElement("label");
    label2.innerText = "Last Name:";
    label2.classList.add("subtitle-1");
    label2.setAttribute("for", "lname" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "lname" + autindex);
    input2.setAttribute("name", "lname[]"); // Changed name to array input for last name

    var label3 = document.createElement("label");
    label3.innerText = "Email:";
    label3.classList.add("subtitle-1");
    label3.setAttribute("for", "email" + autindex);

    var input3 = document.createElement("input");
    input3.classList.add("input-textbox", "margin-input-field");
    input3.setAttribute("type", "text");
    input3.setAttribute("id", "email" + autindex);
    input3.setAttribute("name", "email[]"); // Make it an array input

    var removeAuthorButton = document.createElement("input");
    removeAuthorButton.setAttribute("type", "button");
    removeAuthorButton.value = "Remove Author";
    removeAuthorButton.classList.add("button-med", "d-button-text", "author-remove-button");
    removeAuthorButton.addEventListener("click", function() {
        removeEntry("author_box", "author" + autindex)
    });
    
    divFirstName.appendChild(label1);
    divFirstName.appendChild(input1);
    divLastName.appendChild(label2);
    divLastName.appendChild(input2);
    divEmail.appendChild(label3);
    divEmail.appendChild(input3);
    divRemoveAuthor.appendChild(removeAuthorButton);

    div_box.appendChild(divFirstName);
    div_box.appendChild(divLastName);
    div_box.appendChild(divEmail);
    div_box.appendChild(divRemoveAuthor);

    authorDiv.appendChild(div_box);
}

function removeEntry(parentElementID, elementID){

    var parentDiv = document.getElementById(parentElementID);
    var coordinateEntry = document.getElementById(elementID);

    parentDiv.removeChild(coordinateEntry);
}


// Function to update the hidden input field before form submission
function updateAuthorList() {
    var authorsFNames = [];
    var authorsLNames = [];
    var authorsEmails = [];

    // Select all first name and last name inputs
    var inputs1 = document.querySelectorAll("[name='fname[]'], #fname1"); // First name inputs (including the initial one)
    var inputs2 = document.querySelectorAll("[name='lname[]'], #lname1"); // Last name inputs (including the initial one)
    var inputs3 = document.querySelectorAll("[name='email[]'], #email1"); // Last name inputs (including the initial one)

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

// Ensure the list is updated before submitting the form
document.getElementById("authorForm").addEventListener("submit", function() {
    updateAuthorList();
    updateGeoList();
});