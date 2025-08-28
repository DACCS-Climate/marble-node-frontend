/*Geometry Functions*/
function initializePointInputDiv(geometryType, divID) {
    var geoBboxDiv = document.getElementById(divID);
    var geoContentDiv;
    var geoAddButtonDiv;
    var addButton;


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

    //Only create the add button for the following geometries
    switch(divID){
        case "geo_multipoint":
        case "geo_linestring":
        case "geo_polygon":
            geoAddButtonDiv = document.createElement("div");
            geoAddButtonDiv.id = divID + "_add_button_div";

            addButton = document.createElement("input");
            addButton.id = divID + "_add_button";
            addButton.classList.add("button-med", "d-button-text", "margin-button-add");
            addButton.setAttribute("type", "button");
            addButton.setAttribute("value", "Add Point");
            addButton.addEventListener("click", function(){
                addPoint(geometryType, divID + "_content");
            });

            geoAddButtonDiv.appendChild(addButton);

            break;

    }

    switch(divID){
        case "geo_point":
            var pointInputRow = createInputCoordinatesRow("point",1);
            geoContentDiv.appendChild(pointInputRow);

            break;

        case "geo_multipoint":
            var multipointInputRow = createInputCoordinatesRow("multipoint", 1);
            geoContentDiv.appendChild(multipointInputRow);

            if(document.getElementById("geo_" + geometryType + "_add_button_div") == null &&
                document.getElementById("geo_" + geometryType + "_geojson_upload_div") == null) {
                geoBboxDiv.appendChild(geoAddButtonDiv);
                //geoBboxDiv.appendChild(geojsonUploadDiv);
            }

            break;

        case "geo_linestring":

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

    uploadDiv.id = "upload_" + divID;
    uploadDiv.classList.add("upload-geojson-child");

    uploadTitle.innerText = "Paste GeoJSON";

    uploadInput.id = "my_" + divID + "_file";
    uploadInput.setAttribute("name", "my_" + divID + "_file");
    uploadInput.classList.add("textarea-geojson", "margin-input-field")

    uploadDiv.appendChild(uploadTitle);
    uploadDiv.appendChild(uploadInput);

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
    label2.innerHTML = "Latitude (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
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


function swapDiv(divID) {
    var geoBBoxDiv = document.getElementById("geo_bbox");
    var currentDiv = document.getElementById(divID);
    var geoNodeList = geoBBoxDiv.querySelectorAll("div#geo_bbox > [id^=geo_]");

    for(parentDiv of geoNodeList){
        if(parentDiv.classList.contains("show")){
            parentDiv.classList.remove("show");
            parentDiv.classList.remove("multipoint-parent");
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
                swapDiv('geo_point');
            } else {
                swapDiv('geo_point');
                initializePointInputDiv('point', 'geo_point');
            }

            break;

        case 2:
            // For MultiPoint
            if (document.getElementById("geo_multipoint_content").querySelector(".multipoint-child") != null
                || document.getElementById("geo_multipoint_content").querySelector(".multipoint-additional-child") != null) {
                swapDiv('geo_multipoint');
            } else {
                swapDiv('geo_multipoint');
                initializePointInputDiv('multipoint', 'geo_multipoint');
            }

            break;

        case 3:
            // For LineString
            if (document.getElementById("geo_linestring_content").querySelector(".multipoint-child") != null
                || document.getElementById("geo_linestring_content").querySelector(".multipoint-additional-child") != null) {
                swapDiv('geo_linestring');
            } else {
                swapDiv('geo_linestring');
                initializePointInputDiv('linestring', 'geo_linestring');
            }

            break;

        case 4:
            // For Polygon
            if (document.getElementById("geo_polygon_content").querySelector(".multipoint-child") != null
                || document.getElementById("geo_polygon_content").querySelector(".multipoint-additional-child") != null) {
                swapDiv('geo_polygon');
            } else {
                swapDiv('geo_polygon');
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

        case 8:
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
    label1.innerText = "First Name:";
    label1.classList.add("subtitle-1", "margin-input-label");
    label1.id = "label_fname_" + autindex;
    label1.setAttribute("for", "fname_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "fname_" + autindex);
    input1.setAttribute("name", "fname_[]"); // Make it an array input

    var label2 = document.createElement("label");
    label2.innerText = "Last Name:";
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.id = "label_lname_" + autindex;
    label2.setAttribute("for", "lname_" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "lname_" + autindex);
    input2.setAttribute("name", "lname_[]"); // Changed name to array input for last name

    var label3 = document.createElement("label");
    label3.innerText = "Email:";
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

function removeEntry(parentElementID, elementID){
    var inputArray;
    var currentInputIndex;
    var firstRemoveButton;
    var removeButtonPrefix;
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

            if(firstNameInput.getAttribute("required") == null){
                var lastNameInput = document.getElementById("lname_" + currentInputIndex);
                var emailInput = document.getElementById("email_" + currentInputIndex);
                var firstNameLabel = document.getElementById("label_fname_" + currentInputIndex);
                var lastNameLabel = document.getElementById("label_lname_" + currentInputIndex);
                var emailLabel = document.getElementById("label_email_" + currentInputIndex);


                firstNameInput.setAttribute("required", "required");
                lastNameInput.setAttribute("required", "required");
                emailInput.setAttribute("required", "required");

                var firstNameLabelArray = firstNameLabel.innerText.split(":");
                var lastNameLabelArray = lastNameLabel.innerText.split(":");
                var emailLabelArray = emailLabel.innerText.split(":");

                firstNameLabel.innerHTML = firstNameLabelArray[0] + " (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
                lastNameLabel.innerHTML = lastNameLabelArray[0] + " (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
                emailLabel.innerHTML = emailLabelArray[0] + " (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
            }

        }
    }
    else{
        var coordinateIDPrefix = geometryType + "_lat_";
        var labelCoordinateIDPrefix = "label_" + geometryType;

        inputArray = document.querySelectorAll(`[id^=${coordinateIDPrefix}]`);
        switch (inputArray.length){
            case 1:
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

                if(inputArrayItem.getAttribute("required") == null){
                    inputArrayItem.setAttribute("required", "required");

                    var latLabel = document.getElementById(labelCoordinateIDPrefix + "_lat_" +  currentInputIndex);
                    var lonLabel = document.getElementById(labelCoordinateIDPrefix + "_lon_" +  currentInputIndex);

                    var latLabelArray = latLabel.innerText.split(":");
                    latLabel.innerHTML = latLabelArray[0] + " (Required) <span class='subtitle-1 required-asterisk'>*</span>:";

                    var lonLabelArray = lonLabel.innerText.split(":");
                    lonLabel.innerHTML = lonLabelArray[0] + " (Required) <span class='subtitle-1 required-asterisk'>*</span>:";
                }

            case 2:
                if(geometryType == "linestring"){
                    removeButtonPrefix = geometryType + "_remove_container_"
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
            case 3:
                if(geometryType == "polygon"){
                    removeButtonPrefix = geometryType + "_remove_container_"
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


/*Submit functions*/
function submitForm(){
    // Example of how polygon coordinates should be formatted
    //  [ [ 19.732387792295356,17.362269487080525],[ 15.018600022717294, 11.450658457798042],[29.998879431116166, 6.631460284225298] ]
    var submitObject = {};
    var geojsonTemplate =     {
                "type": "FeatureCollection",
                "features": [
                    {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "coordinates": [],
                            "type": ""
                        }
                    }
               ]
            }

    var usernameInput = document.getElementById("username");
    var titleInput = document.getElementById("title");
    var descriptionInput = document.getElementById("desc");
    var geometryInputFields = document.querySelectorAll("input[id*='_lat_']");
    var authorDivs = document.querySelectorAll("div[id^=author_]");
    var authorArray = [];
    var geometryType;
    var visibleGeometry;
    var geometryContainer;
    var coordinateArray = [];
    var geometryGeoJSONBBox;
    var geometryGeoJSONBoundingBoxInput;
    var geometryGeoJSONFileInput = document.querySelectorAll("textarea[id^=my_geo]")
    var dateMetadataFields = document.querySelectorAll("input[id*=_date]")
    var textAreaMetadataFields = document.querySelectorAll("textarea[id^=metadata_]");
    var metadataObject = {};
    var textareaMetadataArray;
    var linkedFilesFields = document.querySelectorAll("textarea[id^=linked_]");
    var linkedFilesObject = {};


    /*Adds Geometry coordinate input to geometryTemplate object*/
    /*If no coordinates are entered get the input from the geojson textarea*/
    /*If a geometry with no coordinate inputs is selected (eg. multi-polygon) only get input from the geojson textarea*/
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
                if(geometryFile.value.indexOf("\n") > -1){
                    geometryGeoJSONBoundingBoxInput = geometryFile.value.replaceAll("\n", "");
                }
                geometryGeoJSONBBox = geometryGeoJSONBoundingBoxInput;
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

    /*Add Metadata Variables and Models input to metadataObject*/
    for (textareaMetadata of textAreaMetadataFields){
        if(textareaMetadata.id.includes("vars") || textareaMetadata.id.includes("models"))
        {
            if(textareaMetadata.value.indexOf("\n") > -1){
                textareaMetadataArray = textareaMetadata.value.split("\n");
            }

            metadataObject[textareaMetadata.id] = textareaMetadataArray;

        }
    }

    /*Add date input to submitObject*/
    for(dateMetadata of dateMetadataFields){
        metadataObject[dateMetadata.id] = dateMetadata.value;
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
        geojsonTemplate.features[0].geometry.coordinates.push(coordinateArray);
        geojsonTemplate.features[0].geometry.type = visibleGeometry;
        submitObject["SubmittedGeometry"] = geojsonTemplate;
    }
    else{
        submitObject["SubmittedGeometry"] = geometryGeoJSONBBox;
    }

    submitObject["username"] = usernameInput.value;
    submitObject["title"] = titleInput.value;
    submitObject["description"] = descriptionInput.value;
    submitObject["authors"] = authorArray;
    submitObject["metadata"] = metadataObject;
    submitObject["LinkedFiles"] = linkedFilesObject;

    console.log("submitObject")
    console.log(submitObject)
}
