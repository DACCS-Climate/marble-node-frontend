document.addEventListener("DOMContentLoaded", function () {
    /*Initialize Popper.js and Tooltips.js*/
    $('[data-toggle="popover"]').popover();

    var geometryDropdown = document.getElementById("geometry");
    geometryDropdown.addEventListener("change", geoPolygon2)

    var initialAuthorRemoveButton = document.getElementById("author_remove_1");
        initialAuthorRemoveButton.addEventListener("click", function() {
        removeEntry("author_box", "author_1" );
    });

    var initialAuthorEmail = document.getElementById("email_1");
    setInputFilter(initialAuthorEmail, function(value) {

        return /^\w*\d*\.*\-*\@?\w*\d*\.?\w*\d*$/.test(value); // Allow digits and '.' only, using a RegExp.
    }, "Only letters, numbers, '-', '@' and '.' are allowed");
})