function initializeDiv(divID) {

    var geoBboxDiv = document.getElementById(divID);
    var geoContentDiv;
    var geoPointRowsDiv;
    var geoAddButtonDiv;
    var addButton;
    var geojsonUploadDiv;
    var geojsonUploadInput;

    var geogeojsonUploadTitle = document.createElement("h5");
    geogeojsonUploadTitle.innerText = "OR: GeoJSON bounding box";

    if(divID == "geo_bbox"){
        geoBboxDiv.innerHTML = "";
    }
    else{
        geoBboxDiv.classList.add("show");
        geoContentDiv = document.getElementById(divID + "_content");
    }

    switch(divID){
        case "geo_multipoint":
        case "geo_linestring":
        case "geo_polygon":
            geoPointRowsDiv = document.createElement("div");
            geoPointRowsDiv.id = "geo_multipoint" + "_points_div";

            geoAddButtonDiv = document.createElement("div");
            geoAddButtonDiv.id = "geo_multipoint" + "_add_button_div";

            geojsonUploadDiv = document.createElement("div");
            geojsonUploadDiv.id = divID + "_geojson_upload_div";

            geojsonUploadInput = document.createElement("input");
            geojsonUploadInput.id = divID + "_geojson_file";
            geojsonUploadInput.setAttribute("type", "text");
            geojsonUploadInput.setAttribute("name", divID + "File");
            geojsonUploadInput.classList.add("input-textbox", "margin-input-field");

            addButton = document.createElement("input");
            addButton.id = divID + "_add_button";
            addButton.classList.add("button-med", "d-button-text");
            addButton.setAttribute("type", "button");
            addButton.setAttribute("value", "Add Point");
            addButton.addEventListener("click", function(){
                addPoint(divID + "_content");
            });

            geoAddButtonDiv.appendChild(addButton);
            geojsonUploadDiv.appendChild(geogeojsonUploadTitle);
            geojsonUploadDiv.appendChild(geojsonUploadInput);

            break;
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


    switch(divID){
        case "geo_bbox":
        case "geo_point":
            geoContentDiv.appendChild(coordinateInputContainerDiv);

            break;

        case "geo_multipoint":
        case "geo_linestring":
        case "geo_polygon":
            geoPointRowsDiv.appendChild(coordinateInputContainerDiv);
            geoContentDiv.appendChild(geoPointRowsDiv);
            geoBboxDiv.appendChild(geoAddButtonDiv);
            geoBboxDiv.appendChild(geojsonUploadDiv);

            break;

        case "geo_multi_linestring":
        case "geo_multi_polygon":
        case "geo_geometry_collection":
            geoContentDiv.appendChild(coordinateInputContainerDiv);

            break;
    }

/*
    if(divID == "geo_bbox"){
        geoBboxDiv.appendChild(coordinateInputContainerDiv);
    }
    else{
        geoPointRowsDiv.appendChild(coordinateInputContainerDiv);
        geoContentDiv.appendChild(geoPointRowsDiv);
        geoContentDiv.appendChild(geoAddButtonDiv);
    }*/
}

function initializeUploadDiv(divID){
    var geoContentDiv = document.getElementById(divID + "_content");
    var uploadTitle = document.createElement("h5");
    var uploadInput = document.createElement("input");
    var uploadDiv = document.createElement("div");

    uploadDiv.id = "upload_" + divID;
    uploadDiv.classList.add("child", "upload-geojson-child");

    uploadTitle.innerText = "GeoJSON bounding box";

    uploadInput.id = "my_" + divID + "_file";
    uploadInput.setAttribute("type", "text");
    uploadInput.setAttribute("name", "my_" + divID + "_file");
    uploadInput.classList.add("input-textbox", "margin-input-field")

    uploadDiv.appendChild(uploadTitle);
    uploadDiv.appendChild(uploadInput);

    geoContentDiv.appendChild(uploadDiv);

}


function swapDiv(divID){
    var geoBBoxDiv = document.getElementById("geo_bbox");
    var currentDiv = document.getElementById(divID);
    var geoNodeList = geoBBoxDiv.querySelectorAll("div.parent");

    for(parentDiv of geoNodeList){
        if(parentDiv.classList.contains("show")){
            parentDiv.classList.remove("show");
            parentDiv.classList.remove("multipoint-parent");
        }
        currentDiv.classList.add("multipoint-parent");
        currentDiv.classList.add("show");
    }
}

function addPoint(divElementID) {
        var pointDiv = document.getElementById(divElementID);
        var autindex = document.querySelectorAll("[id^=lat]").length + 1; // Count existing authors

        var div_box = document.createElement("div");
        div_box.classList.add("child", "multipoint-additional-child");
        div_box.id = "multipoint" + autindex;

        var latitudeDiv = document.createElement("div");
        latitudeDiv.classList.add("latitude-child");
        var longitudeDiv = document.createElement("div");
        longitudeDiv.classList.add("longitude-child");
        var removeButtonDiv = document.createElement("div");
        removeButtonDiv.classList.add("remove-button");

        var label1 = document.createElement("label");
        label1.classList.add("subtitle-1");
        label1.innerText = "Latitude:";
        label1.setAttribute("for", "lat" + autindex);

        var input1 = document.createElement("input");
        input1.classList.add("input-textbox", "margin-input-field");
        input1.setAttribute("type", "text");
        input1.setAttribute("id", "lat" + autindex);
        input1.setAttribute("name", "lat[]"); // Make it an array input
        input1.addEventListener("input", updateAuthorList); // Update list on input

        var label2 = document.createElement("label");
        label2.classList.add("subtitle-1");
        label2.innerText = "Longitude:";
        label2.setAttribute("for", "lon" + autindex);

        var input2 = document.createElement("input");
        input2.classList.add("input-textbox", "margin-input-field");
        input2.setAttribute("type", "text");
        input2.setAttribute("id", "lon" + autindex);
        input2.setAttribute("name", "lon[]"); // Changed name to array input for last name

        var removePointButton = document.createElement("input");
        removePointButton.setAttribute("type", "button");
        removePointButton.value = "Remove Point";
        removePointButton.classList.add("button-med", "d-button-text");
        removePointButton.addEventListener("click", function() {
            removeEntry(divElementID, "multipoint" + autindex);
        });

        latitudeDiv.appendChild(label1);
        latitudeDiv.appendChild(input1);
        longitudeDiv.appendChild(label2);
        longitudeDiv.appendChild(input2);
        removeButtonDiv.appendChild(removePointButton);

        div_box.appendChild(latitudeDiv);
        div_box.appendChild(longitudeDiv);
        div_box.appendChild(removeButtonDiv);

        pointDiv.appendChild(div_box);
    }


function getDivElements(divID){
//var divElements = document.getElementById(divID).children
    var divInputElements = document.getElementById(divID).querySelectorAll("input");

    var arrayLength = divInputElements.length;

    return arrayLength;
}

/*
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
*/