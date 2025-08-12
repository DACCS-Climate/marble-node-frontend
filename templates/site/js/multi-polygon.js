function initializePointInputDiv(geometryType, divID) {
    var geoBboxDiv = document.getElementById(divID);
    var geoContentDiv;
    var geoAddButtonDiv;
    var addButton;
    var geojsonUploadDiv;
    var geojsonUploadInput;

    var geogeojsonUploadTitle = document.createElement("h5");
    geogeojsonUploadTitle.innerText = "OR: GeoJSON bounding box";

    // Create remove button, its container and an additional container parent for positioning
    var removeButtonContainerParent = document.createElement("div");
    removeButtonContainerParent.classList.add("remove-button");

    var removeButtonContainer = document.createElement("div");
    removeButtonContainer.id = geometryType + "_remove_container_1";
    removeButtonContainer.classList.add("display-none");

    var removePointButton = document.createElement("input");
    removePointButton.id = geometryType + "_remove_1";
    removePointButton.setAttribute("type", "button");
    removePointButton.value = "Remove Point";
    removePointButton.classList.add("button-med", "d-button-text");
    removePointButton.addEventListener("click", function() {
        removeEntry("geo_" + geometryType + "_content" , geometryType + "_1");
    });

    removeButtonContainer.appendChild(removePointButton);
    removeButtonContainerParent.appendChild(removeButtonContainer);

    //Clears div displaying geometry point input fields if the ID "geo_bbox" is passed
    // NOTE:  this was the original behaviour

    //If any other ID is passed, show the contents of the div
    // NOTE: This is newly added behaviour
    if(divID == "geo_bbox"){
        geoBboxDiv.innerHTML = "";
    }
    else{
        geoBboxDiv.classList.add("show");
        if(divID.includes("_content")){
            geoContentDiv = document.getElementById(divID );
        }
        else{
            geoContentDiv = document.getElementById(divID + "_content");
        }

    }


    //Only create the geojson upload input field and add button for the following geometries
    switch(divID){
        case "geo_multipoint":
        case "geo_linestring":
        case "geo_polygon":

            geojsonUploadDiv = document.createElement("div");
            geojsonUploadDiv.id = divID + "_geojson_upload_div";

            geojsonUploadInput = document.createElement("input");
            geojsonUploadInput.id = divID + "_geojson_file";
            geojsonUploadInput.setAttribute("type", "text");
            geojsonUploadInput.setAttribute("name", divID + "File");
            geojsonUploadInput.classList.add("input-textbox", "margin-input-field");

            geoAddButtonDiv = document.createElement("div");
            geoAddButtonDiv.id = "geo_multipoint" + "_add_button_div";

            addButton = document.createElement("input");
            addButton.id = divID + "_add_button";
            addButton.classList.add("button-med", "d-button-text");
            addButton.setAttribute("type", "button");
            addButton.setAttribute("value", "Add Point");
            addButton.addEventListener("click", function(){
                addPoint(geometryType, divID + "_content");
            });

            geoAddButtonDiv.appendChild(addButton);
            geojsonUploadDiv.appendChild(geogeojsonUploadTitle);
            geojsonUploadDiv.appendChild(geojsonUploadInput);

            break;
    }


    var coordinateInputContainerDiv = document.createElement("div");
    coordinateInputContainerDiv.id = geometryType + "_1";
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


    //TODO: Ask Cassie if 'bbox1' , 'bbox2' type IDs are needed for form processing
    // If so, rename IDs to use bbox in some way

    label1.innerText = "Latitude (Required):";
    label1.setAttribute("for", "lat_1");

    input1.setAttribute("type", "text");
    input1.setAttribute("id",  geometryType + "_lat_1");
    input1.setAttribute("name", geometryType + "_lat_1");

    label2.innerText = "Longitude (Required):";
    label2.setAttribute("for", geometryType + "_lon_2");

    input2.setAttribute("type", "text");
    input2.setAttribute("id", geometryType + "_lon_2");
    input2.setAttribute("name", geometryType + "_lon_2");

    latitudeContainer.appendChild(label1);
    latitudeContainer.appendChild(input1);
    longitudeContainer.appendChild(label2);
    longitudeContainer.appendChild(input2);
    coordinateInputContainerDiv.appendChild(latitudeContainer);
    coordinateInputContainerDiv.appendChild(longitudeContainer);
    coordinateInputContainerDiv.appendChild(removeButtonContainerParent);


    switch(divID){
        case "geo_bbox":
        case "geo_point":
            geoContentDiv.appendChild(coordinateInputContainerDiv);

            break;

        case "geo_multipoint":
        case "geo_linestring":
        case "geo_polygon":
            geoContentDiv.appendChild(coordinateInputContainerDiv);

            if(document.getElementById("geo_" + geometryType + "_add_button_div") == null &&
                document.getElementById("geo_" + geometryType + "_geojson_upload_div") == null) {
                geoBboxDiv.appendChild(geoAddButtonDiv);
                geoBboxDiv.appendChild(geojsonUploadDiv);
            }
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


function getCoordinateInputNum(geometryType){
    var coordinateInputArray = getCoordinateInputArray(geometryType);
    return coordinateInputArray.length;
}


function getCoordinateInputArray(geometryType){
    var coordinateIDPrefix ;
    var inputArray;

    if(geometryType == "author")
    {
        inputArray = document.querySelectorAll("[id^=fname]");
    }
    else{
        coordinateIDPrefix = geometryType + "_lat_";
        inputArray = document.querySelectorAll(`[id^=${coordinateIDPrefix}]`);
    }

    return inputArray
}

function addPoint(geometryType, divElementID) {
    var pointInputArray = getCoordinateInputArray(geometryType);

    if(pointInputArray.length < 1 || pointInputArray.length == null){
        var divElementIDArray = divElementID.split("_");
        var initializeDiv = divElementIDArray[0] + "_" + divElementIDArray[1];

        initializePointInputDiv(geometryType, initializeDiv);
    }
    else{
        var firstRemoveButton = document.getElementById(geometryType + "_remove_container_1");

        if(firstRemoveButton.classList.contains("show")){
            firstRemoveButton.classList.remove("show");
        }

        var pointDiv = document.getElementById(divElementID);
        var pointArray = getCoordinateInputArray(geometryType);

        var autindex = updateIndex(pointArray);

        var div_box = document.createElement("div");
        div_box.classList.add("child", "multipoint-additional-child");
        div_box.id = geometryType + "_" + autindex;

        var latitudeDiv = document.createElement("div");
        latitudeDiv.classList.add("latitude-child");
        var longitudeDiv = document.createElement("div");
        longitudeDiv.classList.add("longitude-child");
        var removeButtonDiv = document.createElement("div");
        removeButtonDiv.classList.add("remove-button");

        var label1 = document.createElement("label");
        label1.classList.add("subtitle-1");
        label1.innerText = "Latitude:";
        label1.setAttribute("for", geometryType + "_lat_" + autindex);

        var input1 = document.createElement("input");
        input1.classList.add("input-textbox", "margin-input-field");
        input1.setAttribute("type", "text");
        input1.setAttribute("id", geometryType + "_lat_" + autindex);
        input1.setAttribute("name", geometryType + "_lat_[]"); // Make it an array input
        input1.addEventListener("input", updateAuthorList); // Update list on input

        var label2 = document.createElement("label");
        label2.classList.add("subtitle-1");
        label2.innerText = "Longitude:";
        label2.setAttribute("for", geometryType + "_lon_" + autindex);

        var input2 = document.createElement("input");
        input2.classList.add("input-textbox", "margin-input-field");
        input2.setAttribute("type", "text");
        input2.setAttribute("id", geometryType + "_lon_" + autindex);
        input2.setAttribute("name", geometryType + "_lon_[]"); // Changed name to array input for last name

        var removePointButton = document.createElement("input");
        removePointButton.setAttribute("type", "button");
        removePointButton.value = "Remove Point";
        removePointButton.classList.add("button-med", "d-button-text");
        removePointButton.addEventListener("click", function() {
            removeEntry(divElementID, geometryType + "_" + autindex);
        });

        latitudeDiv.appendChild(label1);
        latitudeDiv.appendChild(input1);
        longitudeDiv.appendChild(label2);
        longitudeDiv.appendChild(input2);
        removeButtonDiv.appendChild(removePointButton);

        div_box.appendChild(latitudeDiv);
        div_box.appendChild(longitudeDiv);
        div_box.appendChild(removeButtonDiv);

        if(getCoordinateInputNum(geometryType) == 1){

        }
        pointDiv.appendChild(div_box);
    }


}

//TODO: Ask Cassie if this function is needed or if it's just duplicate code
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