/*User Functions*/
function getUserInfo(){
     window.session_info.then(json => {
        return json.user["user_name"];
    })
}
/*Geometry Functions*/
function initializePointInputDiv(geometryType, divID) {
    var geoBboxDiv = document.getElementById(divID);
    var geoContentDiv;
    var geoAddButtonDiv;


    //Show the contents of the div with the passed divID
    //If the passed divID belongs to a content div, get the content div
    //If it isn't, add the content div suffix and get the content div
    geoBboxDiv.classList.add("show");

    if(divID.includes("_content")){
        geoContentDiv = document.getElementById(divID );
    }
    else{
        geoContentDiv = document.getElementById(divID + "_content");
    }

    //Only create the add button for geo_multipoint, geo_linestring, geo_polygon
    switch(divID){
        case "geo_point":
            var pointInputRow = createInputCoordinatesRow("point",1);
            geoContentDiv.appendChild(pointInputRow);

            break;

        case "geo_multipoint":
            geoAddButtonDiv = createAddCoordinateRowButton(geometryType, "geo_multipoint");
            var multipointInputRow = createInputCoordinatesRow("multipoint", 1);
            geoContentDiv.appendChild(multipointInputRow);

            if(document.getElementById("geo_" + geometryType + "_add_button_div") == null &&
                document.getElementById("geo_" + geometryType + "_geojson_upload_div") == null) {
                geoBboxDiv.appendChild(geoAddButtonDiv);
            }

            break;

        case "geo_linestring":
            geoAddButtonDiv = createAddCoordinateRowButton(geometryType, "geo_linestring");

            for (let i = 0; i < 2; i++ ){
                var linestringInputRow = createInputCoordinatesRow("linestring", i);
                geoContentDiv.appendChild(linestringInputRow);
            }

            if(document.getElementById("geo_" + geometryType + "_add_button_div") == null &&
                document.getElementById("geo_" + geometryType + "_geojson_upload_div") == null) {
                geoBboxDiv.appendChild(geoAddButtonDiv);
            }

            break;

        case "geo_polygon":
            geoAddButtonDiv = createAddCoordinateRowButton(geometryType, "geo_polygon");

            for (let i = 0; i < 3; i++ ){
                var polygonInputRow = createInputCoordinatesRow("polygon", i);
                geoContentDiv.appendChild(polygonInputRow);
            }

            if(document.getElementById("geo_" + geometryType + "_add_button_div") == null &&
                document.getElementById("geo_" + geometryType + "_geojson_upload_div") == null) {
                geoBboxDiv.appendChild(geoAddButtonDiv);
            }
            break;

    }
}

function initializeUploadDiv(divID){
    var geoContentDiv = document.getElementById(divID + "_content");
    var uploadTitle = document.createElement("h5");
    var uploadInput = document.createElement("textarea");
    var uploadDiv = document.createElement("div");
    var uploadValidationError = document.createElement("p");

    uploadDiv.id = "upload_" + divID;
    uploadDiv.classList.add("upload-geojson-child");

    uploadTitle.innerText = "Paste GeoJSON";

    uploadInput.id = "my_" + divID + "_file";
    uploadInput.setAttribute("name", "my_" + divID + "_file");
    uploadInput.setAttribute("required", "required");
    uploadInput.classList.add("textarea-geojson", "margin-input-field")
    uploadInput.addEventListener("input", () => {
        validateUploadGeoJSON("my_" + divID + "_file");
    })

    uploadValidationError.id = "uploadGeoJSONError";
    uploadValidationError.classList.add("subtitle-1", "error-validation", "margin-geojson-input-error", "error-not-visible");
    uploadValidationError.innerText = "GeoJSON Invalid";

    uploadDiv.appendChild(uploadTitle);
    uploadDiv.appendChild(uploadInput);
    uploadDiv.appendChild(uploadValidationError);

    geoContentDiv.appendChild(uploadDiv);
}


