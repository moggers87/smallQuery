"use strict";

describe("the siblings function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>hello <i>you</i></li><li>goodbye <i class='gone'>me</i></li><li class='empty'>&nbsp;</li></ul>");
    });

    it("should return all sibling elements", function() {
        var sibs = $obj.children("li:first-child").siblings();
        expect(sibs.length).toBe(2);
        expect(sibs[0].tagName).toBe("LI");
        expect(sibs[1].tagName).toBe("LI");
    });

    it("should return all siblings that match selector", function() {
        var sibs = $obj.children("li:first-child").siblings(".empty");
        expect(sibs.length).toBe(1);
        expect(sibs[0].tagName).toBe("LI");
        expect(Array.from(sibs[0].classList)).toEqual(["empty"]);
    });

    it("should return nothing if the element has no parent", function() {
        var sibs = $obj.siblings();
        expect(sibs.length).toBe(0);
    });
});
