function initializeDiv(divID) {

    var geoBboxDiv = document.getElementById(divID);
    geoBboxDiv.classList.add("geobbox");

    var geoBboxContainerDiv = document.getElementById("geo_bbox_container");

    var label1 = document.createElement("label");
    var input1 = document.createElement("input");

    var label2 = document.createElement("label");
    var input2 = document.createElement("input");

    var addButton = document.createElement("button");
    addButton.classList.add("addInputButton");
    addButton.innerText = "Add Point";
    addButton.addEventListener('click', function (){
        addNewPoint(divID);
    });

    label1.innerText = "Latitude (Required):";
    label1.setAttribute("for", "bbox1");

    input1.setAttribute("type", "text");
    input1.setAttribute("id", "bbox1");
    input1.setAttribute("name", "bbox1");

    label2.innerText = "Longitude (Required):";
    label2.setAttribute("for", "bbox2");

    input2.setAttribute("type", "text");
    input2.setAttribute("id", "bbox2");
    input2.setAttribute("name", "bbox2");

    geoBboxDiv.appendChild(label1);
    geoBboxDiv.appendChild(input1);
    geoBboxDiv.appendChild(label2);
    geoBboxDiv.appendChild(input2);
    geoBboxDiv.appendChild(addButton);

}

function getDivElements(divID){
//var divElements = document.getElementById(divID).children
    var divInputElements = document.getElementById(divID).querySelectorAll("input");

    var arrayLength = divInputElements.length;

    return arrayLength;
}


function addNewPoint(divElementID){
    var arrayLength = getDivElements(divElementID);
    var geoBboxDiv = document.getElementById(divElementID);

    var lineBreak = document.createElement("br");

    var label1 = document.createElement("label");
    var input1 = document.createElement("input");

    var label2 = document.createElement("label");
    var input2 = document.createElement("input");

    var latitudeIndex = arrayLength + 1;
    var longitudeIndex = arrayLength + 2;

    label1.innerText = "Latitude:";
    label1.setAttribute("for", "bbox" + latitudeIndex);

    input1.setAttribute("type", "text");
    input1.setAttribute("id", "bbox" + latitudeIndex);
    input1.setAttribute("name", "bbox" + latitudeIndex);

    label2.innerText = "Longitude:";
    label2.setAttribute("for", "bbox" + longitudeIndex);

    input2.setAttribute("type", "text");
    input2.setAttribute("id", "bbox" + longitudeIndex);
    input2.setAttribute("name", "bbox" + longitudeIndex);

    geoBboxDiv.appendChild(lineBreak);
    geoBboxDiv.appendChild(label1);
    geoBboxDiv.appendChild(input1);
    geoBboxDiv.appendChild(label2);
    geoBboxDiv.appendChild(input2);

}