function createInputCoordinatesRow(geometryType, indexNum) {
    var coordinateInputContainerDiv = document.createElement("div");
    coordinateInputContainerDiv.id = geometryType + "_" + indexNum;
    coordinateInputContainerDiv.classList.add("multipoint-child");

    var latitudeContainer = document.createElement("div");
    latitudeContainer.classList.add("latitude-child");

    var label1 = document.createElement("label");
    label1.id = "label_" + geometryType + "_lat_" + indexNum;
    label1.classList.add("subtitle-1", "margin-input-label");

    label1.innerHTML = "Latitude (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
    label1.setAttribute("for", "lat_" + indexNum);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("required", "required");
    input1.setAttribute("type", "number");
    input1.setAttribute("min", "-90");
    input1.setAttribute("max", "90");
    input1.setAttribute("step", "0.00001");
    input1.setAttribute("id", geometryType + "_lat_" + indexNum);
    input1.setAttribute("name", geometryType + "_lat_" + indexNum);

    var longitudeContainer = document.createElement("div");
    longitudeContainer.classList.add("longitude-child");

    var label2 = document.createElement("label");
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.id = "label_" + geometryType + "_lon_" + indexNum;
    label2.innerHTML = "Longitude (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
    label2.setAttribute("for", geometryType + "_lon_" + indexNum);


    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("required", "required");
    input2.setAttribute("type", "number");
    input2.setAttribute("min", "-180");
    input2.setAttribute("max", "180");
    input2.setAttribute("step", "0.00001");
    input2.setAttribute("id", geometryType + "_lon_" + indexNum);
    input2.setAttribute("name", geometryType + "_lon_" + indexNum);


    // Create remove button, its container and an additional container parent for positioning
    var removeButtonContainerParent = document.createElement("div");
    removeButtonContainerParent.classList.add("remove-button");

    var removeButtonContainer = document.createElement("div");
    removeButtonContainer.id = geometryType + "_remove_container_" + indexNum;
    removeButtonContainer.classList.add("display-none");

    var removePointButton = document.createElement("input");
    removePointButton.id = geometryType + "_remove_" + indexNum;
    removePointButton.setAttribute("type", "button");
    removePointButton.value = "Remove Point";
    removePointButton.classList.add("button-med", "d-button-text");
    removePointButton.addEventListener("click", function () {
        removeEntry("geo_" + geometryType + "_content", geometryType + "_" + indexNum);
    });

    removeButtonContainer.appendChild(removePointButton);
    removeButtonContainerParent.appendChild(removeButtonContainer);


    latitudeContainer.appendChild(label1);
    latitudeContainer.appendChild(input1);
    longitudeContainer.appendChild(label2);
    longitudeContainer.appendChild(input2);
    coordinateInputContainerDiv.appendChild(latitudeContainer);
    coordinateInputContainerDiv.appendChild(longitudeContainer);
    coordinateInputContainerDiv.appendChild(removeButtonContainerParent);

    return coordinateInputContainerDiv;
}


function createAddCoordinateRowButton(geometryType, divID){
    var geoAddButtonDiv = document.createElement("div");
    geoAddButtonDiv.id = divID + "_add_button_div";

    var addButton = document.createElement("input");
    addButton.id = divID + "_add_button";
    addButton.classList.add("button-med", "d-button-text", "margin-button-add");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value", "Add Point");
    addButton.addEventListener("click", function(){
        addPoint(geometryType, divID + "_content");
    });

    geoAddButtonDiv.appendChild(addButton);

    return geoAddButtonDiv;
}

