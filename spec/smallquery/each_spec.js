"use strict";

describe("the each method", function() {
    it("should not run functions on an empty object", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };

        $().each(callback);
        expect(spyspy).not.toHaveBeenCalled();
    });

    it("should iterate over direct child nodes only", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };

        $("<p>hello</p><div>bye</div>").each(callback);
        expect(spyspy.calls.count()).toBe(2);
    });
});
