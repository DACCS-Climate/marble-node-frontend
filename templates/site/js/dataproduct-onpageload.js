document.addEventListener("DOMContentLoaded", function () {
    /*Initialize Popper.js and Tooltips.js*/
    $('[data-toggle="popover"]').popover();

    /*Initialize flatpickr calendars*/
    flatpickr("#metadata_start_date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i"
    });
    flatpickr("#metadata_end_date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i"
    });

    var geometryDropdown = document.getElementById("geometry");
    geometryDropdown.addEventListener("change", geoPolygon2)

    var initialAuthorRemoveButton = document.getElementById("author_remove_1");
        initialAuthorRemoveButton.addEventListener("click", function() {
        removeEntry("author_box", "author_1" );
    });

    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", submitForm);

    /*Make Start Date calendar icon clickable and put focus on Start Date input*/
    document.getElementById("metadata_start_icon").addEventListener("click", () => {
        document.getElementById("metadata_start_date").focus();
    });

    /*Make End Date calendar icon clickable and put focus on End Date input*/
    document.getElementById("metadata_end_icon").addEventListener("click", () => {
        document.getElementById("metadata_end_date").focus();
    });
})