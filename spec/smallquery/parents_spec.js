"use strict";

describe("the parents function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>hello <i>you</i></li><li>goodbye <i class='gone'>me</i></li></ul>");
    });

    it("should return all parents up to and including the root element", function() {
        var parents = $obj.find("li:first-child i:first-child").parents();
        expect(parents.length).toBe(2);
        expect(parents[0].tagName).toBe("LI");
        expect(parents[1].tagName).toBe("UL");
    });

    it("should return all parents up to and including the root element that match selector", function() {
        var parents = $obj.find("i").parents("ul");
        expect(parents.length).toBe(1);
        expect(parents[0].tagName).toBe("UL");
    });

    it("should not return duplicate parents when used on multiple elements", function() {
        var parents = $obj.find("li").parents();
        expect(parents.length).toBe(1);
        expect(parents[0].tagName).toBe("UL");
    });
});

describe("the parent function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>hello <i>you</i></li><li>goodbye <i class='gone'>me</i></li></ul>");
    });

    it("should return immediate parents", function() {
        var parents = $obj.find("i").parent();
        expect(parents.length).toBe(2);
        expect(parents[0].tagName).toBe("LI");
        expect(parents[1].tagName).toBe("LI");
    });

    it("should return immediate parents that match selector", function() {
        var parents = $obj.find("i").parent("li:nth-child(2)");
        expect(parents.length).toBe(1);
        expect(parents[0].tagName).toBe("LI");
    });

    it("should return nothing when there is no parent", function() {
        var parents = $obj.parent();
        expect(parents.length).toBe(0);
    });

    it("should not return duplicate parents when used on multiple elements", function() {
        var parents = $obj.find("li").parent();
        expect(parents.length).toBe(1);
        expect(parents[0].tagName).toBe("UL");
    });
});
