import $ from "../../src/smallquery.js";

describe("the replaceWith API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li><p>Hello how are you?</p></li><li>Hi</li></ul>");
    });

    it("should replace the content of matching elements", function() {
        $obj.find("p").replaceWith("<div>beep</div>");
        var $firstLi = $obj.find("li:first-child");
        expect($firstLi.children().length).toEqual(1);
        expect($firstLi.children()[0].tagName).toEqual("DIV");
        expect($firstLi.children()[0].textContent).toEqual("beep");
    });

    it("should accept a function to generate content", function() {
        $obj.find("p").replaceWith(function() {return "<div>boop</div>";});
        var $firstLi = $obj.find("li:first-child");
        expect($firstLi.children().length).toEqual(1);
        expect($firstLi.children()[0].tagName).toEqual("DIV");
        expect($firstLi.children()[0].textContent).toEqual("boop");
    });

    it("should accept a string to generate content", function() {
        $obj.find("p").replaceWith("<div>bye</div>");
        var $firstLi = $obj.find("li:first-child");
        expect($firstLi.children().length).toEqual(1);
        expect($firstLi.children()[0].tagName).toEqual("DIV");
        expect($firstLi.children()[0].textContent).toEqual("bye");
    });

    it("should accept a smallQuery object to generate content", function() {
        $obj.find("p").replaceWith($("<div>bye</div>"));
        var $firstLi = $obj.find("li:first-child");
        expect($firstLi.children().length).toEqual(1);
        expect($firstLi.children()[0].tagName).toEqual("DIV");
        expect($firstLi.children()[0].textContent).toEqual("bye");
    });

    it("should replace matching items with multiple elements", function() {
        $obj.find("p").replaceWith($("<div>bye</div><b>hi!</b>"));
        var $firstLi = $obj.find("li:first-child");
        expect($firstLi.children().length).toEqual(2);
        expect($firstLi.children()[0].tagName).toEqual("DIV");
        expect($firstLi.children()[0].textContent).toEqual("bye");
        expect($firstLi.children()[1].tagName).toEqual("B");
        expect($firstLi.children()[1].textContent).toEqual("hi!");
    });

    it("should replace multiple matching items", function() {
        $obj.find("li").replaceWith($("<ol>bye</ol>"));
        expect($obj.children().length).toEqual(2);
        expect($obj.children()[0].tagName).toEqual("OL");
        expect($obj.children()[0].textContent).toEqual("bye");
        expect($obj.children()[1].tagName).toEqual("OL");
        expect($obj.children()[1].textContent).toEqual("bye");
    });
});
