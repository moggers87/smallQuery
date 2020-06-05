import $ from "../../src/smallquery.js";

describe("the children function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>hello <i>you</i></li><li>goodbye <i class='gone'>me</i></li></ul>");
    });

    it("should return all direct children", function() {
        var children = $obj.children();
        expect(children.length).toBe(2);
    });

    it("should return only children that match selector", function() {
        var children = $obj.children("li:nth-child(2)");
        expect(children.length).toBe(1);
    });
});
