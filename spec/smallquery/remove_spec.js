import $ from "../../src/smallquery.js";

describe("the remove API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li></ul>");
    });

    it("should remove all selected elements when no argument is given", function() {
        $obj.find("li").remove();
        expect($obj.children().length).toEqual(0);
    });

    it("should filter selected elements when an argument is given", function() {
        $obj.remove("li");
        expect($obj.children().length).toEqual(0);
    });

    it("should remove all data", function() {
        var removed;
        $obj.find("li:first-child").data("test", "hello");
        removed = $obj.find("li:first-child").remove();
        expect(removed.data("test")).toEqual(undefined);
    });
});