function swapDiv(divID, geometryType) {
    var geoBBoxDiv = document.getElementById("geo_bbox");
    var currentDiv = document.getElementById(divID);
    var geoNodeList = geoBBoxDiv.querySelectorAll("div#geo_bbox > [id^=geo_]");

    for(parentDiv of geoNodeList){
        if(parentDiv.classList.contains("show")){
            parentDiv.classList.remove("show");
            parentDiv.classList.remove("multipoint-parent");

            var invisibleParentDivIDArray = parentDiv.id.split("_");

            if(invisibleParentDivIDArray[1] != "json" && invisibleParentDivIDArray[1] != "null"){
                geometryType = invisibleParentDivIDArray[1];
            }

            var invisibleParentContentDiv = document.getElementById(parentDiv.id + "_content");
            var coordinateIDPrefixLat = geometryType + "_lat_";
            var coordinateIDPrefixLon = geometryType + "_lon_";
            var latList = invisibleParentContentDiv.querySelectorAll(`[id^=${coordinateIDPrefixLat}]`);
            var lonList = invisibleParentContentDiv.querySelectorAll(`[id^=${coordinateIDPrefixLon}]`);

            for(latInput of latList){
                if(latInput.getAttribute("required")){
                    latInput.removeAttribute("required");
                }
                else{
                    latInput.setAttribute("required", "required");
                }
            }

            for(lonInput of lonList){
                if(lonInput.getAttribute("required")){
                    lonInput.removeAttribute("required");
                }
                else{
                    lonInput.setAttribute("required", "required");
                }
            }
        }

        currentDiv.classList.add("multipoint-parent");
        currentDiv.classList.add("show");
    }
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
    var currentPointIndex;
    var pointInputItem;
    var pointInputID;
    var pointIDArray;

    if(pointInputArray.length > 1){
        for (let i = 0; i < pointInputArray.length; i++){
            pointInputItem = pointInputArray[i];
            pointInputID = pointInputItem.id;
            pointIDArray = pointInputID.split("_");
            currentPointIndex = pointIDArray[2];

            var currentRemoveButton = document.getElementById(geometryType + "_remove_container_" + currentPointIndex);

            if(!currentRemoveButton.classList.contains("show")){
                currentRemoveButton.classList.add("show");
            }
        }
    }
    else{
        var firstPointInputItem = pointInputArray[0];
        var currentPointID = firstPointInputItem.id;
        var currentPointIDArray = currentPointID.split("_");
        currentPointIndex = currentPointIDArray[2];

         var firstRemoveButton = document.getElementById(geometryType + "_remove_container_" + currentPointIndex);

        if(!firstRemoveButton.classList.contains("show")){
            firstRemoveButton.classList.add("show");
        }
    }


    var pointDiv = document.getElementById(divElementID);
    var pointArray = getCoordinateInputArray(geometryType);

    var autindex = updateIndex(pointArray);

    var div_box = document.createElement("div");
    div_box.classList.add("multipoint-additional-child");
    div_box.id = geometryType + "_" + autindex;

    var latitudeDiv = document.createElement("div");
    latitudeDiv.classList.add("latitude-child");

    var longitudeDiv = document.createElement("div");
    longitudeDiv.classList.add("longitude-child");

    var removeButtonParentDiv = document.createElement("div");
    removeButtonParentDiv.classList.add("remove-button");

    var removeButtonDiv = document.createElement("div");
    removeButtonDiv.id = geometryType + "_remove_container_" + autindex;
    removeButtonDiv.classList.add("display-none", "show");


    var label1 = document.createElement("label");
    label1.classList.add("subtitle-1", "margin-input-label");
    label1.innerText = "Latitude:";
    label1.id = "label_" + geometryType + "_lat_" + autindex;
    label1.setAttribute("for", geometryType + "_lat_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", geometryType + "_lat_" + autindex);
    input1.setAttribute("name", geometryType + "_lat_[]"); // Make it an array input

    var label2 = document.createElement("label");
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.innerText = "Longitude:";
    label2.id = "label_" + geometryType + "_lon_" + autindex;
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
    removeButtonParentDiv.appendChild(removeButtonDiv);

    div_box.appendChild(latitudeDiv);
    div_box.appendChild(longitudeDiv);
    div_box.appendChild(removeButtonParentDiv);

    pointDiv.appendChild(div_box);
}


function geoPolygon2(selected_geometry) {

    switch (selected_geometry) {
        case 1:
            if (document.getElementById("geo_point_content").querySelector(".multipoint-child") != null) {
                swapDiv('geo_point', 'point');
            } else {
                swapDiv('geo_point', 'point');
                initializePointInputDiv('point', 'geo_point');
            }

            break;

        case 2:
            // For MultiPoint
            if (document.getElementById("geo_multipoint_content").querySelector(".multipoint-child") != null
                || document.getElementById("geo_multipoint_content").querySelector(".multipoint-additional-child") != null) {
                swapDiv('geo_multipoint', 'multipoint');
            } else {
                swapDiv('geo_multipoint', 'multipoint');
                initializePointInputDiv('multipoint', 'geo_multipoint');
            }

            break;

        case 3:
            // For LineString
            if (document.getElementById("geo_linestring_content").querySelector(".multipoint-child") != null
                || document.getElementById("geo_linestring_content").querySelector(".multipoint-additional-child") != null) {
                swapDiv('geo_linestring', 'linestring');
            } else {
                swapDiv('geo_linestring', 'linestring');
                initializePointInputDiv('linestring', 'geo_linestring');
            }

            break;

        case 4:
            // For Polygon
            if (document.getElementById("geo_polygon_content").querySelector(".multipoint-child") != null
                || document.getElementById("geo_polygon_content").querySelector(".multipoint-additional-child") != null) {
                swapDiv('geo_polygon', 'polygon');
            } else {
                swapDiv('geo_polygon', 'polygon');
                initializePointInputDiv('polygon', 'geo_polygon');
            }

            break;

        case 5:
            // For GeoJSON Upload (Multi Line String, Multi Polygon, Geometry Collection)
            if (document.getElementById("geo_json_upload_content").querySelector(".upload-geojson-child") != null) {
                swapDiv('geo_json_upload');
            } else {
                swapDiv('geo_json_upload');
                initializeUploadDiv('geo_json_upload');
            }

            break;

        case 6:
            // For Non-Spatial
            if (document.getElementById("geo_null_content").querySelector(".multipoint-child") != null) {
                swapDiv('geo_null');
            } else {
                swapDiv('geo_null');
                document.getElementById('geo_null_content').innerText = "No bounding box required";
            }

            break;
    }
}

