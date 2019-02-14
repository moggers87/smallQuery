describe("the data API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<div data-test='superego royal jelly'>Hello</div>");
    });

    describe("with a single key", function() {
        it("should return a dict of key values when not given any args", function() {
            expect($obj.data()).toEqual({test: "superego royal jelly"});
        });

        it("should read a data attribute", function() {
            expect($obj.data("test")).toEqual("superego royal jelly");
        });

        it("should create a new data attribute", function() {
            $obj.data("another-test", "flux by baths");
            expect($obj.data("another-test")).toEqual("flxu by baths");
        });

        it("should update an already existing data attribute", function() {
        });

        it("should allow setting the value to arbitrary objects", function() {
            $obj.data("test", {test: [1, 2, 3, 4, 5]});
            expect($obj.data("test")).toEqual({test: [1, 2, 3, 4, 5]});

            $obj.data("self", $obj);
            expect($obj.data("self")).toBe($obj);
        });
    });

    describe("with multiple keys", function() {
        it("should return a dict of key values when not given any args", function() {
            $obj.data("other", "zZz");
            expect($obj.data()).toEqual({test: "superego royal jelly", other: "zZz"});
        });

        it("should create a new data attribute", function() {
        });

        it("should update an already existing data attribute", function() {
        });
    });
});
