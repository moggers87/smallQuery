import $ from "../../src/smallquery.js";

describe("the css() function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<p style='color: fuchsia'><i style='font-size: 12px'>Hello</i></p>");
        $("body").append($obj);
    });

    it("should return undefined for specified properties that don't exist", function() {
        expect($obj.css("colour")).toBe(undefined);
    });

    it("should return the value of the specified property", function() {
        expect($obj.css("color")).toBe("fuchsia");
    });

    it("should return the value of a valid but unspecified property", function() {
        expect($obj.css("display")).toBe("block");
    });

    it("should set the value of the specified property", function() {
        $obj.css("color", "blue");
        expect($obj[0].style.color).toBe("blue");
    });

    it("should return multiple values from the specified properties", function() {
        expect($obj.children().css(["color", "font-size"])).toEqual({"color": "rgb(255, 0, 255)", "font-size": "12px"});
    });

    it("should set values via the specified object", function() {
        $obj.css({"display": "block"});
        expect($obj[0].style.display).toBe("block");
        expect($obj[0].style.color).toBe("fuchsia");
    });
});

describe("the addClass() function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<p class='blob'>Hello <i>friend</i></p>");
    });

    it("should add a class to elements", function() {
        $obj.addClass("cheese");
        expect(Array.from($obj[0].classList)).toEqual(["blob", "cheese"]);
        expect(Array.from($obj[0].children[0].classList)).toEqual([]);
    });

    it("should not add a class if the element already has that class", function() {
        $obj.addClass("blob");
        expect(Array.from($obj[0].classList)).toEqual(["blob"]);
        expect(Array.from($obj[0].children[0].classList)).toEqual([]);
    });

    it("should return a smallquery object", function() {
        var result = $obj.addClass("blob2");
        expect(result).toBe($obj);
    });
});

describe("the removeClass() function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<p class='blob cheese'>Hello <i class='blob'>friend</i></p>");
    });

    it("should remove a class from elements", function() {
        $obj.removeClass("blob");
        expect(Array.from($obj[0].classList)).toEqual(["cheese"]);
        expect(Array.from($obj[0].children[0].classList)).toEqual(["blob"]);
    });

    it("should be fine if the class isn't on the elements", function() {
        $obj.removeClass("hello");
        expect(Array.from($obj[0].classList)).toEqual(["blob", "cheese"]);
        expect(Array.from($obj[0].children[0].classList)).toEqual(["blob"]);
    });

    it("should return a smallquery object", function() {
        var result = $obj.removeClass("blob");
        expect(result).toBe($obj);
    });
});

describe("the toggleClass() function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<p class='blob cheese'>Hello <i class='blob'>friend</i></p>");
    });

    it("should add a class if missing", function() {
        $obj.toggleClass("tap");
        expect(Array.from($obj[0].classList)).toEqual(["blob", "cheese", "tap"]);
        expect(Array.from($obj[0].children[0].classList)).toEqual(["blob"]);
    });

    it("should remove a class if present", function() {
        $obj.toggleClass("blob");
        expect(Array.from($obj[0].classList)).toEqual(["cheese"]);
        expect(Array.from($obj[0].children[0].classList)).toEqual(["blob"]);
    });

    it("should return a smallquery object", function() {
        var result = $obj.toggleClass("blob");
        expect(result).toBe($obj);
    });
});

describe("the hasClass() function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<p class='cheese'>Hello <i class='blob'>friend</i></p>");
    });

    it("should return true when the class is present", function() {
        expect($obj.hasClass("cheese")).toBe(true);
    });

    it("should return false when the class is not present", function() {
        expect($obj.hasClass("blob")).toBe(false);
    });
});
