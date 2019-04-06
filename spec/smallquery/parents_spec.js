describe("the parents function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>hello <i>you</i></li><li>goodbye <i class='gone'>me</i></li></ul>");
    });

    it("should return all parents up to and including the root element", function() {
        var parents = $obj.find("i").parents();
        expect(parents.length).toBe(3);
    });

    it("should return all parents up to and including the root element that match selector", function() {
        var parents = $obj.find("i").parents("ul");
        expect(parents.length).toBe(1);
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
    });

    it("should return immediate parents that match selector", function() {
        var parents = $obj.find("i").parents("li:nth-child(2)");
        expect(parents.length).toBe(1);
    });
});
