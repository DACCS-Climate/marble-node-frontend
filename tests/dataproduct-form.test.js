const {initializePointInputDiv,
    initializeUploadDiv,

    createAddCoordinateRowButton,
    addPoint,
    geoPolygon2,
    addAuthor,
    addModel,
    addOther,
    removeEntry,
    updateIndex} =  require("../templates/site/js/dataproduct-form.js")

const nunjucks = require('nunjucks');

test("Test updateIndex() function. " +
    "Takes an array of HTML elements, gets the ID of the last element and increments it for creating the next element." +
    "Returns an integer", () => {
    var htmlArray = [];
    var htmlElement1 = document.createElement("p");
    htmlElement1.id = "element_1";

    htmlArray.push(htmlElement1);

    expect(updateIndex(htmlArray)).toBe(2);
});


describe("DOM Manipulator functions", () => {

    beforeEach(() => {

        /*Create Author input area*/
        var authorBox = document.createElement("div");
        authorBox.id = "author_box";
        authorBox.classList.add("author-parent");

        var initialAuthorRow = document.createElement("div");
        initialAuthorRow.id = "author_1";
        initialAuthorRow.classList.add("author-child");

        var firstNameContainer = document.createElement("div");
        firstNameContainer.classList.add("author-details");

        var firstNameLabel = document.createElement("label");
        firstNameLabel.id = "label_fname_1";
        firstNameLabel.classList.add("subtitle-1", "margin-input-label");
        firstNameLabel.setAttribute("for", "fname_1");

        var firstNameInput = document.createElement("input");
        firstNameInput.id = "fname_1";
        firstNameInput.classList.add("input-textbox", "margin-input-field");
        firstNameInput.setAttribute("type", "text");

        firstNameContainer.appendChild(firstNameLabel);
        firstNameContainer.appendChild(firstNameInput);

        var lastNameContainer = document.createElement("div");
        lastNameContainer.classList.add("author-details");

        var lastNameLabel = document.createElement("label");
        lastNameLabel.id = "label_lname_1";
        lastNameLabel.classList.add("subtitle-1", "margin-input-label", "required-asterisk");

        var lastNameInput = document.createElement("input");
        lastNameInput.id = "lname_1";
        lastNameInput.classList.add("input-textbox", "margin-input-field");
        lastNameInput.setAttribute("type", "text");
        lastNameInput.setAttribute("required", "required");

        lastNameContainer.appendChild(lastNameLabel);
        lastNameContainer.appendChild(lastNameInput);

        var emailInputContainer = document.createElement("div");
        emailInputContainer.classList.add("author-details");

        var emailLabel = document.createElement("label");
        emailLabel.id = "label_email_1";
        emailLabel.classList.add("subtitle-1", "margin-input-label");

        var emailInput = document.createElement("input");
        emailInput.id = "email_1";

        emailInput.setAttribute("name", "email1");

        emailInput.setAttribute("type", "email");
        emailInput.classList.add("input-textbox", "margin-input-field");

        var authorRemove1 = document.createElement("div");
        authorRemove1.classList.add("remove-button");

        var authorRemoveButtonContainer1 = document.createElement("div");
        authorRemoveButtonContainer1.id = "author_remove_container_1";
        authorRemoveButtonContainer1.classList.add("display-none");

        var authorRemoveButton = document.createElement("input");
        authorRemoveButton.id = "author_remove_1";
        authorRemoveButton.classList.add("button-med", "d-button-text", "author-remove-button");
        authorRemoveButton.setAttribute("type", "button");

        authorRemoveButtonContainer1.appendChild(authorRemoveButton);
        authorRemove1.appendChild(authorRemoveButtonContainer1);

        var authorAddButtonContainer = document.createElement("div");
        authorAddButtonContainer.id = "addAuthorButtonContainer";
        authorAddButtonContainer.classList.add("author-button");

        var authorAddButton = document.createElement("input");
        authorAddButton.id = "addAuthorButton";
        authorAddButton.setAttribute("type", "button");
        authorAddButton.classList.add("button-med", "d-button-text", "margin-button-add");
        authorAddButton.addEventListener('click', () => {
            addAuthor('author_box');
        });


        initialAuthorRow.appendChild(firstNameContainer);
        initialAuthorRow.appendChild(lastNameContainer);
        initialAuthorRow.appendChild(emailInputContainer);
        initialAuthorRow.appendChild(authorRemove1);

        authorBox.appendChild(initialAuthorRow);
        authorAddButtonContainer.appendChild(authorAddButton);

        document.body.appendChild(authorBox);
        document.body.appendChild(authorAddButtonContainer);


        /*Create Geometry input area*/
        var geoBBoxDiv = document.createElement("div");
        geoBBoxDiv.id = "geo_bbox";

        var geoPointDiv = document.createElement("div");
        geoPointDiv.id = "geo_point";

        var geoPointContentDiv = document.createElement("div");
        geoPointContentDiv.id = "geo_point_content";

        var geoMultiPointDiv = document.createElement("div");
        geoMultiPointDiv.id = "geo_multipoint";

        var geoMultiPointContentDiv = document.createElement("div");
        geoMultiPointContentDiv.id = "geo_multipoint_content";

        var geoLinestringDiv = document.createElement("div");
        geoLinestringDiv.id = "geo_linestring";

        var geoLinestringContentDiv = document.createElement("div");
        geoLinestringContentDiv.id = "geo_linestring_content";

        var geoPolygonDiv = document.createElement("div");
        geoPolygonDiv.id = "geo_polygon";

        var geoPolygonContentDiv = document.createElement("div");
        geoPolygonContentDiv.id = "geo_polygon_content";

        var geoGeoJSONDiv = document.createElement("div");
        geoGeoJSONDiv.id = "geo_geojson";

        var geoGeoJSONContentDiv = document.createElement("div");
        geoGeoJSONContentDiv.id = "geo_geojson_content";

        var geoNullDiv = document.createElement("div");
        geoNullDiv.id = "geo_null";

        var geoNullContentDiv = document.createElement("div");
        geoNullContentDiv.id = "geo_null_content";

        geoPointDiv.appendChild(geoPointContentDiv);
        geoMultiPointDiv.appendChild(geoMultiPointContentDiv);
        geoLinestringDiv.appendChild(geoLinestringContentDiv);
        geoPolygonDiv.appendChild(geoPolygonContentDiv);
        geoGeoJSONDiv.appendChild(geoGeoJSONContentDiv);
        geoNullDiv.appendChild(geoNullContentDiv);


        geoBBoxDiv.appendChild(geoPointDiv);
        geoBBoxDiv.appendChild(geoMultiPointDiv);
        geoBBoxDiv.appendChild(geoLinestringDiv);
        geoBBoxDiv.appendChild(geoPolygonDiv);
        geoBBoxDiv.appendChild(geoGeoJSONDiv);
        geoBBoxDiv.appendChild(geoNullDiv)

        document.body.appendChild(geoBBoxDiv)

        /*Create Metadata Other input area*/
        var otherBox = document.createElement("div");
        otherBox.id = "other_box";

        var otherInputRowContainer = document.createElement("div");
        otherInputRowContainer.id = "other_1";
        otherInputRowContainer.classList.add("other-child");

        var otherInputRow = document.createElement("div");
        otherInputRow.classList.add("other-additional-child");

        var otherKeyInputContainer = document.createElement("div");
        otherKeyInputContainer.classList.add("other-details");

        var otherKeyLabel = document.createElement("label");
        otherKeyLabel.id = "label_other_key_1";

        var otherKeyInput = document.createElement("input");
        otherKeyInput.id = "other_key_1";
        otherKeyInput.setAttribute("type", "text");

        var otherValueInputContainer = document.createElement("div");
        otherValueInputContainer.classList.add("other-details");

        var otherValueLabel = document.createElement("label");
        otherValueLabel.id = "label_other_value_1";

        var otherValueInput = document.createElement("input");
        otherValueInput.id = "other_value_1";
        otherValueInput.setAttribute("type", "text");

        var addOtherButtonContainer = document.createElement("div");
        addOtherButtonContainer.id = "addOtherButtons";

        var addOtherButton = document.createElement("input");
        addOtherButton.id = "addOtherButton";
        addOtherButton.setAttribute("type", "button");

        addOtherButton.addEventListener('click', () => {
            addOther('other_box');
        });

        otherKeyInputContainer.appendChild(otherKeyLabel);
        otherKeyInputContainer.appendChild(otherKeyInput);
        otherValueInputContainer.appendChild(otherValueLabel);
        otherValueInputContainer.appendChild(otherValueInput);
        otherInputRow.appendChild(otherKeyInputContainer);
        otherInputRow.appendChild(otherValueInputContainer);
        otherInputRowContainer.appendChild(otherInputRow);
        otherBox.appendChild(otherInputRowContainer);

        addOtherButtonContainer.appendChild(addOtherButton);

        document.body.appendChild(otherBox);
        document.body.appendChild(addOtherButtonContainer);


        /*Create Metadata Model section*/
        //TODO: render the jinja template here or manually recreate it here
        var modelBox = document.createElement("div");
        modelBox.id = "model_box";

        var modelRowContainer = document.createElement("div");
        modelRowContainer.id = "model_1";

        var modelURLContainer = document.createElement("div");

        var modelHREFLabel = document.createElement("label");
        modelHREFLabel.id = "label_model_href_1";

        var modelHREFInput = document.createElement("input");
        modelHREFInput.id = "model_href_1";
        modelHREFInput.setAttribute("type", "text");

        var modelDropdownContainer = document.createElement("div");
        modelDropdownContainer.id = "modelDropdownContainer";


        var modelDropdownTemplateContainer = document.createElement("template");
        modelDropdownTemplateContainer.id = "modelDropdownTemplate";

        modelDropdownTemplateContainer

        modelDropdownTemplateContainer.innerText = '{% with %}\n' +
            '            {% set dropdown_type = "model_dropdown" %}\n' +
            '            {% set banner_search_dropdown_class = "banner-dropdown-list-container"%}\n' +
            '            {% set container_id = "model_dropdown_container_template_id" %}\n' +
            '            {% set dropdown_id = "model_dropdown_template_id" %}\n' +
            '            {% set dropdown_button_id = "model_dropdown_button_template_id" %}\n' +
            '            {% set dropdown_button_text_id = "model_dropdown_button_text_template_id" %}\n' +
            '            {% set dropdown_default_UL_id = "model_dropdown_default_UL_template_id" %}\n' +
            '            {% set dropdown_label_text = "Select one" %}\n' +
            '            {% include "partials/dropdown-publish.html" %}\n' +
            '            {% endwith %}'




       // var modelDropdownTemplate = document.getElementById("modelDropdownTemplate");







        var modelOtherInputContainer = document.createElement("div");
        modelOtherInputContainer.id = "model-other-input-container_1";

        var modelOtherInputLabel = document.createElement("label");
        modelOtherInputLabel.id = "label_model_other_1";

        var modelOtherInput = document.createElement("input");
        modelOtherInput.id = "model_other_1";
        modelOtherInput.setAttribute("type", "text");

        var modelAddButtonContainer = document.createElement("div");
        modelAddButtonContainer.id = "addModelButtonContainer";

        var modelAddButton = document.createElement("input");
        modelAddButton.id = "addModelButton";
        modelAddButton.addEventListener('click', () => {
            addModel('model_box');
        });

        modelAddButtonContainer.appendChild(modelAddButton);

        modelURLContainer.appendChild(modelHREFLabel);
        modelURLContainer.appendChild(modelHREFInput);

        modelOtherInputContainer.appendChild(modelOtherInputLabel);
        modelOtherInputContainer.appendChild(modelOtherInput);

        modelRowContainer.appendChild(modelURLContainer);
        modelRowContainer.appendChild(modelDropdownContainer);
        modelRowContainer.appendChild(modelOtherInputContainer);

        modelBox.appendChild(modelRowContainer);

        document.body.appendChild(modelBox);
        document.body.appendChild(modelAddButtonContainer);

    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test("Test initializePointInputDiv function." +
        "Takes a geometry type/name as a string and the ID of the DOM element the output will go into and generate " +
        "DOM elements for the input.  ", () => {

        var geometryType = {
            "point": "geo_point",
            "multipoint": "geo_multipoint",
            "linestring": "geo_linestring",
            "polygon": "geo_polygon"
        };
        var expectedContainerElement;
        var expectedInputField;
        var expectedInputFieldName;
        var expectedContainerElementClass;

        Object.keys(geometryType).forEach((geometryTypeName) => {

            initializePointInputDiv(geometryTypeName, geometryType[geometryTypeName]);

            expectedContainerElement = document.getElementById(geometryTypeName + "_0");
            expectedInputField = document.getElementById(geometryTypeName + "_lat_0");
            expectedInputFieldName = expectedInputField.getAttribute("name");
            expectedContainerElementClass = expectedContainerElement.classList.contains("multipoint-additional-child");

            expect(expectedContainerElementClass).toBe(true);
            expect(expectedInputFieldName).toBe(geometryTypeName + "_lat_[]");
        });
    });


    test("Test initializeUploadDiv function." +
        "A special case of the initialization functions that initializes a textarea instead of a row of input fields",
        () => {
            var divID = "geo_geojson";
            var expectedContainerElement;
            var expectedTextarea;
            var expectedInputFieldName;
            var expectedContainerElementClass;

            initializeUploadDiv(divID);

            expectedContainerElement = document.getElementById("upload_" + divID);
            expectedTextarea = document.getElementById(divID + "_file");

            expectedInputFieldName = expectedTextarea.getAttribute("name");

            expectedContainerElementClass = expectedContainerElement.classList.contains("upload-geojson-child");

            expect(expectedContainerElementClass).toBe(true);
            expect(expectedInputFieldName).toBe("geo_geojson_file");

        });


    test("Test addPoint function." +
        "Adds a new row of input fields dynamically to the geometry input area.  " +
        "When used in the initialization of a geometry's input content, it is called repeatedly to add rows of input " +
        "fields for coordinates for geometries that take coordinates." +

        "Tests: " +
        "- if the Add Point button exists" +
        "- if the Add Point button responds to a click event" +
        "- if the Add Point button adds another row of input fields" +
        "- if the added row has the right index" +

        "Note: Point, GeoJSON, and Null don't have dynamically added inputs.",
        () => {
            var geometryType = {
                "multipoint": "geo_multipoint",
                "linestring": "geo_linestring",
                "polygon": "geo_polygon"
            };
            var defaultRow = false;
            var testAddButton;

            Object.keys(geometryType).forEach( (geometryTypeName) => {

                initializePointInputDiv(geometryTypeName, geometryType[geometryTypeName]);

                var addButtonDivID = geometryType[geometryTypeName] +  "_add_button_div";

                /*Get the Add Button for the specific geometry*/
                var addButtonNodeList = document.querySelectorAll(`div#${addButtonDivID} > input`);

                /*Set the Add Point button up to test the click event*/
                testAddButton = document.getElementById(geometryType[geometryTypeName] + "_add_button");

                if (testAddButton) {
                   testAddButton.addEventListener('click', () => {
                       addPoint(geometryTypeName, geometryType[geometryTypeName] + "_content", defaultRow);
                   });
                }

                testAddButton.click();

                if(geometryTypeName == "multipoint"){
                    var inputFieldID = geometryTypeName + "_1";
                }
                else if(geometryTypeName == "linestring"){
                    var inputFieldID = geometryTypeName + "_2";
                }
                else{
                    var inputFieldID = geometryTypeName + "_3";
                }


                /*Get the newly added row and check the ID of the latitude input field*/
                var geometryTypeInput2 = document.querySelectorAll(`div#${inputFieldID} > div.latitude-child > input`);

                expect(addButtonNodeList[0].id).toBe(geometryType[geometryTypeName] + "_add_button");

                if(geometryTypeName == "multipoint"){
                    expect(geometryTypeInput2[0].id).toBe(geometryTypeName + "_lat_1");
                }
                else if(geometryTypeName == "linestring"){
                    expect(geometryTypeInput2[0].id).toBe(geometryTypeName + "_lat_2");
                }
                else{
                    expect(geometryTypeInput2[0].id).toBe(geometryTypeName + "_lat_3");
                }
            });
        });



        test("Test geoPolygon2 function" +
            "This function is called when an item is selected in the Geometry dropdown." +
            "This function will in turn call initializePointInputDiv function to add the default input fields" +
            "to the respective geometry's div." +
            "This function will also swap the visible geometry's inputs.  For example, if Polygon is selected " +
            "the Polygon inputs are shown and all other geometry's inputs are hidden."+

            "- Tests if the geometry's inputs are created" +
            "- Tests if the correct geometry inputs are shown when that particular geometry is selected"
            , () =>{

            var geometryType = {"point":"geo_point", "multipoint":"geo_multipoint", "linestring":"geo_linestring",
                "polygon":"geo_polygon", "geojson":"geo_geojson", "geonull": "geo_null"};

            Object.keys(geometryType).forEach( (geometryTypeName, geometryTypeIndex) => {
                geoPolygon2(geometryTypeIndex + 1);

                var geometryTypeContainerDiv = document.getElementById(geometryType[geometryTypeName]);
                var geometryTypeShown = geometryTypeContainerDiv.classList.contains("show");

                var geometryTypeContentDivID = geometryType[geometryTypeName] + "_content";
                var geometryTypeCreatedDiv = document.querySelectorAll(`div#${geometryTypeContentDivID} > div`);

                expect(geometryTypeShown).toBe(true);
                if(geometryTypeName == "geojson"){
                    expect(geometryTypeCreatedDiv[0].id).toBe("upload_geo_" + geometryTypeName);
                }
                else if(geometryTypeName == "geonull"){
                    expect(geometryTypeCreatedDiv.length).toBe(0);
                }
                else{
                    expect(geometryTypeCreatedDiv[0].id).toBe(geometryTypeName + "_0");
                }
            });
        });


        test("Test addAuthor function" +
            "This function is called when the Add Author button is clicked." +
            "This function will add an additional row of inputs to the Author section for First Name, Last Name, and Email."+

            "- Tests if the additional row is created when the Add Author button is clicked."
            , () =>{
            var testAddAuthorButton = document.getElementById("addAuthorButton");

            if (testAddAuthorButton) {
               testAddAuthorButton.click();
            }

            var parentAuthorBox = document.getElementById("author_box");
            var authorRows = parentAuthorBox.querySelectorAll(":scope > div");

            expect(authorRows.length).toBe(2);
        });



        /*
        test("Test addModel function" +
            "This function is called when the Add Model button is clicked." +
            "This function will add an additional row of inputs to the Model section in the Metadata section" +
            "for URL and Other."+

            "- Tests if the additional row is created when the Add Other button is clicked."
            , () =>{
            var testAddModelButton = document.getElementById("addModelButton");

            if (testAddModelButton) {
               testAddModelButton.click();
            }

            var parentModelBox = document.getElementById("model_box");
            var modelRows = parentModelBox.querySelectorAll(":scope > div");

            expect(modelRows.length).toBe(2);
        });
        */


        test("Test addOther function" +
            "This function is called when the Add Other button is clicked." +
            "This function will add an additional row of inputs to the Other section in the Metadata section" +
            "for Key and Value."+

            "- Tests if the additional row is created when the Add Other button is clicked."
            , () =>{
            var testAddOtherButton = document.getElementById("addOtherButton");

            if (testAddOtherButton) {
               testAddOtherButton.click();
            }

            var parentOtherBox = document.getElementById("other_box");
            var otherRows = parentOtherBox.querySelectorAll(":scope > div");

            expect(otherRows.length).toBe(2);
        });
});