/*Author functions*/
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
    div_box.classList.add("author-additional-child");

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

    var requiredSpan = document.createElement("span");
    requiredSpan.innerText = " *";
    requiredSpan.classList.add("subtitle-1", "required-asterisk");

    var label1 = document.createElement("label");
    label1.innerText = "First Name";
    label1.classList.add("subtitle-1", "margin-input-label");
    label1.id = "label_fname_" + autindex;
    label1.setAttribute("for", "fname_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "fname_" + autindex);
    input1.setAttribute("name", "fname_[]"); // Make it an array input

    var label2 = document.createElement("label");
    label2.innerText = "Last Name/Only Name (Required)";
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.id = "label_lname_" + autindex;
    label2.setAttribute("for", "lname_" + autindex);
    label2.appendChild(requiredSpan);



    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "lname_" + autindex);
    input2.setAttribute("name", "lname_[]"); // Changed name to array input for last name
    input2.setAttribute("required", "required");

    var label3 = document.createElement("label");
    label3.innerText = "Email";
    label3.classList.add("subtitle-1", "margin-input-label");
    label3.id = "label_email_" + autindex;
    label3.setAttribute("for", "email_" + autindex);

    var input3 = document.createElement("input");
    input3.classList.add("input-textbox", "margin-input-field");
    input3.setAttribute("type", "email");
    input3.setAttribute("id", "email_" + autindex);
    input3.setAttribute("name", "email_[]"); // Make it an array input

    var removeAuthorButton = document.createElement("input");
    removeAuthorButton.setAttribute("type", "button");
    removeAuthorButton.value = "Remove Author";
    removeAuthorButton.classList.add("button-med", "d-button-text");
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

