import $ from "../../src/smallquery.js";

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

        $("<p><b>hello</b></p><div>bye</div>").each(callback);
        expect(spyspy.calls.count()).toBe(2);
    });

    it("should cease if a callback returns false", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
            if (this.textContent === "hmmm") {
                return false;
            }
        };

        $("<p><b>hello</b></p><p>hmmm</p><p>hmmm?</p><div>bye</div>").each(callback);
        expect(spyspy.calls.count()).toBe(2);
    });

    it("should pass the correct args to the callback", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            var args = {
                "this": this,
                "args": Array.prototype.slice.call(arguments),
            };
            spyspy(args);
        };
        var $obj = $("<p><b>hello</b></p><div>bye</div>");
        $obj.each(callback);
        expect(spyspy.calls.count()).toBe(2);
        expect(spyspy.calls.allArgs()[0]).toEqual([{"this": $obj[0], "args": [0]}]);
        expect(spyspy.calls.allArgs()[1]).toEqual([{"this": $obj[1], "args": [1]}]);
    });

    it("should return a smallquery object", function() {
        var $obj = $();
        var result = $obj.each(function() {});
        expect(result).toBe($obj);
    });
});
