//import {expect, jest, test} from '@jest/globals';

const {initializePointInputDiv,
    initializeUploadDiv,
    createInputCoordinatesRow,
    createAddCoordinateRowButton,
    addPoint,
    removeEntry,
    updateIndex} =  require("../templates/site/js/dataproduct-form.js")
//addPoint,
//import {addPoint} from "../templates/site/js/dataproduct-form.js"
//const addCoordinateRow = {addPoint(geometryType, geometryContentDivID)}


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
   afterEach(() => {
       document.body.innerHTML = '';
   });

    test("Test initializePointInputDiv function." +
        "Takes a geometry type/name as a string and the ID of the DOM element the output will go into and generate " +
        "DOM elements for the input.  'author' can also be a geometry name.", () => {


        var geometryType = "polygon";
        var divID = "geo_polygon";
        var contentDivID = "geo_polygon_content";

        var geometryContainerElement = document.createElement("div");
        geometryContainerElement.id = divID;

        var geometryContentElement = document.createElement("div");
        geometryContentElement.id = contentDivID

        var expectedContainerElement ;
        var expectedInputField;
        var expectedInputFieldName;
        var expectedContainerElementClass;

        document.body.appendChild(geometryContainerElement);
        geometryContainerElement.appendChild(geometryContentElement);


        initializePointInputDiv(geometryType, divID);

        expectedContainerElement = document.getElementById(geometryType + "_1");
        expectedInputField = document.getElementById(geometryType + "_lat_1");
        expectedInputFieldName = expectedInputField.getAttribute("name");
        expectedContainerElementClass = expectedContainerElement.classList.contains("multipoint-child");

        expect(expectedContainerElementClass).toBe(true);
        expect(expectedInputFieldName).toBe("polygon_lat_1");

    });



    test("Test initializeUploadDiv function." +
        "A special case of the initialization functions that initializes a textarea instead of a row of input fields",
        () => {
        var divID = "geo_geojson";
        var contentDivID = "geo_geojson_content";

        var geometryContainerElement = document.createElement("div");
        geometryContainerElement.id = divID;

        var geometryContentElement = document.createElement("div");
        geometryContentElement.id = contentDivID

        var expectedContainerElement ;
        var expectedTextarea;
        var expectedInputFieldName;
        var expectedContainerElementClass;

        document.body.appendChild(geometryContainerElement);
        geometryContainerElement.appendChild(geometryContentElement);


        initializeUploadDiv(divID);

        expectedContainerElement = document.getElementById("upload_" + divID );
        expectedTextarea = document.getElementById(divID + "_file");

        expectedInputFieldName = expectedTextarea.getAttribute("name");

        expectedContainerElementClass = expectedContainerElement.classList.contains("upload-geojson-child");

        expect(expectedContainerElementClass).toBe(true);
        expect(expectedInputFieldName).toBe("geo_geojson_file");

    });


    test("Test createInputCoordinatesRow function." +
        "Creates a row of input fields for a geometry.  " +
        "Used in the initialization of a geometry's input content",
        () => {
            var geometryType = "multipoint";
            var inputFieldID = geometryType + "_";
            var indexNum = 1;
            var testContainerDiv = document.createElement("div");

            var testInputRow = createInputCoordinatesRow(geometryType, indexNum);
            var testInputFields = testInputRow.querySelectorAll(`input[id^=${inputFieldID}]`);

            testContainerDiv.appendChild(testInputRow);

            expect(testInputRow.id).toBe("multipoint_1");
            expect(testInputFields[0].id).toBe("multipoint_lat_1");
            expect(testInputFields[1].id).toBe("multipoint_lon_1");

        });

        //TODO: Test addPoint function - in progress
        /*
        test("Test createAddCoordinateRowButton function." +
        "Creates a button, when clicked, will add rows of input fields dynamically to the geometry input area.  " +
        "Used in the initialization of a geometry's input content" +
            "This will add the 'Add' button, test the click function of the button and test if a row of input fields" +
            "has been added." +
        "Note: Point, GeoJSON, and Null don't have dynamically added inputs.",
        () => {
            var geometryType = "multipoint";
            var divID = "geo_multipoint";
            var geometryAddButtonDivID = "geo_multipoint";
            var contentDivID = "geo_multipoint_content";
            var inputFieldID = geometryType + "_";
            var indexNum = 1;
            //var testContainerDiv = document.createElement("div");
            var geometryContainerElement = document.createElement("div");

            var geometryContentElement = document.createElement("div");

            //var testInputRow = createInputCoordinatesRow(geometryType, indexNum);
            var testAddCoordinateRowButton = createAddCoordinateRowButton(geometryType, geometryAddButtonDivID);

            var testAddButton;
            //var testRemoveButton = document.getElementById("multipoint_remove_1");
            //const mockAddPointFunction = jest.fn();
            //const mockRemoveFunction = jest.fn();

            var addPointSpy = jest.spyOn(global, addPoint)

            geometryContainerElement.id = divID;
            geometryContentElement.id = contentDivID;

            geometryContainerElement.appendChild(geometryContentElement);
            document.body.appendChild(geometryContainerElement);


            initializePointInputDiv(geometryType, divID);

            var testMultipoint1 = document.getElementById("multipoint_1");

            //geometryContainerElement.appendChild(testAddCoordinateRowButton);


            testAddButton = document.getElementById(geometryAddButtonDivID + "_add_button");

            // removeEntry("geo_" + geometryType + "_content", geometryType + "_" + indexNum);

             if (testAddButton) {
                    testAddButton.addEventListener('click', () => {
                        addPoint(geometryType, geometryAddButtonDivID + "_content");
                    });
                }





            //const spy = jest.spyOn(global, 'addPoint');

            testAddButton.click()
            var multipointRow2 = document.getElementById("multipoint_2")

            //var testAddButtonResults = mockAddPointFunction.mock.results;

            //console.log("testAddButtonResults ")
            //console.log(testAddButtonResults)


           // expect(mockAddPointFunction).toHaveBeenCalledWith(geometryType, geometryAddButtonDivID + "_content")
            expect(testAddButton.id).toBe("geo_multipoint_add_button");
            expect(multipointRow2.id).toBe("multipoint_2");
            //expect(mockAddPointFunction).toHaveBeenCalled(1);
            expect(addPointSpy).toHaveBeenCalled()

            //spy.mockRestore();

        });

        */

});