function addOther(divElementID){
    var autindex;
    var inputRow = document.createElement("div");
    var errorRow = document.createElement("div");
    var otherDiv = document.getElementById(divElementID);
    var otherArray = document.querySelectorAll("[id^=other_key]");
    autindex = updateIndex(otherArray);

    var div_box = document.createElement("div");
    div_box.id = "other_" + autindex;

    inputRow.classList.add("other-additional-child");
    errorRow.classList.add("other-additional-child");

    var divOtherKey = document.createElement("div");
    divOtherKey.classList.add("other-details");

    var divOtherVal = document.createElement("div");
    divOtherVal.classList.add("other-details");

    var divRemoveOther = document.createElement("div");
    divRemoveOther.id = "other_remove_container_" + autindex;
    divRemoveOther.classList.add("display-none", "show");

    var divRemoveOtherParent = document.createElement("div");
    divRemoveOtherParent.classList.add("remove-button");

    var label1 = document.createElement("label");
    label1.innerText = "Key:";
    label1.classList.add("subtitle-1", "margin-input-label");
    label1.id = "label_other_key_" + autindex;
    label1.setAttribute("for", "other_key_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "other_key_" + autindex);
    input1.setAttribute("name", "other_key_[]"); // Make it an array input

    var errorKeyContainer = document.createElement("div");
    errorKeyContainer.classList.add("error-message-container");

    var errorKey = document.createElement("p");
    errorKey.id = "error_key_" + autindex;
    errorKey.classList.add("error-validation", "error-message", "display-none");
    errorKey.innerText = "Key cannot be empty if there is a value";

    var label2 = document.createElement("label");
    label2.innerText = "Value:";
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.id = "label_other_value_" + autindex;
    label2.setAttribute("for", "other_value_" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "other_value_" + autindex);
    input2.setAttribute("name", "other_value_[]"); // Changed name to array input for last name

    var errorValueContainer = document.createElement("div");
    errorValueContainer.classList.add("error-message-container");

    var errorValue = document.createElement("p");
    errorValue.id = "error_value_" + autindex;
    errorValue.classList.add("error-validation", "error-message", "display-none");
    errorValue.innerText = "Value cannot be empty if there is a key";

    var removeAuthorButton = document.createElement("input");
    removeAuthorButton.setAttribute("type", "button");
    removeAuthorButton.value = "Remove Other";
    removeAuthorButton.classList.add("button-med", "d-button-text");
    removeAuthorButton.addEventListener("click", function() {
        removeEntry("other_box", "other_" + autindex)
    });

    divOtherKey.appendChild(label1);
    divOtherKey.appendChild(input1);

    divOtherVal.appendChild(label2);
    divOtherVal.appendChild(input2);

    divRemoveOther.appendChild(removeAuthorButton);
    divRemoveOtherParent.appendChild(divRemoveOther);

    inputRow.appendChild(divOtherKey);
    inputRow.appendChild(divOtherVal);
    inputRow.appendChild(divRemoveOtherParent);

    errorKeyContainer.appendChild(errorKey)
    errorRow.appendChild(errorKeyContainer);

    errorValueContainer.appendChild(errorValue);
    errorRow.appendChild(errorValueContainer);

    div_box.appendChild(inputRow);
    div_box.appendChild(errorRow);

    otherDiv.appendChild(div_box);
}


function addModel(divElementID){
    var autindex;
    var inputRow = document.createElement("div");
    var errorRow = document.createElement("div");
    var modelDiv = document.getElementById(divElementID);
    var modelArray = document.querySelectorAll("[id^=model_name]");
    autindex = updateIndex(modelArray);

    var div_box = document.createElement("div");
    div_box.id = "model_" + autindex;

    inputRow.classList.add("model-additional-child");
    errorRow.classList.add("model-additional-child");

    var divModelName = document.createElement("div");
    divModelName.classList.add("model-details");

    var divModelLink = document.createElement("div");
    divModelLink.classList.add("model-details");

    var divRemoveOther = document.createElement("div");
    divRemoveOther.id = "model_remove_container_" + autindex;
    divRemoveOther.classList.add("display-none", "show");

    var divRemoveOtherParent = document.createElement("div");
    divRemoveOtherParent.classList.add("remove-button");

    var label1 = document.createElement("label");
    label1.innerText = "Model Name";
    label1.classList.add("subtitle-1", "margin-input-label");
    label1.id = "label_model_name_" + autindex;
    label1.setAttribute("for", "model_name_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "model_name_" + autindex);
    input1.setAttribute("name", "model_name_[]"); // Make it an array input

    var errorKeyContainer = document.createElement("div");
    errorKeyContainer.classList.add("error-message-container");

    var errorKey = document.createElement("p");
    errorKey.id = "error_name_" + autindex;
    errorKey.classList.add("error-validation", "error-message", "display-none");
    errorKey.innerText = "Model name cannot be empty if there is a link";

    var label2 = document.createElement("label");
    label2.innerText = "Link";
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.id = "label_model_link_" + autindex;
    label2.setAttribute("for", "model_link_" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "model_link_" + autindex);
    input2.setAttribute("name", "model_link_[]"); // Changed name to array input for last name

    var errorValueContainer = document.createElement("div");
    errorValueContainer.classList.add("error-message-container");

    var errorValue = document.createElement("p");
    errorValue.id = "error_link_" + autindex;
    errorValue.classList.add("error-validation", "error-message", "display-none");
    errorValue.innerText = "Link cannot be empty if there is a model name";

    var removeAuthorButton = document.createElement("input");
    removeAuthorButton.setAttribute("type", "button");
    removeAuthorButton.value = "Remove Model";
    removeAuthorButton.classList.add("button-med", "d-button-text");
    removeAuthorButton.addEventListener("click", function() {
        removeEntry("model_box", "model_" + autindex)
    });

    divModelName.appendChild(label1);
    divModelName.appendChild(input1);

    divModelLink.appendChild(label2);
    divModelLink.appendChild(input2);

    divRemoveOther.appendChild(removeAuthorButton);
    divRemoveOtherParent.appendChild(divRemoveOther);

    inputRow.appendChild(divModelName);
    inputRow.appendChild(divModelLink);
    inputRow.appendChild(divRemoveOtherParent);

    errorKeyContainer.appendChild(errorKey)
    errorRow.appendChild(errorKeyContainer);

    errorValueContainer.appendChild(errorValue);
    errorRow.appendChild(errorValueContainer);

    div_box.appendChild(inputRow);
    div_box.appendChild(errorRow);

    modelDiv.appendChild(div_box);
}


function addEntry(categoryName, parentElementID, inputLabelArray, existingInputID){
    var rowIndex;
    var inputRow = document.createElement("div");
    var errorRow = document.createElement("div");
    var parentElementDiv = document.getElementById(parentElementID);
    var existingInputArray = document.querySelectorAll(`[id^=${existingInputID}]`);
    rowIndex = updateIndex(existingInputArray);

    var div_box = document.createElement("div");
    div_box.id = categoryName + "_" + autindex;

    inputRow.classList.add("input-additional-child");
    errorRow.classList.add("input-additional-child");

    for(labelText of inputLabelArray){
        var labelID = "label_" + labelText.toLowerCase()
    }

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

            var firstNameInput = document.getElementById("fname_" + currentInputIndex);

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
        switch (inputArray.length){
            case 1:
                makeInputRequired(geometryType, inputArray);

            case 2:
                if(geometryType == "linestring"){
                    makeInputRequired(geometryType, inputArray);
                }
            case 3:
                if(geometryType == "polygon"){
                    makeInputRequired(geometryType, inputArray);
                }
        }
    }
}

function makeInputRequired(geometryType, inputArray){
    var labelCoordinateIDPrefix = "label_" + geometryType;
    var removeButtonPrefix = geometryType + "_remove_container_";
    var removeButtonsLastRemaining =  document.querySelectorAll(`[id^=${removeButtonPrefix}]`);

    for (button of removeButtonsLastRemaining){
        if(!button.classList.contains("show")){
            button.classList.add("show");
        }
        else{
            button.classList.remove("show");
        }
    }

    for(inputItem of inputArray){
        if(inputItem.getAttribute("required") == null){
            var inputItemIDArray = inputItem.id.split("_");
            var currentInputItemIndex = inputItemIDArray[2];
            var latLabel = document.getElementById(labelCoordinateIDPrefix + "_lat_" + currentInputItemIndex);
            var lonLabel = document.getElementById(labelCoordinateIDPrefix + "_lon_" + currentInputItemIndex);

            inputItem.setAttribute("required", "required");

            var latLabelArray = latLabel.innerText.split(":");
            latLabel.innerHTML = latLabelArray[0] + " (Required) <span class='subtitle-1 required-asterisk'>*</span>:";

            var lonLabelArray = lonLabel.innerText.split(":");
            lonLabel.innerHTML = lonLabelArray[0] + " (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
        }
    }
}


function updateIndex(additionalInputArray) {
    var lastInput = additionalInputArray[additionalInputArray.length - 1]
    var lastInputID = lastInput.id;
    var lastInputIDArray = lastInputID.split("_");

    var inputFieldIndex;

    if (lastInputIDArray.length > 2) {
        inputFieldIndex = parseInt(lastInputIDArray[2]) + 1;
    } else {
        inputFieldIndex = parseInt(lastInputIDArray[1]) + 1;
    }

    return inputFieldIndex
}

function calendarDatesEqual(checkboxDateEqualID, checkboxNoTemporalID, startDateID, endDateID){
    var checkboxDateEqualElement = document.getElementById(checkboxDateEqualID);
    var checkboxNoTemporalElement = document.getElementById(checkboxNoTemporalID);
    var startDateElement = document.getElementById(startDateID);
    var endDateElement = document.getElementById(endDateID);

    if(checkboxDateEqualElement.checked){
        startDateElement.removeAttribute("disabled");
        endDateElement.setAttribute("disabled", "disabled");

        if(startDateElement.value != ""){
            endDateElement.value = startDateElement.value;
        }

        if(checkboxNoTemporalElement.checked){
            checkboxNoTemporalElement.checked = false;
        }
    }
    else{
        endDateElement.value = "";
        endDateElement.removeAttribute("disabled");
    }
}

function calendarDatesNone(checkboxDateEqualID, checkboxNoTemporalID, startDateID, endDateID){
    var checkboxNoTemporalElement = document.getElementById(checkboxNoTemporalID);
    var checkboxDateEqualElement = document.getElementById(checkboxDateEqualID);
    var startDateElement = document.getElementById(startDateID);
    var endDateElement = document.getElementById(endDateID);

    if(checkboxNoTemporalElement.checked){
        endDateElement.value = "";
        startDateElement.value = "";
        startDateElement.setAttribute("disabled", "disabled");
        endDateElement.setAttribute("disabled", "disabled");

        if(checkboxDateEqualElement.checked){
            checkboxDateEqualElement.checked = false;
        }
    }
    else{
        startDateElement.removeAttribute("disabled");
        endDateElement.removeAttribute("disabled");
    }
}

function copyStartDate(startDateElementID, endDateElementID, checkboxDateEqualID){
    var startDateInput = document.getElementById(startDateElementID);
    var endDateInput = document.getElementById(endDateElementID);
    var checkboxEqualDateInput = document.getElementById(checkboxDateEqualID);

    if(checkboxEqualDateInput.checked){
        endDateInput.value = startDateInput.value;
    }
}


function checkRequired(){
    var requiredInputs = document.querySelectorAll('[required]');
    for(input of requiredInputs){
        if(!input.classList.contains("required")){
            input.classList.add("required");
        }
    }
}

function validateUploadGeoJSON(elementID){
    var uploadGeoJSONInput = document.getElementById(elementID);
    var uploadGeoJSONError = document.getElementById("uploadGeoJSONError");
    var parsedGeoJSON;
    var uploadGeoJSONCleaned;

    if(uploadGeoJSONInput.value != "") {
        if (uploadGeoJSONInput.value.indexOf("\n") > -1) {
            uploadGeoJSONCleaned = uploadGeoJSONInput.value.replaceAll("\n", "");
            uploadGeoJSONCleaned = uploadGeoJSONCleaned.replaceAll(" ", "");
        } else {
            uploadGeoJSONCleaned = uploadGeoJSONInput.value
        }

        try {
            parsedGeoJSON = JSON.parse(uploadGeoJSONCleaned);

            if (uploadGeoJSONError.classList.contains("error-visible")) {
                uploadGeoJSONError.classList.remove("error-visible");
                uploadGeoJSONError.classList.add("error-not-visible");
            }
        } catch (e) {
            uploadGeoJSONError.classList.remove("error-not-visible");
            uploadGeoJSONError.classList.add("error-visible");
        }

    }

    return parsedGeoJSON;
}



/*Submit functions*/
async function submitForm(){
    checkRequired();

    // Example of how polygon coordinates should be formatted
    //  [ [ 19.732387792295356,17.362269487080525],[ 15.018600022717294, 11.450658457798042],[29.998879431116166, 6.631460284225298] ]
    var submitObject = {};
    var geojsonTemplate =     { "coordinates": [], "type": ""}
    var usernameInput = document.getElementById("username");
    var titleInput = document.getElementById("title");
    var descriptionInput = document.getElementById("desc");
    var geometryInputFields = document.querySelectorAll("input[id*='_lat_']");
    var contactEmail = document.getElementById("contact_email");
    var authorDivs = document.querySelectorAll("div[id^=author_]");
    var authorArray = [];
    var geometryType;
    var visibleGeometry;
    var geometryContainer;
    var coordinateArray = [];
    var geometryGeoJSONBBox;
    var geometryGeoJSONFileInput = document.querySelectorAll("textarea[id^=my_geo]");
    var dateMetadataFields = document.querySelectorAll("input[id*=_date]");
    var textAreaMetadataVariables = document.getElementById("metadata_vars");
    var metadataObject = {};
    var textareaMetadataArray;
    var linkedFilesFields = document.querySelectorAll("textarea[id^=linked_]");
    var linkedFilesObject = {};
    var otherMetadataInputFields = document.querySelectorAll("input[id^=other_key_]");
    var metadataModelsInputFields = document.querySelectorAll("input[id^=model_name_]");
    var metadataModelsArray = [];
    var otherMetadataArray = [];


    /*Adds Geometry coordinate input to geometryTemplate object*/
    /*If no coordinates are entered get the input from the geojson textarea*/
    /*If a geometry with no coordinate inputs is selected (eg. upload geojson) only get input from the geojson textarea*/
    if(geometryInputFields.length > 0){
        for (input of geometryInputFields) {
            var inputIDArray = input.id.split("_");
            geometryType = inputIDArray[0];
            geometryContainer = document.getElementById("geo_" + geometryType);

            if (geometryContainer.classList.contains("show")) {
                visibleGeometry = geometryType;
                var coordinate = [];

                if (input.value != "") {
                    var longitudeID = geometryType + "_lon_" + inputIDArray[2];
                    var longitudeInput = document.getElementById(longitudeID);

                    coordinate[0] = input.value;
                    coordinate[1] = longitudeInput.value;

                    coordinateArray.push(coordinate);
                }
            }
        }
    }

    if(geometryGeoJSONFileInput.length > 0){
        for(geometryFile of geometryGeoJSONFileInput){
            var firstUnderscoreIndex = geometryFile.id.indexOf('_');
            var lastUnderscoreIndex = geometryFile.id.lastIndexOf('_');
            geometryContainer = document.getElementById(geometryFile.id.slice(firstUnderscoreIndex + 1, lastUnderscoreIndex));

            if(geometryContainer.classList.contains("show")){
                geometryGeoJSONBBox = validateUploadGeoJSON(geometryFile.id);
            }
        }
    }


    /*Add Author input to authorObject*/
    for(author of authorDivs){
        var authorObject = {};
        var authorIDArray = author.id.split("_");

        if(isNaN(Number(authorIDArray[1])) == false ){
            var authorFirstName = document.getElementById("fname_" + authorIDArray[1]);
            var authorLastName = document.getElementById("lname_" + authorIDArray[1]);
            var authorEmail = document.getElementById("email_" + authorIDArray[1]);

            authorObject["first_name"] = authorFirstName.value;
            authorObject["last_name"] = authorLastName.value;
            authorObject["email"] = authorEmail.value;

            authorArray.push(authorObject);
        }
    }



    /*Add Metadata Variables to metadataObject*/

    if(textAreaMetadataVariables.value != ""){
        if(textAreaMetadataVariables.value.indexOf("\n") > -1){
            textareaMetadataArray = textareaMetadata.value.split("\n");
        }
        metadataObject[textareaMetadata.id] = textareaMetadataArray;
    }

    /*Add Metadata Models input to metadataObject*/
    for (modelInput of metadataModelsInputFields) {
        var modelInputIDArray = modelInput.id.split("_");
        geometryType = modelInputIDArray[0];
        var currentModelIndex = modelInputIDArray[2];
        var modelLinkID = geometryType + "_link_" + currentModelIndex;
        var modelLinkInput = document.getElementById(modelLinkID);
        var errorNameInput = document.getElementById("error_name_" + currentModelIndex);
        var errorLinkInput = document.getElementById("error_link_" + currentModelIndex);


        if (modelInput.value != "" && modelLinkInput.value != "") {
            var metadataModelObject = {"name":"", "href":""};

            metadataModelObject["name"] = modelInput.value;
            metadataModelObject["href"] = modelLinkInput.value;

            metadataModelsArray.push(metadataModelObject);

            if(errorNameInput.classList.contains("show")){
                errorNameInput.classList.remove("show");
            }

            if(errorLinkInput.classList.contains("show")){
                errorLinkInput.classList.remove("show");
            }


        }

        if (modelInput.value != "" && modelLinkInput.value == "") {
            errorLinkInput.classList.add("show");

            if(errorNameInput.classList.contains("show")){
                errorNameInput.classList.remove("show");
            }
        }

        if(modelInput.value == "" && modelLinkInput.value != ""){
            errorNameInput.classList.add("show");

            if(errorLinkInput.classList.contains("show")){
                errorLinkInput.classList.remove("show");
            }
        }
    }


    /*If key-value input in Other section, add it to metadataOtherObject, and then add the object to the otherMetadataArray*/
    for (otherInput of otherMetadataInputFields) {
        var otherInputIDArray = otherInput.id.split("_");
        geometryType = otherInputIDArray[0];
        var currentOtherIndex = otherInputIDArray[2];
        var otherValueID = geometryType + "_value_" + currentOtherIndex;
        var otherValueInput = document.getElementById(otherValueID);
        var errorKeyInput = document.getElementById("error_key_" + currentOtherIndex);
        var errorValueInput = document.getElementById("error_value_" + currentOtherIndex);

        if (otherInput.value != "" && otherValueInput.value != "") {
            var metadataOtherObject = {"key":"", "value":""};

            metadataOtherObject["key"] = otherInput.value;
            metadataOtherObject["value"] = otherValueInput.value;

            otherMetadataArray.push(metadataOtherObject);

            if(errorKeyInput.classList.contains("show")){
                errorKeyInput.classList.remove("show");
            }

            if(errorValueInput.classList.contains("show")){
                errorValueInput.classList.remove("show");
            }


        }

        if (otherInput.value != "" && otherValueInput.value == "") {
            errorValueInput.classList.add("show");

            if(errorKeyInput.classList.contains("show")){
                errorKeyInput.classList.remove("show");
            }
        }

        if(otherInput.value == "" && otherValueInput.value != ""){
            errorKeyInput.classList.add("show");

            if(errorValueInput.classList.contains("show")){
                errorValueInput.classList.remove("show");
            }
        }
    }

    /*Create metadata_model entry and add Metadata Model input to metadataObject if user has input model-link*/
    if(metadataModelsArray.length > 0){
        metadataObject["metadata_model"] = metadataModelsArray;
    }


    /*Create metadata_other entry and add Metadata Other input to metadataObject if user has input key-value*/
    if(otherMetadataArray.length > 0){
        metadataObject["metadata_other"] = otherMetadataArray;        
    }

    /*Add Linked Files input to linkedFilesObject*/
    for(linkedFile of linkedFilesFields){
        if(linkedFile.value.includes("\n")){
            var linkedFileArray = linkedFile.value.split("\n");
            for(linkedFileEntry of linkedFileArray){
                linkedFileEntry = linkedFileEntry.trim();
            }
            linkedFilesObject[linkedFile.id] = linkedFileArray;
        }
        else{
            linkedFilesObject[linkedFile.id] = linkedFile.value.trim();
        }
    }



    /*Add items to submit object*/
    /*Add Geometry input to GeoJSON template object*/
    if(coordinateArray.length > 0){
        geojsonTemplate.coordinates.push(coordinateArray);
        geojsonTemplate.type = visibleGeometry;
        submitObject["SubmittedGeometry"] = geojsonTemplate;
    }
    else{
        submitObject["SubmittedGeometry"] = geometryGeoJSONBBox;
    }

    /*Add Metadata date input to submitObject*/
    if(dateMetadataFields[0].value == "" && dateMetadataFields[1].value == ""){
        for(dateMetadata of dateMetadataFields){
            metadataObject[dateMetadata.id] = null;
        }
    }
    else{
        for(dateMetadata of dateMetadataFields){
            metadataObject[dateMetadata.id] = dateMetadata.value;
        }
    }

    submitObject["username"] = await getUserInfo();
    submitObject["title"] = titleInput.value;
    submitObject["description"] = descriptionInput.value;
    submitObject["contact_email"] = contactEmail.value;
    submitObject["authors"] = authorArray;
    submitObject["metadata"] = metadataObject;
    submitObject["LinkedFiles"] = linkedFilesObject;
    //TODO Leave the below commented until changes in "match-backend-indexes" branch are done
    //submitObject["path"] = linkedPathField.value;
    //submitObject["inputs"] = linkedInputObjectArray;


}
