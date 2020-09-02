import $ from "../../src/smallquery.js";

describe("the empty API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li></ul>");
    });

    it("should remove all element children", function() {
        $obj.empty();
        expect($obj.children().length).toEqual(0);
    });

    it("should remove all text from a leaf element", function() {
        $obj.find("li:first-child").empty();
        expect($obj.find("li:first-child")[0].textContent).toEqual("");
    });

    it("should return a smallquery object", function() {
        var result = $obj.empty();
        expect(result).toBe($obj);
    });
});
