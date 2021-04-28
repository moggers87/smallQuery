import $ from "../../src/smallquery.js";

describe("the clone function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<div><p>hello <b>you</b></p></div><div><p>blah</p></div>");
    });

    it("should clone all elements", function() {
        var $clone = $obj.clone();
        expect($clone).toEqual($obj);
    });

    it("should default to not copying data and event listeners", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback).data("test", "ok");

        var $clone = $obj.clone();

        $clone.trigger("click");
        expect(spyspy.calls.count()).toBe(0);
        expect($clone.data("test")).toBeUndefined();
    });

    it("should copy data and event listeners when dataAndEvents is true", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback).data("test", "ok");
        $obj.find("b").on("click", callback).data("test", "ok");

        var $clone = $obj.clone(true);

        $clone.trigger("click");
        expect(spyspy.calls.count()).toBe(2);
        $clone.find("b").trigger("click");
        expect(spyspy.calls.count()).toBe(2);
        expect($clone.data("test")).toBe("ok");
    });

    it("should default to only doing a shallow copy of data and event listeners", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback).data("test", "ok");
        $obj.find("b").on("click", callback).data("test", "ok");

        var $clone = $obj.clone(true);

        $clone.find("b").trigger("click");
        expect(spyspy.calls.count()).toBe(0);
        expect($clone.find("b").data("test")).toBeUndefined();
    });

    it("should deep copy data and event listeners when dataAndEventsDeep is true", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback).data("test", "ok");
        $obj.find("b").on("click", callback).data("test", "ok");

        var $clone = $obj.clone(true, true);

        $clone.trigger("click");
        expect(spyspy.calls.count()).toBe(2);
        $clone.find("b").trigger("click");
        expect(spyspy.calls.count()).toBe(3);
        expect($clone.data("test")).toBe("ok");
    });

    it("should not share state between the original and cloned object", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        $obj.on("click", callback).data("test", "ok");

        var $clone = $obj.clone(true, true);

        $obj.on("submit", callback).on("click", callback).data("ok", "ok!");

        expect($clone.data()).not.toEqual($obj.data());
        $clone.trigger("submit");
        expect(spyspy.calls.count()).toBe(0);
        $clone.trigger("click");
        expect(spyspy.calls.count()).toBe(2);

        // double check
        spyspy.calls.reset();
        $obj.trigger("submit");
        expect(spyspy.calls.count()).toBe(2);
        $obj.trigger("click");
        expect(spyspy.calls.count()).toBe(4);
    });
});
