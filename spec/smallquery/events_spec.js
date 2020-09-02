import $ from "../../src/smallquery.js";

describe("the events API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<button>Click me</button>");
    });

    it("should register events on an element", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback);

        var event = new Event("click");
        $obj[0].dispatchEvent(event);
        expect(spyspy.calls.count()).toBe(1);
    });

    it("should trigger events on an element", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj[0].addEventListener("click", callback, false);

        $obj.trigger("click");
        expect(spyspy.calls.count()).toBe(1);
    });
});
