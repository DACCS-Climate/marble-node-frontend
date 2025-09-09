document.addEventListener("DOMContentLoaded", function () {
    /*Initialize Popper.js and Tooltips.js*/
    $('[data-toggle="popover"]').popover();

    /*Initialize flatpickr calendars*/
    flatpickr("#metadata_start_date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        allowInput: true
    });
    flatpickr("#metadata_end_date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        allowInput: true
    });

    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", submitForm);

    var geometryDropdown = document.getElementById("geometry");
    geometryDropdown.addEventListener("change", geoPolygon2)

    var initialAuthorRemoveButton = document.getElementById("author_remove_1");
        initialAuthorRemoveButton.addEventListener("click", function() {
        removeEntry("author_box", "author_1" );
    });

    /*Make Start Date calendar icon clickable and put focus on Start Date input*/
    document.getElementById("metadata_start_icon").addEventListener("click", () => {
        document.getElementById("metadata_start_date").focus();
    });

    /*Make End Date calendar icon clickable and put focus on End Date input*/
    document.getElementById("metadata_end_icon").addEventListener("click", () => {
        document.getElementById("metadata_end_date").focus();
    });

    /*For Start Date input to check if checkbox to make Start Date same as End Date is checked before copying
    * Start Date to End Date.
    * For the case where the checkbox is checked and the Start Date needs to be modified.
    * */
    document.getElementById("metadata_start_date").addEventListener("change", () => {
        copyStartDate("metadata_start_date", "metadata_end_date", "date_make_equal");
    });


    /*For checkbox to make Start Date same as End Date and only End Date read only*/
    document.getElementById("date_make_equal").addEventListener("change", () => {
        calendarDatesEqual("date_make_equal", "date_none_needed", "metadata_start_date", "metadata_end_date");
    });

    /*For checkbox to make Start Date and End Date empty and read only*/
    document.getElementById("date_none_needed").addEventListener("change", () => {
        calendarDatesNone("date_make_equal", "date_none_needed", "metadata_start_date", "metadata_end_date");
    });

})