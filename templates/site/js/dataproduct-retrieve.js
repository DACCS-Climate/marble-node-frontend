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
        console.log(dataproductJSON)

        //var dataproductJSON = await getUploadedDataProduct();
        var title = document.getElementById("title");
        var description = document.getElementById("desc");

        console.log(dataproductJSON.title)

        title.value = dataproductJSON.title;
        description.innerText = dataproductJSON.description;





        //populateForm(result);
        //var dataRequest = result.data_requests;

        //var dataRequestDisplayDiv = document.getElementById("submittedDataRequests");
        //var dataRequestUser = document.getElementById("submittedDataRequstUser");


/*
        for(data_request of result.data_requests){
            //dataRequestUser.innerText = data_request.user;
            var dataRequestLink = document.createElement("a");
            //dataRequestLink.href = marbleAPIURL
            dataRequestLink.setAttribute("data_request_id", data_request.id);
            dataRequestLink.innerText = data_request.title;
            dataRequestDisplayDiv.appendChild(dataRequestLink)

        }*/



    }catch(error){
        console.error(error.message)
    }
}





document.addEventListener("DOMContentLoaded", function () {
    populateForm();

});