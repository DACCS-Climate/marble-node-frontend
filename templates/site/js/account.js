function displayAccountDetails(){
    var h3Header = document.getElementById("h3Header");
    var accountUsername = document.getElementById("account-username");
    var accountEmail = document.getElementById("account-email");
    
    window.session_info.then(json => {
        h3Header.innerText = "Hi " + json.user["user_name"];
        accountUsername.innerText = json.user["user_name"];
        accountEmail.innerText = json.user["email"];
    })
}

async function getUploadedDataProduct(){
    var marbleAPIURL = "{{ configs['marble_api_path'] }}/v1/data-requests";

    try{
        var response = await fetch(marbleAPIURL,{
            method: "GET"
        })

        var result = await response.json()

        var dataRequestDisplayDiv = document.getElementById("submittedDataRequests");
        //var dataRequestUser = document.getElementById("submittedDataRequstUser");

        for(data_request of result.data_requests){
            //dataRequestUser.innerText = data_request.user;
            var dataRequestLink = document.createElement("a");
            //dataRequestLink.href = marbleAPIURL
            dataRequestLink.setAttribute("data_request_id", data_request.id);
            dataRequestLink.innerText = data_request.title;
            dataRequestDisplayDiv.appendChild(dataRequestLink)

        }

        console.log(result)

    }catch(error){
        console.error(error.message)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayAccountDetails();
    getUploadedDataProduct()

});
