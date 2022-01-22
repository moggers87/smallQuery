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

    it("should be able to have multiple handlers for the same event type", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        var callback2 = function() {
            spyspy();
        };
        $obj.on("click", callback);
        $obj.on("click", callback2);

        $obj[0].dispatchEvent(new Event("click"));
        expect(spyspy.calls.count()).toBe(2);
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

    it("should remove all event handlers when off is called without arguments", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback);
        $obj.on("submit", callback);
        $obj.off();

        $obj[0].dispatchEvent(new Event("click"));
        expect(spyspy.calls.count()).toBe(0);
        $obj[0].dispatchEvent(new Event("submit"));
        expect(spyspy.calls.count()).toBe(0);
    });

    it("should remove event handlers of a specific event type when off is called with a string", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback);
        $obj.on("submit", callback);
        $obj.off("click");

        $obj[0].dispatchEvent(new Event("click"));
        expect(spyspy.calls.count()).toBe(0);
        $obj[0].dispatchEvent(new Event("submit"));
        expect(spyspy.calls.count()).toBe(1);
    });

    it("should remove a specific event handler when off is called with a string and a function", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        var callback2 = function() {
            spyspy();
        };
        $obj.on("click", callback);
        $obj.on("click", callback2);
        $obj.off("click", callback);

        $obj[0].dispatchEvent(new Event("click"));
        expect(spyspy.calls.count()).toBe(1);
    });

    it("should return a smallquery object when calling trigger", function() {
        var result = $obj.trigger("click");
        expect(result).toBe($obj);
    });

    it("should return a smallquery object when calling on", function() {
        var result = $obj.on("click", function() {});
        expect(result).toBe($obj);
    });

    it("should return a smallquery object when calling off", function() {
        var result = $obj.off();
        expect(result).toBe($obj);
    });
});
