import $ from "../../src/smallquery.js";

describe("the detach API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li></ul>");
    });

    it("should remove all selected elements when no argument is given", function() {
        $obj.find("li").detach();
        expect($obj.children().length).toEqual(0);
    });

    it("should filter selected elements when an argument is given", function() {
        $obj.detach("li");
        expect($obj.children().length).toEqual(0);
    });

    it("should preserve all data", function() {
        var removed;
        $obj.find("li:first-child").data("test", "hello");
        removed = $obj.find("li:first-child").detach();
        expect(removed.data("test")).toEqual("hello");
    });

    it("should return a smallquery object", function() {
        var result = $obj.detach();
        expect(result).toBe($obj);
    });
});
