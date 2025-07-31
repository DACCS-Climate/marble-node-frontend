document.addEventListener("DOMContentLoaded", function () {
    var geometryDropdown = document.getElementById("geometry");
    geometryDropdown.addEventListener("change", geoPolygon2)

    var fname1 = document.getElementById("fname1");
    var lname1 = document.getElementById("lname1");
    var email1 = document.getElementById("email1");

    fname1.addEventListener("focus", clearAuthorError);
    lname1.addEventListener("focus", clearAuthorError);
    email1.addEventListener("focus", clearAuthorError);

})