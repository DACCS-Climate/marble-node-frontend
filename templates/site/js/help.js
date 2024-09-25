document.addEventListener("DOMContentLoaded", function () {
    var sessionDetailsJSON = getSessionDetails();
    var helpContactElement = document.getElementById("helpContact");

    getBaseURL(sessionDetailsJSON).then(baseURL => {
        setNodeContact(baseURL,helpContactElement);
    });
})