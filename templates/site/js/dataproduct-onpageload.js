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

    /*Stop the submission of form data and have the submitForm function do it instead*/
    document.getElementById("pointForm").addEventListener("submit", function(event){
        event.preventDefault();
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
    /*For checkbox to make Start Date same as End Date and only End Date read only*/
    document.getElementById("date_make_equal").addEventListener("change", () => {
        calendarDatesEqual("date_make_equal", "metadata_start_date", "metadata_end_date");
    });

    /*For adding the click event listener to the anchor tags in the list items of the first Model dropdown*/
    initializeModelDropdown("metadata_model_dropdown_UL");
})