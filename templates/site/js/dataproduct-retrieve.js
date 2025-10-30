async function populateForm(){
    // 68ffd50a9b020be9e53cbf94
    //http://localhost:9000/publish-dataproduct.html?id=68ffd50a9b020be9e53cbf94
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var dataproductFormID;
    var marbleAPIURL;

    console.log(queryString)

    if(urlParams.get("id") != null){
        dataproductFormID = urlParams.get("id");
        console.log(dataproductFormID)
        marbleAPIURL = "{{ configs['marble_api_path'] }}/v1/data-requests/" + dataproductFormID;
    }


    try{
        var response = await fetch(marbleAPIURL,{
            method: "GET"
        })

        var dataproductJSON = await response.json();

        console.log("dataproductJSON")
        console.log(dataproductJSON)

        //var dataproductJSON = await getUploadedDataProduct();
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
     //   if(dataproductJSON.geometry != null){
        var geometryObject = dataproductJSON.geometry;
        var geometryType;
        var geometryTypeDivID;
        var geometryTypeContentDivID;
        var geometryDropdownItemID;
        var coordinateArray;
        var firstCoordinate;
        var lastCoordinate;
        var lastCoordinateIndex;
        var inputRowIndexOffset;


         console.log("dataproductJSON.geometry")
        console.log(dataproductJSON.geometry)


                    console.log("typeof(geometryObject)")
        console.log(typeof(geometryObject))

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
            console.log("geometryType")
            console.log(geometryType)

            console.log("geometryTypeContentDivID")
            console.log(geometryTypeContentDivID)


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

                console.log("coordinateArray")
                console.log(coordinateArray)

                console.log("coordinateArray.length")
                console.log(coordinateArray.length)






            for(var i = inputRowIndexOffset; i < coordinateArray.length; i++){
                addPoint(geometryType, geometryTypeContentDivID);
            }



            coordinateArray.forEach( (coordinate, coordinateArrayIndex) => {

                console.log("coordinate")
                console.log(coordinate)

                                console.log("coordinateIndex")
                console.log(coordinateArrayIndex)
                //var coordinateIndex = coordinateArrayIndex + 1;
                var latitudeID = geometryType + "_lat_" + coordinateArrayIndex;
                var longitudeID = geometryType + "_lon_" + coordinateArrayIndex;

                console.log("latitudeID")
                console.log(latitudeID)

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



    }catch(error){
        console.error(error.message)
    }
}





document.addEventListener("DOMContentLoaded", function () {
    populateForm();

});