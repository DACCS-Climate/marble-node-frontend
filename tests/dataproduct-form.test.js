const {initializePointInputDiv,
    initializeUploadDiv,
    updateIndex} =  require("../templates/site/js/dataproduct-form.js")

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



    test("Test initializeUploadDiv function", () => {

    });

});

