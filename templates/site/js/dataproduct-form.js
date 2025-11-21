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

            for (let i = 1; i < 3; i++ ){
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

            for (let i = 1; i < 4; i++ ){
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

    uploadInput.id = divID + "_file";
    uploadInput.setAttribute("name", divID + "_file");
    uploadInput.setAttribute("required", "required");
    uploadInput.classList.add("textarea-geojson", "margin-input-field")
    uploadInput.addEventListener("input", () => {
        validateUploadGeoJSON(divID + "_file");
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
    label1.classList.add("subtitle-1", "margin-input-label", "required-asterisk");
    label1.innerHTML = "Latitude (Required)";
    label1.setAttribute("for", "lat_" + indexNum);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("required", "required");
    input1.setAttribute("type", "number");
    input1.setAttribute("min", "-90");
    input1.setAttribute("max", "90");
    input1.setAttribute("step", "any");
    input1.setAttribute("id", geometryType + "_lat_" + indexNum);
    input1.setAttribute("name", geometryType + "_lat_" + indexNum);

    var longitudeContainer = document.createElement("div");
    longitudeContainer.classList.add("longitude-child");

    var label2 = document.createElement("label");
    label2.classList.add("subtitle-1", "margin-input-label", "required-asterisk");
    label2.id = "label_" + geometryType + "_lon_" + indexNum;
    label2.innerHTML = "Longitude (Required)";
    label2.setAttribute("for", geometryType + "_lon_" + indexNum);


    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("required", "required");
    input2.setAttribute("type", "number");
    input2.setAttribute("min", "-180");
    input2.setAttribute("max", "180");
    input2.setAttribute("step", "any");
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
        for (let i = 1; i < pointInputArray.length; i++){
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
    label1.classList.add("subtitle-1", "margin-input-label", "required-asterisk");
    label1.innerText = "Latitude (Required)";
    label1.id = "label_" + geometryType + "_lat_" + autindex;
    label1.setAttribute("for", geometryType + "_lat_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", geometryType + "_lat_" + autindex);
    input1.setAttribute("name", geometryType + "_lat_[]"); // Make it an array input
    input1.setAttribute("required", "required");

    var label2 = document.createElement("label");
    label2.classList.add("subtitle-1", "margin-input-label", "required-asterisk");
    label2.innerText = "Longitude (Required)";
    label2.id = "label_" + geometryType + "_lon_" + autindex;
    label2.setAttribute("for", geometryType + "_lon_" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", geometryType + "_lon_" + autindex);
    input2.setAttribute("name", geometryType + "_lon_[]"); // Changed name to array input for last name
    input2.setAttribute("required", "required");

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
            if (document.getElementById("geo_geojson_content").querySelector(".upload-geojson-child") != null) {
                swapDiv('geo_geojson');
            } else {
                swapDiv('geo_geojson');
                initializeUploadDiv('geo_geojson');
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
    label2.classList.add("subtitle-1", "margin-input-label", "required-asterisk");
    label2.id = "label_lname_" + autindex;
    label2.setAttribute("for", "lname_" + autindex);



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
    var otherDiv = document.getElementById(divElementID);
    var otherArray = document.querySelectorAll("[id^=other_key]");
    autindex = updateIndex(otherArray);

    var div_box = document.createElement("div");
    div_box.id = "other_" + autindex;

    inputRow.classList.add("other-additional-child");

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

    div_box.appendChild(inputRow);

    otherDiv.appendChild(div_box);
}

function initializeModelDropdown(dropdownID){

    var dropdown = document.getElementById(dropdownID);
    var anchorTags = dropdown.querySelectorAll("li > a");

    anchorTags.forEach((tag) => {
        var selectedIndex = tag.getAttribute("selected_index");
        var selectedValue = tag.getAttribute("selected_value");

        tag.addEventListener("click", function (){


            showHideModelInput(parseInt(selectedIndex), selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1), 1);
        })
    })
}


function addModel(divElementID) {

    var autindex;
    var modelBoxDiv = document.getElementById(divElementID);
    var inputRow = document.createElement("div");
    var divInput1 = document.createElement("div");
    var divInput2 = document.createElement("div");
    var divInput3 = document.createElement("div");
    var dropdownDiv = document.createElement("div");
    var modelArray = document.querySelectorAll("input[id^=model_href]");

    autindex = updateIndex(modelArray);

    inputRow.id = "model_" + autindex;
    inputRow.classList.add("model-additional-child");
    divInput1.classList.add("model-details");
    divInput2.classList.add("model-details");
    divInput3.classList.add("model-details", "model-input-container");

    var divRemoveModel = document.createElement("div");
    divRemoveModel.id = "metadata_model_container_" + autindex;
    divRemoveModel.classList.add("display-none", "show");

    var divRemoveModelParent = document.createElement("div");
    divRemoveModelParent.classList.add("model-remove-button");

    var label1 = document.createElement("label");
    label1.innerText = "URL";
    label1.classList.add("subtitle-1", "margin-input-label");
    label1.id = "label_model_href_" + autindex;
    label1.setAttribute("for", "model_href_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "model_href_" + autindex);
    input1.setAttribute("name", "model_href_[]"); // Make it an array input

    var label2 = document.createElement("label");
    label2.innerText = "Designate this as Input, Model, or Other";
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.id = "label_model_dropdown_" + autindex;
    label2.setAttribute("for", "model_dropdown_" + autindex);

    var modelDropdownTemplate = document.getElementById("modelDropdownTemplate");
    const cloneDropdown = modelDropdownTemplate.content.cloneNode(true);

    var templateDropdownContainer = cloneDropdown.getElementById("model_dropdown_container_template_id");
    templateDropdownContainer.id = "metadataModelDropdownContainer" + autindex;

    var templateDropdown = cloneDropdown.getElementById("model_dropdown_template_id");
    templateDropdown.id = "model_dropdown_" + autindex;

    var templateDropdownUL = cloneDropdown.getElementById("model_dropdown_default_UL_template_id");
    templateDropdownUL.id = "metadata_model_dropdown_UL_" + autindex;

    var templateDropdownULItemAnchorLinks = templateDropdownUL.querySelectorAll("li > a");

    var templateDropdownButton = cloneDropdown.getElementById("model_dropdown_button_template_id");
    templateDropdownButton.id = "dropdownListModelButton_" + autindex;

    var templateDropdownButtonText = cloneDropdown.getElementById("model_dropdown_button_text_template_id");
    templateDropdownButtonText.id = "dropdownListModelButtonText_" + autindex;

    templateDropdownULItemAnchorLinks.forEach((anchorTag) => {
        var anchorSelectedIndex = anchorTag.getAttribute("selected_index");
        var anchorSelectedValue = anchorTag.getAttribute("selected_value");

        var anchorID = "model" + anchorSelectedValue.charAt(0).toUpperCase() + anchorSelectedValue.slice(1) + "_" + autindex;
        anchorTag.id = anchorID;

        anchorTag.addEventListener('click', function () {
            replaceListItem("dropdownListModelButtonText_" + autindex, anchorID);
        });

        anchorTag.addEventListener('click', function () {
            showHideModelInput(parseInt(anchorSelectedIndex), anchorSelectedValue, autindex);
        })
    })

    var label3 = document.createElement("label");
    label3.classList.add("subtitle-1", "margin-input-label", "display-none");
    label3.id = "label_model_other_" + autindex;
    label3.setAttribute("for", "model_other_" + autindex);

    var input3 = document.createElement("input");
    input3.classList.add("input-textbox", "margin-input-field", "display-none");
    input3.setAttribute("type", "text");
    input3.setAttribute("id", "model_other_" + autindex);
    input3.setAttribute("name", "model_other_[]"); // Make it an array input

    var removeModelButton = document.createElement("input");
    removeModelButton.setAttribute("type", "button");
    removeModelButton.value = "Remove Model";
    removeModelButton.classList.add("button-med", "d-button-text");
    removeModelButton.addEventListener("click", function () {
        removeEntry("model_box", "model_" + autindex);
    });

    divInput1.appendChild(label1);
    divInput1.appendChild(input1);

    divInput2.appendChild(label2);
    dropdownDiv.appendChild(cloneDropdown);
    divInput2.appendChild(dropdownDiv);

    divInput3.appendChild(label3);
    divInput3.appendChild(input3);

    divRemoveModelParent.appendChild(removeModelButton);
    divRemoveModel.appendChild(divRemoveModelParent);


    inputRow.appendChild(divInput1);
    inputRow.appendChild(divInput2);
    inputRow.appendChild(divInput3);
    inputRow.appendChild(divRemoveModel);

    modelBoxDiv.appendChild(inputRow);
}


function removeEntry(parentElementID, elementID) {
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

            latLabel.innerHTML = latLabel.innerText + " (Required)";
            latLabel.classList.add("required-asterisk");

            lonLabel.innerHTML = lonLabel.innerText + " (Required)";
            lonLabel.classList.add("required-asterisk");
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

function showHideModelInput(dropdownItemIndex, dropdownItemName, dropdownIndex){

    var modelInputTextField = document.getElementById("model_other_" + dropdownIndex);
    var modelInputLabel = document.getElementById("label_model_other_" + dropdownIndex);
    var dropdownListModelButtonText = document.getElementById("dropdownListModelButtonText_" + dropdownIndex);


    dropdownListModelButtonText.setAttribute("selected_index", dropdownItemIndex);

    switch (dropdownItemIndex){
        case 1:
            if(modelInputTextField.classList.contains("show")){
                modelInputTextField.classList.remove("show");
                modelInputLabel.classList.remove("show");
            }

            break;

        case 2:
        case 3:
            modelInputLabel.innerText = "Input a value for " + dropdownItemName.charAt(0).toUpperCase() + dropdownItemName.slice(1);
            if(!modelInputTextField.classList.contains("show")){
                modelInputTextField.classList.add("show");
                modelInputLabel.classList.add("show");
            }

            break;
    }
}

//Add selected timezone to the selected start date time and end date time without converting the date time value
//Returns date time in ISO format with the selected timezone offset
function addTimezoneToSelectedTime(timezone){
    var startDateElement = document.getElementById("metadata_start_date");
    var endDateElement = document.getElementById("metadata_end_date");
    var startDate = startDateElement._flatpickr.selectedDates[0];
    var endDate = endDateElement._flatpickr.selectedDates[0];

    var dateFormatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "longOffset",
        timeZone: timezone,
    });

    //Converts the date-time to ISO string with timezone at UTC while preserving the time value.
    var startDateConvertedUTCPreserveTime = new Date(startDate - startDate.getTimezoneOffset() * 60000).toISOString();
    var startDateConvertedUTCPreserveTimeArray = startDateConvertedUTCPreserveTime.split("Z");

    var endDateConvertedUTCPreserveTime = new Date(endDate - endDate.getTimezoneOffset() * 60000).toISOString();
    var endDateConvertedUTCPreserveTimeArray = endDateConvertedUTCPreserveTime.split("Z");

    var formattedStartDate = dateFormatter.format(startDate);
    var formattedEndDate = dateFormatter.format(endDate);

    var startDateSplitTimezoneArray = formattedStartDate.split("GMT");
    var startDateTimezoneOffset = startDateSplitTimezoneArray[1];
    var serverStartDate = startDateConvertedUTCPreserveTimeArray[0] + startDateTimezoneOffset;

    var endDateSplitTimezoneArray = formattedEndDate.split("GMT");
    var endDateTimezoneOffset = endDateSplitTimezoneArray[1];
    var serverEndDate = endDateConvertedUTCPreserveTimeArray[0] + endDateTimezoneOffset;

    var timezoneArray = [serverStartDate, serverEndDate];

    return timezoneArray;
}

function generateTimezoneWithOffset(){
    const timezonesWithOffsetsList = Intl.supportedValuesOf('timeZone').map(timeZone => {
        // Create a date object to get the offset for a specific point in time
        const now = new Date();

        // Create a DateTimeFormat object for the specific timezone and locale
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timeZone,
            timeZoneName: 'longOffset'
        });

        // Extract the offset from the formatted parts
        const parts = formatter.formatToParts(now);
        const offsetPart = parts.find(part => part.type === 'timeZoneName');

        if(offsetPart){
            offset = offsetPart.value
        }

        var timezoneOffsets = {
            id: timeZone,
            offset: offset
        }

        return timezoneOffsets;
    });

    return timezonesWithOffsetsList;
}

function calendarDatesEqual(checkboxDateEqualID, startDateID, endDateID){
    var checkboxDateEqualElement = document.getElementById(checkboxDateEqualID);
    var startDateElement = document.getElementById(startDateID);
    var endDateElement = document.getElementById(endDateID);

    if(checkboxDateEqualElement.checked){
        startDateElement.removeAttribute("disabled");
        endDateElement.setAttribute("disabled", "disabled");

        if(startDateElement.value != ""){
            endDateElement._flatpickr.setDate(startDateElement._flatpickr.selectedDates[0]);
        }
    }
    else{
        endDateElement.value = "";
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

    if(uploadGeoJSONInput && uploadGeoJSONInput.value != "") {
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

function disableButton(buttonID) {
    var button = document.getElementById(buttonID);
    button.classList.add("disabled");
    button.disabled = true;
}

/*Submit functions*/
async function submitForm(){
    checkRequired();

    // Example of how polygon coordinates should be formatted
    //  [ [ 19.732387792295356,17.362269487080525],[ 15.018600022717294, 11.450658457798042],[29.998879431116166, 6.631460284225298] ]
    var submitObject = {};
    var geojsonTemplate =     { "coordinates": [], "type": ""}
    var titleInput = document.getElementById("title");
    var descriptionInput = document.getElementById("desc");
    var descriptionInputValue;
    var contactEmail = document.getElementById("contact_email");
    var authorDivs = document.querySelectorAll("div[id^=author_]");
    var authorArray = [];
    var geometryType;
    var visibleGeometry;
    var coordinateArray = [];
    var geometryGeoJSONBBox;
    //var dateMetadataFields = document.querySelectorAll("input[id*=_date]");
    var timezoneDropdownLabel = document.getElementById("dropdownListTemporalStartButtonText");
    var timezone = timezoneDropdownLabel.getAttribute("selected_index");
    var temporalExtentArray = [];
    var textareaMetadataVariables = document.getElementById("metadata_variables");
    var textareaMetadataArray = [];
    var linkedPathField = document.getElementById("linked_path");
    var linkedAdditionalFiles = document.getElementById("linked_link");
    var otherMetadataInitialKey = document.getElementById("other_key_1");
    var otherMetadataInitialValue = document.getElementById("other_value_1");
    var otherMetadataInputFields = document.querySelectorAll("input[id^=other_key_]");
    var metadataModelDropdownButtonText = document.querySelectorAll("h6[id^=dropdownListModelButtonText]");
    var metadataModelObjectArray = [];
    var otherMetadataObject = {};
    var geometryDropdownButtonTitle = document.getElementById("dropdownListDefaultButtonText");
    var geometrySelection = parseInt(geometryDropdownButtonTitle.getAttribute("selected_index"));
    var geometryDropdownContent;

    if(descriptionInput.value.trim() == ""){
        descriptionInputValue = null;
    }
    else{
        descriptionInputValue = descriptionInput.value;
    }

    /*Adds Geometry coordinate input to geometryTemplate object*/
    /*If no coordinates are entered get the input from the geojson textarea*/
    /*If a geometry with no coordinate inputs is selected (eg. upload geojson) only get input from the geojson textarea*/
    switch(geometrySelection){
        case 1:
            var geometrySelectionID = geometryDropdownButtonTitle.getAttribute("selected_id");
            var geometrySelectionIDArray = geometrySelectionID.split("geometry");

            visibleGeometry = geometrySelectionIDArray[1];
            geometryType = geometrySelectionIDArray[1].toLowerCase();

            geometryDropdownContent = document.getElementById("geo_point_content");
            var pointLatInput = document.getElementById('point_lat_0');
            var pointLonInput = document.getElementById('point_lon_0');

            coordinateArray.push(pointLonInput.value);
            coordinateArray.push(pointLatInput.value);

            break;

        case 2:
        case 3:
        case 4:
            var geometrySelectionID = geometryDropdownButtonTitle.getAttribute("selected_id");
            var geometrySelectionIDArray = geometrySelectionID.split("geometry");
            visibleGeometry = geometrySelectionIDArray[1];
            geometryType = geometrySelectionIDArray[1].toLowerCase();

            geometryDropdownContent = document.getElementById("geo_" + geometryType + "_content");

            var geometryLatPrefix = geometryType + "_lat_";
            var geometryLatInputFields = geometryDropdownContent.querySelectorAll(`input[id^=${geometryLatPrefix}]`);

            for (input of geometryLatInputFields) {
                var coordinate = [];
                var inputIDArray = input.id.split("_");

                if (input.value != "") {
                    var longitudeID = geometryType + "_lon_" + inputIDArray[2];
                    var longitudeInput = document.getElementById(longitudeID);

                    coordinate[0] = parseFloat(longitudeInput.value);
                    coordinate[1] = parseFloat(input.value);

                    coordinateArray.push(coordinate);
                }
            }

            /*If Polygon is selected, add the first coordinate into the coordinate array to complete the polygon*/
            if(geometrySelection == 4){
                var firstPolygonLat = coordinateArray[0][1];
                var firstPolygonLon = coordinateArray[0][0];
                var lastPolygonLat = coordinateArray[coordinateArray.length -1][1];
                var lastPolygonLon = coordinateArray[coordinateArray.length -1][0];

                if(firstPolygonLat!= lastPolygonLat && firstPolygonLon != lastPolygonLon){
                    coordinateArray.push(coordinateArray[0]);
                }
            }

            break;

        case 5:
            var geometrySelectionID = geometryDropdownButtonTitle.getAttribute("selected_id");
            var geometrySelectionIDArray = geometrySelectionID.split("geometry");
            visibleGeometry = geometrySelectionIDArray[1];
            geometryType = geometrySelectionIDArray[1].toLowerCase();

            geometryGeoJSONBBox = validateUploadGeoJSON("geo_" + geometryType + "_file");

            break;

        case 6:
            geometryGeoJSONBBox = null;

            break;
    }





    /*Add Author input to authorObject*/
    for(author of authorDivs){
        var authorObject = {};
        var authorIDArray = author.id.split("_");

        if(isNaN(Number(authorIDArray[1])) == false ){
            var authorFirstName = document.getElementById("fname_" + authorIDArray[1]);
            var authorFirstNameValue;
            var authorLastName = document.getElementById("lname_" + authorIDArray[1]);
            var authorEmail = document.getElementById("email_" + authorIDArray[1]);
            var authorEmailValue;

            if(authorFirstName.value.trim() == ""){
                authorFirstNameValue = null;
            }else{
                authorFirstNameValue = authorFirstName.value;
            }

            if(authorEmail.value.trim() == ""){
                authorEmailValue = null;
            }else{
                authorEmailValue = authorEmail.value;
            }

            authorObject["first_name"] = authorFirstNameValue;
            authorObject["last_name"] = authorLastName.value.trim();
            authorObject["email"] = authorEmailValue;

            authorArray.push(authorObject);
        }
    }




    /*Add Metadata Variables to submitObject*/

    if(textareaMetadataVariables.value.trim() != ""){
        if(textareaMetadataVariables.value.indexOf("\n") > -1){
            for(metadataVariable of textareaMetadataVariables.value.split("\n"))
            {
                if(metadataVariable != ""){
                    textareaMetadataArray.push(metadataVariable.trim());
                }
            }
        }
        else{
            textareaMetadataArray.push(textareaMetadataVariables.value.trim())
        }
        submitObject["variables"] = textareaMetadataArray;
    }
    else{
        submitObject["variables"] = [];
    }

    /*Add Metadata Models input to submitObject*/
    for(dropdownButton of metadataModelDropdownButtonText){
        var selectedModelIndex;
        var selectedModelValue = dropdownButton.innerText.toLowerCase();
        var metadataModelObject = {"rel": "", "href":"",  "title":""};
        var dropdownButtonIDArray = dropdownButton.id.split("_");
        var modelIndex = dropdownButtonIDArray[1];
        var metadataModelHREF = document.getElementById("model_href_" + modelIndex);
        var metadataModelOtherInput = document.getElementById("model_other_" + modelIndex);

        metadataModelObject["rel"] = selectedModelValue;


        if(dropdownButton.getAttribute("selected_index") != null){
            selectedModelIndex = parseInt(dropdownButton.getAttribute("selected_index"));

            if(metadataModelHREF.value.trim() == ""){

                metadataModelHREF.setCustomValidity("Cannot be empty if dropdown item is selected");

                if(!metadataModelHREF.classList.contains("input-invalid")){
                    metadataModelHREF.classList.toggle("input-invalid");
                }

            }
            else{

                metadataModelHREF.setCustomValidity("");

                if(metadataModelHREF.classList.contains("input-invalid")){
                    metadataModelHREF.classList.toggle("input-invalid");
                }

                metadataModelObject["href"] = metadataModelHREF.value;
            }

            switch(selectedModelIndex){
                case 2:
                    if(!metadataModelOtherInput.value.trim() == "") {

                        metadataModelOtherInput.setCustomValidity("");

                        if(metadataModelOtherInput.classList.contains("input-invalid")){
                            metadataModelOtherInput.classList.toggle("input-invalid");
                        }

                        metadataModelObject["title"] = metadataModelOtherInput.value;
                    }
                    else{

                        metadataModelOtherInput.setCustomValidity("Cannot be empty if Model or Other is chosen");

                        if(!metadataModelOtherInput.classList.contains("input-invalid")){
                            metadataModelOtherInput.classList.toggle("input-invalid");
                        }
                    }

                    break;

                case 3:
                    if(!metadataModelOtherInput.value.trim() == "") {

                        metadataModelOtherInput.setCustomValidity("");

                        if(metadataModelOtherInput.classList.contains("input-invalid")){
                            metadataModelOtherInput.classList.toggle("input-invalid");
                        }

                        metadataModelObject["rel"] = metadataModelOtherInput.value;
                    }
                    else{

                        metadataModelOtherInput.setCustomValidity("Cannot be empty if Model or Other is chosen");

                        if(!metadataModelOtherInput.classList.contains("input-invalid")){
                            metadataModelOtherInput.classList.toggle("input-invalid");
                        }
                    }

                    break;
            }
            metadataModelObjectArray.push(metadataModelObject)
        }
    }




    /*If key-value input in Other section, add it to metadataOtherRowObject, and then add the object to the otherMetadataObject*/
    if(otherMetadataInputFields.length > 0 && otherMetadataInitialKey.value.trim() != "" || otherMetadataInputFields.length > 0 && otherMetadataInitialValue.value.trim() != ""){
        for (otherInput of otherMetadataInputFields) {
            var otherInputIDArray = otherInput.id.split("_");
            geometryType = otherInputIDArray[0];
            var currentOtherIndex = otherInputIDArray[2];
            var otherValueID = geometryType + "_value_" + currentOtherIndex;
            var otherValueInput = document.getElementById(otherValueID);

            if (otherInput.value.trim() != "" && otherValueInput.value.trim() != "") {

                otherInput.setCustomValidity("");
                otherValueInput.setCustomValidity("");

                otherMetadataObject[otherInput.value] = otherValueInput.value.trim() ;

                if(otherInput.classList.contains("input-invalid")){
                    otherInput.classList.toggle("input-invalid");
                }

                if(otherValueInput.classList.contains("input-invalid")){
                    otherValueInput.classList.toggle("input-invalid");
                }
            }
            else{
                otherInput.setCustomValidity("Key cannot be empty if there is a value");
                otherValueInput.setCustomValidity("Value cannot be empty if there is a key");

                if(!otherInput.classList.contains("input-invalid")){
                    otherInput.classList.toggle("input-invalid");
                }

                if(!otherValueInput.classList.contains("input-invalid")){
                    otherValueInput.classList.toggle("input-invalid");
                }

            }

            if (otherInput.value.trim() != "" && otherValueInput.value.trim() == "") {

                otherValueInput.setCustomValidity("Value cannot be empty if there is a key");

                otherValueInput.classList.add("input-invalid");

                if(otherInput.classList.contains("input-invalid")){
                    otherInput.classList.toggle("input-invalid");
                }
            }

            if(otherInput.value.trim() == "" && otherValueInput.value.trim() != ""){

                otherInput.setCustomValidity("Key cannot be empty if there is a value");

                otherInput.classList.add("input-invalid");

                if(otherValueInput.classList.contains("input-invalid")){
                    otherValueInput.classList.toggle("input-invalid");
                }
            }
        }
    }
    else{
        if(otherMetadataInitialKey.classList.contains("input-invalid")){
            otherMetadataInitialKey.classList.toggle("input-invalid");
        }

        if(otherMetadataInitialValue.classList.contains("input-invalid")){
            otherMetadataInitialValue.classList.toggle("input-invalid");
        }
    }



    /*Create metadata_other entry and add Metadata Other input to submitObject if user has input key-value*/
    if(Object.keys(otherMetadataObject).length > 0){
        submitObject["extra_properties"] = otherMetadataObject;
    }
    else{
        submitObject["extra_properties"] = {};
    }


    /*Add Linked Additional Files input to submitObject*/
    if(linkedAdditionalFiles.value.trim() != ""){
        var linkedAdditionalFileInputArray = [];
        if(linkedAdditionalFiles.value.indexOf("\n") > -1){
            for(additionalFileEntry of linkedAdditionalFiles.value.split("\n")){
                if(additionalFileEntry != ""){
                    linkedAdditionalFileInputArray.push(additionalFileEntry.trim());
                }
            }
            submitObject["additional_paths"] = linkedAdditionalFileInputArray;
        }
        else{
            linkedAdditionalFileInputArray.push(linkedAdditionalFiles.value.trim());
            submitObject["additional_paths"] = linkedAdditionalFileInputArray;
        }
    }
    else{
        submitObject["additional_paths"] = [];
    }


    /*Add items to submit object*/

    /*Add Geometry input to submit object*/
    /*If input was coordinates, add the coordinate array and the geometry type */
    /*If input was a pasted geojson, add the geojson parsed as a json*/
    if(coordinateArray.length > 0){
        if(geometrySelection == 4){
            geojsonTemplate.coordinates.push(coordinateArray);
            geojsonTemplate.type = visibleGeometry;
            submitObject["geometry"] = geojsonTemplate;
        }else{
            geojsonTemplate.coordinates = coordinateArray;
            geojsonTemplate.type = visibleGeometry;
            submitObject["geometry"] = geojsonTemplate;
        }
    }
    else{
        submitObject["geometry"] = geometryGeoJSONBBox;
    }

    /*Add Metadata date input to submitObject*/

    submitObject["temporal"] = [];
    submitObject["timezone"] = timezone;
    temporalExtentArray = addTimezoneToSelectedTime(timezone);

    for(dateMetadata of temporalExtentArray){
        //var dateUTC = dateMetadata._flatpickr.selectedDates[0];
        //var dateISOString = dateUTC.toISOString();
        submitObject["temporal"].push(dateMetadata);
    }
    console.log()

    //submitObject["user"] = (await  window.session_info).user.user_name;
    submitObject["user"] = "testuser";
    submitObject["title"] = titleInput.value.trim();
    submitObject["description"] = descriptionInputValue;
    submitObject["authors"] = authorArray;
    submitObject["links"] = metadataModelObjectArray;
    submitObject["path"] = linkedPathField.value.trim();
    submitObject["contact"] = contactEmail.value.trim();

    var queryStringParams = new URLSearchParams(window.location.search);
    var submitMethod = "";
    var marbleAPIURL = "";
    var redirectURL = window.location.origin  + window.location.pathname + "?id=";
    var submitErrorElement = document.getElementById("submitError");
    var submitSuccess;

    if(queryStringParams.get("id")){
        submitMethod = "PATCH";
        marbleAPIURL = "{{ configs['marble_api_path'] }}/v1/users/"+ submitObject["user"] +"/data-requests/" + queryStringParams.get("id");
    }
    else{
        submitMethod = "POST";
        marbleAPIURL = "{{ configs['marble_api_path'] }}/v1/users/"+ submitObject["user"] +"/data-requests";
    }

    try {
        const response = await fetch(marbleAPIURL, {
            method: submitMethod,
            headers: {
                "Accept": "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(submitObject)
        });

        const result = await response.json();

        if (response.status == 200) {
            var responseFormID = "";
            submitSuccess = true;

            if(result.id){
                responseFormID = result.id;
                disableButton("submit");
                window.location.href = redirectURL + responseFormID + "&submit=" + submitSuccess;
            }
        }else{
            submitErrorElement.classList.remove("submit-success");
            submitErrorElement.classList.add("submit-error");

            if(response.status == 422)
            {
                if("detail" in result) {
                    var inputErrorStringList = "";
                    var responseDetails = result.detail;
                    var detailSet = new Set();

                    for(detail of responseDetails){
                        if(detail.loc[0] == "body"){
                            detailSet.add(detail.loc[1]);
                        }
                    }

                    for(inputErrorType of detailSet){
                        inputErrorStringList = inputErrorStringList + inputErrorType + "\n";
                    }

                    submitErrorElement.innerText = "There are errors in the following inputs:" + "\n" + inputErrorStringList;

                    console.error(result.detail);
                }else{
                    submitErrorElement.innerText = "Error submitting form";
                }
            }
            else if(response.status == 404){
                submitErrorElement.innerText = result.detail;
            }
            else{
                submitErrorElement.innerText = "Error submitting form";

                if("detail" in result) {
                    console.error(result.detail);
                }
            }
            throw new Error(`Response status: ${response.status}`);
        }

    } catch (error) {
        console.error(error.message);
    }

    console.log("submitObject")
    console.log(submitObject)

}
