/*Geometry Functions*/
function initializePointInputDiv(geometryType, divID) {
    var geoBboxDiv = document.getElementById(divID);
    var geoContentDiv;
    var geoAddButtonDiv;
    var addButton;
    var geojsonUploadDiv;
    var geojsonUploadInput;

    var geogeojsonUploadTitle = document.createElement("h5");
    geogeojsonUploadTitle.innerText = "OR: GeoJSON bounding box";
    geogeojsonUploadTitle.classList.add("margin-unset", "margin-geojson-input-label");



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

    //Only create the geojson upload input field and add button for the following geometries
    switch(divID){
        case "geo_multipoint":
        case "geo_linestring":
        case "geo_polygon":
            geojsonUploadDiv = document.createElement("div");
            geojsonUploadDiv.id = divID + "_geojson_upload_div";

            geojsonUploadInput = document.createElement("textarea");
            geojsonUploadInput.id = divID + "_geojson_file";
            geojsonUploadInput.setAttribute("name", divID + "File");
            geojsonUploadInput.classList.add("input-textbox", "margin-input-field");

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
            geojsonUploadDiv.appendChild(geogeojsonUploadTitle);
            geojsonUploadDiv.appendChild(geojsonUploadInput);

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
                geoBboxDiv.appendChild(geojsonUploadDiv);
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
                geoBboxDiv.appendChild(geojsonUploadDiv);
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
                geoBboxDiv.appendChild(geojsonUploadDiv);
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


    uploadTitle.innerText = "GeoJSON bounding box";

    uploadInput.id = "my_" + divID + "_file";
    uploadInput.setAttribute("name", "my_" + divID + "_file");
    uploadInput.classList.add("input-textbox", "margin-input-field")
    uploadInput.setAttribute("cols", "12");
    uploadInput.setAttribute("rows", "10");

    uploadDiv.appendChild(uploadTitle);
    uploadDiv.appendChild(uploadInput);

    geoContentDiv.appendChild(uploadDiv);
}


function createInputCoordinatesRow(geometryType, indexNum){

    var coordinateInputContainerDiv = document.createElement("div");
    coordinateInputContainerDiv.id = geometryType + "_" + indexNum;
    coordinateInputContainerDiv.classList.add("multipoint-child");

    var latitudeContainer = document.createElement("div");
    latitudeContainer.classList.add("latitude-child");

    var label1 = document.createElement("label");
    label1.classList.add("subtitle-1", "margin-input-label");

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");

    var longitudeContainer = document.createElement("div");
    longitudeContainer.classList.add("longitude-child");

    var label2 = document.createElement("label");
    var input2 = document.createElement("input");
    label2.classList.add("subtitle-1", "margin-input-label");
    input2.classList.add("input-textbox", "margin-input-field");

    label1.innerText = "Latitude (Required):";
    label1.setAttribute("for", "lat_" + indexNum);

    input1.setAttribute("type", "text");
    input1.setAttribute("id",  geometryType + "_lat_" + indexNum);
    input1.setAttribute("name", geometryType + "_lat_" + indexNum);

    label2.innerText = "Longitude (Required):";
    label2.setAttribute("for", geometryType + "_lon_" + indexNum);

    input2.setAttribute("type", "text");
    input2.setAttribute("id", geometryType + "_lon_" + indexNum);
    input2.setAttribute("name", geometryType + "_lon_" + indexNum);

    switch(geometryType){
        case "point":
        case "linestring":
        case "multipoint":
        case "polygon":
            setInputFilter(input1, function(value) {
                return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
            }, "Only digits and '.' are allowed");

            setInputFilter(input2, function(value) {
                return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
            }, "Only digits and '.' are allowed");
    }

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
    removePointButton.addEventListener("click", function() {
        removeEntry("geo_" + geometryType + "_content" , geometryType + "_" + indexNum);
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


function swapDiv(divID){
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
    label1.setAttribute("for", geometryType + "_lat_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", geometryType + "_lat_" + autindex);
    input1.setAttribute("name", geometryType + "_lat_[]"); // Make it an array input

    setInputFilter(input1, function(value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
    }, "Only digits and '.' are allowed");

    var label2 = document.createElement("label");
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.innerText = "Longitude:";
    label2.setAttribute("for", geometryType + "_lon_" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", geometryType + "_lon_" + autindex);
    input2.setAttribute("name", geometryType + "_lon_[]"); // Changed name to array input for last name

    setInputFilter(input2, function(value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
    }, "Only digits and '.' are allowed");

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

        case 5:
            // For Polygon
            if (document.getElementById("geo_polygon_content").querySelector(".multipoint-child") != null
                || document.getElementById("geo_polygon_content").querySelector(".multipoint-additional-child") != null) {
                swapDiv('geo_polygon');
            } else {
                swapDiv('geo_polygon');
                initializePointInputDiv('polygon', 'geo_polygon');
            }

            break;

        case 4:
            // For MultiLineString
            if (document.getElementById("geo_multi_linestring_content").querySelector(".upload-geojson-child") != null) {
                swapDiv('geo_multi_linestring');
            } else {
                swapDiv('geo_multi_linestring');
                initializeUploadDiv('geo_multi_linestring');
            }

            break;

        case 6:
            // For MultiPolygon,
            if (document.getElementById("geo_multi_polygon_content").querySelector(".upload-geojson-child") != null) {
                swapDiv('geo_multi_polygon');
            } else {
                swapDiv('geo_multi_polygon');
                initializeUploadDiv('geo_multi_polygon');
            }

            break;

        case 7:
            // For GeometryCollection
            if (document.getElementById("geo_geometry_collection_content").querySelector(".upload-geojson-child") != null) {
                swapDiv('geo_geometry_collection');
            } else {
                swapDiv('geo_geometry_collection');
                initializeUploadDiv('geo_geometry_collection');
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

/*Geometry Input Validation Functions */

/*Set filter on input fields*/
function setInputFilter(textbox, inputFilter, errMsg) {
  [ "input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout" ].forEach(function(event) {
    textbox.addEventListener(event, function(e) {
      if (inputFilter(this.value)) {
        // Accepted value.
        if ([ "keydown", "mousedown", "focusout" ].indexOf(e.type) >= 0){
          this.setCustomValidity("");
        }

        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      }
      else if (this.hasOwnProperty("oldValue")) {
        // Rejected value: restore the previous one.
        this.setCustomValidity(errMsg);
        this.reportValidity();
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      }
      else {
        // Rejected value: nothing to restore.
        this.value = "";
      }
    });
  });
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
    label1.setAttribute("for", "fname_" + autindex);

    var input1 = document.createElement("input");
    input1.classList.add("input-textbox", "margin-input-field");
    input1.setAttribute("type", "text");
    input1.setAttribute("id", "fname_" + autindex);
    input1.setAttribute("name", "fname_[]"); // Make it an array input

    var label2 = document.createElement("label");
    label2.innerText = "Last Name:";
    label2.classList.add("subtitle-1", "margin-input-label");
    label2.setAttribute("for", "lname_" + autindex);

    var input2 = document.createElement("input");
    input2.classList.add("input-textbox", "margin-input-field");
    input2.setAttribute("type", "text");
    input2.setAttribute("id", "lname_" + autindex);
    input2.setAttribute("name", "lname_[]"); // Changed name to array input for last name

    var label3 = document.createElement("label");
    label3.innerText = "Email:";
    label3.classList.add("subtitle-1", "margin-input-label");
    label3.setAttribute("for", "email_" + autindex);

    var input3 = document.createElement("input");
    input3.classList.add("input-textbox", "margin-input-field");
    input3.setAttribute("type", "email");
    input3.setAttribute("id", "email_" + autindex);
    input3.setAttribute("name", "email_[]"); // Make it an array input

    setInputFilter(input3, function(value) {
        return /^\w*\d*\.*\-*\@?\w*\d*\.?\w*\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
    }, "Only letters, numbers, '-', '@' and '.' are allowed");

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
    console.log("geometryType")
    console.log(geometryType)
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
    var submitObject = {};
    var inputFields = document.querySelectorAll("input");
    var textAreaFields = document.querySelectorAll("textarea");

    for (input of inputFields){
        if(!(input.id.includes("lat")) && !(input.id.includes("lon"))){
            submitObject[input.id] = input.value;
        }

    }

    for (textarea of textAreaFields){
        submitObject[textarea.id] = textarea.value;
    }

    console.log("submitObject")
    console.log(submitObject)

}
