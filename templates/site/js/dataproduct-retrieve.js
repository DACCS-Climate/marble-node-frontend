async function populateForm(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var dataproductFormID;
    var marbleAPIURL;

    if(urlParams.get("id") != null){
        dataproductFormID = urlParams.get("id");
        marbleAPIURL = "{{ configs['marble_api_path'] }}/v1/data-requests/" + dataproductFormID;
    }


    try{
        var response = await fetch(marbleAPIURL,{
            method: "GET"
        })

        var dataproductJSON = await response.json();
        var title = document.getElementById("title");
        var description = document.getElementById("desc");
        var contact = document.getElementById("contact_email");

        title.value = dataproductJSON.title;
        description.value = dataproductJSON.description;
        contact.value = dataproductJSON.contact;

        /*Fill Authors information*/
        for(var i = 1; i < dataproductJSON.authors.length; i++){
            addAuthor('author_box');
        }

        dataproductJSON.authors.forEach( (author, authorArrayIndex) => {
            var authorIndex = authorArrayIndex + 1;
            var firstName = document.getElementById("fname_" +  authorIndex);
            var lastName = document.getElementById("lname_" + authorIndex);
            var email = document.getElementById("email_" + authorIndex);

            firstName.value = author.first_name;
            lastName.value = author.last_name;
            email.value = author.email;
        });


        /*Fill Geometry information*/
        var geometryObject = dataproductJSON.geometry;
        var geometryType;
        var geometryTypeDivID;
        var geometryTypeContentDivID;
        var geometryDropdownItemID;
        var coordinateArray;
        var firstCoordinate;
        var lastCoordinate;
        var inputRowIndexOffset;

        if(geometryObject == null){
            geometryType = String(null);
            geometryTypeDivID = "geo_" + geometryType;
            geometryDropdownItemID = "geometry" + geometryType.charAt(0).toUpperCase() + geometryType.slice(1);
            geometryTypeContentDivID = "geo_" + geometryType + "_content";

            document.getElementById(geometryTypeContentDivID).innerText = "No bounding box required";

        }
        else{
            if(geometryObject.coordinates.length > 1 && geometryObject.type == "Polygon"){
                geometryType = "geojson";
                geometryDropdownItemID = "geometryGeoJSON";
            }
            else{
                geometryType = geometryObject.type.toLowerCase();
                geometryDropdownItemID = "geometry" + geometryObject.type;
            }

            geometryTypeDivID = "geo_" + geometryType;
            geometryTypeContentDivID = "geo_" + geometryType + "_content";

            initializePointInputDiv(geometryType, geometryTypeDivID);

            switch (geometryType){

                case "polygon":
                    inputRowIndexOffset = 3;
                    coordinateArray = geometryObject.coordinates[0];
                    firstCoordinate = coordinateArray[0];
                    lastCoordinate = coordinateArray[coordinateArray.length - 1];

                    if(firstCoordinate[0] == lastCoordinate[0] && firstCoordinate[1] == lastCoordinate[1]){
                        coordinateArray.pop();
                    }

                    break;

                case "linestring":
                    inputRowIndexOffset = 2;
                    coordinateArray = geometryObject.coordinates;

                    break;

                case "multipoint":
                    inputRowIndexOffset = 1;
                    coordinateArray = geometryObject.coordinates;

                    break;

                case "point":
                    coordinateArray = [geometryObject.coordinates];

                    break;
            }



            for(var i = inputRowIndexOffset; i < coordinateArray.length; i++){
                addPoint(geometryType, geometryTypeContentDivID);
            }



            coordinateArray.forEach( (coordinate, coordinateArrayIndex) => {
                var latitudeID = geometryType + "_lat_" + coordinateArrayIndex;
                var longitudeID = geometryType + "_lon_" + coordinateArrayIndex;
                var latitude = document.getElementById(latitudeID);
                var longitude = document.getElementById(longitudeID);

                latitude.value = coordinate[1];
                longitude.value = coordinate[0];
            });
        }

        swapDiv(geometryTypeDivID, geometryType);
        replaceListItem("dropdownListDefaultButtonText", geometryDropdownItemID);



        /*Fill in Date*/
        var metadataStartDate = document.getElementById("metadata_start_date");
        var metadataEndDate = document.getElementById("metadata_end_date");
        var dateEqualCheckbox = document.getElementById("date_make_equal");
        var firstDate = new Date(dataproductJSON.temporal[0]);
        var secondDate = new Date(dataproductJSON.temporal[1]);

        var startDate;
        var startMonth;
        var startMinutes;

        var endDate;
        var endMonth;
        var endMinutes;

        if(firstDate.getUTCMonth() + 1 < 10){
            startMonth = firstDate.getUTCMonth() + 1;
            startMonth = "0" + startMonth;
        }
        else{
            startMonth = firstDate.getUTCMonth() + 1;
        }

        if(firstDate.getUTCDate() < 10){
            startDate = "0" + firstDate.getUTCDate();
        }
        else{
            startDate = firstDate.getUTCDate();
        }

        if(firstDate.getUTCMinutes() < 10){
            startMinutes = "0" + firstDate.getUTCMinutes();
        }
        else{
            startMinutes = firstDate.getUTCMinutes();
        }


        if(secondDate.getUTCMonth() + 1  < 10){
            endMonth = secondDate.getUTCMonth() + 1;
            endMonth = "0" + endMonth;
        }
        else{
            endMonth = secondDate.getUTCMonth() + 1;
        }

        if(secondDate.getUTCDate() < 10){
            endDate = "0" + secondDate.getUTCDate();
        }
        else{
            endDate = secondDate.getUTCDate();
        }

        if(secondDate.getUTCMinutes() < 10){
            endMinutes = "0" + secondDate.getUTCMinutes();
        }
        else{
            endMinutes = secondDate.getUTCMinutes();
        }


        if(dataproductJSON.temporal[0] == dataproductJSON.temporal[1]){
            dateEqualCheckbox.checked = true;
        }

        metadataStartDate.value = firstDate.getUTCFullYear() + "-" + startMonth + "-" + startDate + " " + firstDate.getUTCHours() + ":" + startMinutes;
        metadataEndDate.value = secondDate.getUTCFullYear() + "-" + endMonth + "-" + endDate + " " + secondDate.getUTCHours() + ":" + endMinutes;

        /*Fill in Variables*/
        var variablesText = "";
        var variablesTextArea = document.getElementById("metadata_variables");

        for(variable of dataproductJSON.variables){
            variablesText = variablesText + variable + "\n";
        }

        variablesTextArea.value = variablesText;

        /*Fill in Model/links*/
        if(dataproductJSON.links.length > 0){
            for(var i = 1; i < dataproductJSON.links.length; i++){
                addModel("model_box");
            }

            dataproductJSON.links.forEach( (link, linkIndex) => {
                var rowIndex = linkIndex + 1;
                var selectedDropdownItem;
                var selectedDropdownItemID;
                var selectedIndex;
                var selectedValue;
                var hrefInputField = document.getElementById("model_href_" + rowIndex);
                var otherInputField = document.getElementById("model_other_" + rowIndex);
                var dropdownItemTextID = "dropdownListModelButtonText_" + rowIndex;

                hrefInputField.value = link.href;

                if(link.rel == "input"){
                    selectedDropdownItemID = "modelInput_" + rowIndex

                    replaceListItem(dropdownItemTextID, selectedDropdownItemID);

                }
                else if(link.rel == "model"){
                    selectedDropdownItemID = "modelModel_" + rowIndex;
                    selectedDropdownItem = document.getElementById(selectedDropdownItemID);
                    selectedIndex = selectedDropdownItem.getAttribute("selected_index");
                    selectedValue = selectedDropdownItem.getAttribute("selected_value");

                    replaceListItem(dropdownItemTextID, selectedDropdownItemID);

                    otherInputField.value = link.title;

                    showHideModelInput(parseInt(selectedIndex), selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1), rowIndex);
                }
                else{
                    selectedDropdownItemID = "modelOther_" + rowIndex;
                    selectedDropdownItem = document.getElementById(selectedDropdownItemID);
                    selectedIndex = selectedDropdownItem.getAttribute("selected_index");
                    selectedValue = selectedDropdownItem.getAttribute("selected_value");

                    replaceListItem(dropdownItemTextID, selectedDropdownItemID);

                    otherInputField.value = link.rel;

                    showHideModelInput(parseInt(selectedIndex), selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1), rowIndex);
                }
            });
        }


        /*Fill in Other/extra_properties*/
        if(Object.keys(dataproductJSON.extra_properties).length > 0){

            for(var i = 1; i < Object.keys(dataproductJSON.extra_properties).length; i++){
                addOther("other_box");
            }

            Object.keys(dataproductJSON.extra_properties).forEach( (keyName, extra_propertiesArrayIndex) => {
                var otherRowindex = extra_propertiesArrayIndex + 1;
                var otherKeyInputField = document.getElementById("other_key_" + otherRowindex);
                var otherValueInputField = document.getElementById("other_value_" + otherRowindex);

                otherKeyInputField.value = keyName;
                otherValueInputField.value = dataproductJSON.extra_properties[keyName];
            });
        }

        /*Fill in Path to File*/
        var pathInputField = document.getElementById("linked_path");
        pathInputField.value = dataproductJSON.extra_properties.path;

        /*Fill in Links to additional files*/
        if(dataproductJSON.path != ""){
            pathInputField.value = dataproductJSON.path;
        }

        /*Fill in Link to Additional Files*/
        var linkedValue = "";
        var linkedFilesInputField = document.getElementById("linked_link");

        if(dataproductJSON.additional_paths.length > 0){
            for(linkedFile of dataproductJSON.additional_paths){
                linkedValue = linkedValue + linkedFile + "\n";
            }

            linkedFilesInputField.value = linkedValue;
        }
    }catch(error){
        console.error(error.message)
    }
}





document.addEventListener("DOMContentLoaded", function () {
    populateForm();
});