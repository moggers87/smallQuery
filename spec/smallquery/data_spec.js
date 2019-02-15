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
            $obj.data("another-test", "voltaic");
            expect($obj.data("another-test")).toEqual("voltaic");
        });

        it("should update an already existing data attribute", function() {
            $obj.data("test", "yearwounds");
            expect($obj.data("test")).toEqual("yearwounds");
        });

        it("should allow setting the value to arbitrary objects", function() {
            $obj.data("test", {test: [1, 2, 3, 4, 5]});
            expect($obj.data("test")).toEqual({test: [1, 2, 3, 4, 5]});

            $obj.data("self", $obj);
            expect($obj.data("self")).toBe($obj);
        });
    });

    describe("with multiple keys", function() {
        beforeEach(function() {
            $obj.data("other", "lover's lane");
        });

        it("should return a dict of key values when not given any args", function() {
            expect($obj.data()).toEqual({test: "superego royal jelly", other: "lover's lane"});
        });

        it("should create multiple keys at once", function() {
            $obj.data({one: 1, two: 2});
            expect($obj.data()).toEqual({test: "superego royal jelly", other: "lover's lane", one: 1, two: 2});
        });

        it("should update an already existing data attribute", function() {
            $obj.data({test: "yearwounds", other: "goodbye horses"});
            expect($obj.data()).toEqual({test: "yearwounds", other: "goodbye horses"});
        });
    });
});
