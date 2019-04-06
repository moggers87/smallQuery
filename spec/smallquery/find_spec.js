describe("the find function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>hello <i>you</i></li><li>goodbye <i class='gone'>me</i></li></ul>");
    });

    it("should return nothing if no selector is given", function() {
        var found = $obj.find();
        expect(found.length).toBe(0);
    });

    it("should return decendents that match selector", function() {
        var found = $obj.find(".gone");
        expect(found.length).toBe(1);
    });
});
