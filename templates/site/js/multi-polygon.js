function initializeDiv(divID) {

    var geoBboxDiv = document.getElementById(divID);
    var geoContentDiv;


    if(divID == "geo_bbox"){
        geoBboxDiv.innerHTML = "";
    }

    if(divID == "geo_multipoint" || divID == "geo_polygon"){
        geoBboxDiv.classList.add("show");
        geoContentDiv = document.getElementById(divID + "_content");
    }


    var coordinateInputContainerDiv = document.createElement("div");
    coordinateInputContainerDiv.id = "coordinateContainer1";
    coordinateInputContainerDiv.classList.add("child", "multipoint-child");

    var latitudeContainer = document.createElement("div");
    latitudeContainer.classList.add("latitude-child");

    var label1 = document.createElement("label");
    var input1 = document.createElement("input");
    label1.classList.add("subtitle-1");
    input1.id = "lat1";
    input1.classList.add("input-textbox", "margin-input-field");

    var longitudeContainer = document.createElement("div");
    longitudeContainer.classList.add("longitude-child");

    var label2 = document.createElement("label");
    var input2 = document.createElement("input");
    label2.classList.add("subtitle-1");
    input2.id = "lon1";
    input2.classList.add("input-textbox", "margin-input-field");

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

    latitudeContainer.appendChild(label1);
    latitudeContainer.appendChild(input1);
    longitudeContainer.appendChild(label2);
    longitudeContainer.appendChild(input2);
    coordinateInputContainerDiv.appendChild(latitudeContainer);
    coordinateInputContainerDiv.appendChild(longitudeContainer);

    if(divID == "geo_multipoint" || divID == "geo_polygon"){
        geoContentDiv.appendChild(coordinateInputContainerDiv);
    }
    else{
        geoBboxDiv.appendChild(coordinateInputContainerDiv);
    }

}

function swapDiv(divID){
    var geoMultipointDiv = document.getElementById("geo_multipoint");
    var geoPolygonDiv = document.getElementById("geo_polygon");

    if(divID == "geo_multipoint"){
        if(geoPolygonDiv.classList.contains("show")){
            geoPolygonDiv.classList.remove("show");
            geoPolygonDiv.classList.remove("multipoint-parent");
        }

        geoMultipointDiv.classList.add("multipoint-parent");
        geoMultipointDiv.classList.add("show");

    }

    if(divID == "geo_polygon"){
        if(geoMultipointDiv.classList.contains("show")){
            geoMultipointDiv.classList.remove("show");
            geoMultipointDiv.classList.remove("multipoint-parent");
        }

        geoPolygonDiv.classList.add("multipoint-parent");
        geoPolygonDiv.classList.add("show");

    }
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
