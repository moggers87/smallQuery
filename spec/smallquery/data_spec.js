import $ from "../../src/smallquery.js";

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

        it("should not return multiple values if multiple tags are selected with the same keys", function() {
            $obj = $("<div data-test='superego royal jelly'>Hello</div><div data-test='bluh!' data-value='test'>Bye</div>");
            expect($obj.data()).toEqual({test: "superego royal jelly", value: "test"});
        });
    });

    describe("when removing data", function() {
        beforeEach(function() {
            $obj.data("test", "blackdresses");
            $obj.data("rook", "nomie");
        });

        it("should remove a data entry completely", function() {
            $obj.removeData("rook");
            expect($obj.data()).toEqual({test: "blackdresses"});
        });

        it("should not remove HTML defined datas", function() {
            $obj.removeData("test");
            expect($obj.data()).toEqual({test: "superego royal jelly", rook: "nomie"});
        });

        it("should do all this with multiple keys", function() {
            $obj.removeData("test", "rook");
            expect($obj.data()).toEqual({test: "superego royal jelly"});
        });

        it("should not error when the key does not exist", function() {
            $obj.removeData("badKey");
            expect($obj.data()).toEqual({test: "blackdresses", rook: "nomie"});
        });
    });
});
