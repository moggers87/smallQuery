describe("smallQuery", function() {
    afterEach(function() {
        // cleanup any html elements we created
        document.querySelectorAll(".smallquery").forEach(function(el) {
            el.remove();
        });
    });

    it("should define smallQuery", function() {
        expect(smallQuery).toBeDefined();
    });

    it("should define $", function() {
        expect($).toBeDefined();
    });

    it("should be able to return an empty set if no args are given", function() {
        var obj = $();

        expect(obj).toBeDefined();
        expect(obj.length).toBe(0);
    });

    it("should have a length after selecting elements", function() {
        var el = document.createElement("div");
        el.setAttribute("class", "smallquery");
        document.querySelector("body").appendChild(el);
        var obj = $(".smallquery");
        expect(obj.length).toBe(1);
    });

    it("should remain empty is the selector found nothing", function() {
        var obj = $("div.smallquery");
        expect(obj.length).toBe(0);
    });

    it("should be able to wrap an Element object", function() {
        var el = document.createElement("div");
        var obj = $(el);

        expect(obj.length).toBe(1);
        expect(obj[0]).toBe(el);
    });

    it("should be able to create Elements from a HTML string", function() {
        var obj = $("<p>Hello</p>");
        expect(obj.length).toBe(1);
        expect(obj[0].tagName).toBe("P");
        expect(obj[0].textContent).toBe("Hello");
    });

    it("should be able to create multiple Elements from a HTML string", function() {
        var obj = $("<p>Hello</p><i>yes</i>");
        expect(obj.length).toBe(2);
        expect(obj[0].tagName).toBe("P");
        expect(obj[0].textContent).toBe("Hello");
        expect(obj[1].tagName).toBe("I");
        expect(obj[1].textContent).toBe("yes");
    });

    it("should call a function immediately", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };

        $(callback);
        expect(spyspy).toHaveBeenCalled();
    });

    it("should call a function when document is ready", function() {
        var spyspy = jasmine.createSpy("spyspy");
        var callback = function() {
            spyspy();
        };
        spyOnProperty(document, "readyState").and.returnValue("loading");

        $(callback);
        expect(spyspy).not.toHaveBeenCalled();

        window.document.dispatchEvent(new Event("DOMContentLoaded", {
            bubbles: true,
            cancelable: true
        }));
        expect(spyspy).toHaveBeenCalled();
    });

    it("should be fine with multiple instances", function() {
        var $one = $("<p>hello</p>");
        var $two = $("<div>bye</div><div>bob</div>");

        expect($one).not.toBe($two);
        expect($one.length).not.toBe($two.length);
    });
});
