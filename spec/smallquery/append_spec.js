import $ from "../../src/smallquery.js";

describe("the append function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li>/ul>");
    });

    it("should add an element to the end of the parent", function() {
        var $li = $("<li>Bye</li>");
        $obj.append($li);
        var children = $obj.children();
        expect(children.length).toBe(3);
        expect(children[0].textContent).toEqual("Hello");
        expect(children[1].textContent).toEqual("Hi");
        expect(children[2].textContent).toEqual("Bye");
    });

    it("should add an element to multiple parents", function() {
        var $b = $("<b>Bold</b>");
        var $children = $obj.children();
        $children.append($b);
        for (var i = 0; i < $children.length; i++) {
            var child = $children[i];
            expect(child.children.length).toBe(1);
            expect(child.children[0].textContent).toEqual("Bold");
            expect(child.textContent.endsWith("Bold")).toBe(true);
        }
    });

    it("should add multiple elements to the end of the parent", function() {
        var $li = $("<li>Bye</li><li>ByeBye</li>");
        $obj.append($li);
        var children = $obj.children();
        expect(children.length).toBe(4);
        expect(children[0].textContent).toEqual("Hello");
        expect(children[1].textContent).toEqual("Hi");
        expect(children[2].textContent).toEqual("Bye");
        expect(children[3].textContent).toEqual("ByeBye");
    });

    it("should add a vanilla element to the end of the parent", function() {
        var li = $("<li>Bye</li>")[0];
        $obj.append(li);
        var children = $obj.children();
        expect(children.length).toBe(3);
        expect(children[0].textContent).toEqual("Hello");
        expect(children[1].textContent).toEqual("Hi");
        expect(children[2].textContent).toEqual("Bye");
    });

    it("should not clone if only one parent is selected", function() {
        var $li = $("<li>Bye</li>");
        $obj.append($li);
        var newLi = $obj[0].children[2];
        $li[0].testMe = "test!";
        expect(newLi.testMe).toEqual("test!");
    });

    it("should not clone the last element if there is more than one parent", function() {
        var $b = $("<b>Bold</b>");
        var $children = $obj.children();
        $children.append($b);
        $b[0].testMe = "test!";
        expect($children[0].children[0].testMe).toBeUndefined();
        expect($children[1].children[0].testMe).toEqual("test!");

    });

    it("should return a smallquery object", function() {
        var result = $obj.append("<b>hello</b>");
        expect(result).toBe($obj);
    });
});

describe("the prepend function", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li>/ul>");
    });

    it("should add an element to the start of the parent", function() {
        var $li = $("<li>Bye</li>");
        $obj.prepend($li);
        var children = $obj.children();
        expect(children.length).toBe(3);
        expect(children[0].textContent).toEqual("Bye");
        expect(children[1].textContent).toEqual("Hello");
        expect(children[2].textContent).toEqual("Hi");
    });

    it("should add an element to multiple parents", function() {
        var $b = $("<b>Bold</b>");
        var $children = $obj.children();
        $children.prepend($b);
        for (var i = 0; i < $children.length; i++) {
            var child = $children[i];
            expect(child.children.length).toBe(1);
            expect(child.children[0].textContent).toEqual("Bold");
            expect(child.textContent.startsWith("Bold")).toBe(true);
        }
    });

    it("should add multiple elements to the start of the parent", function() {
        var $li = $("<li>Bye</li><li>ByeBye</li>");
        $obj.prepend($li);
        var children = $obj.children();
        expect(children.length).toBe(4);
        expect(children[0].textContent).toEqual("Bye");
        expect(children[1].textContent).toEqual("ByeBye");
        expect(children[2].textContent).toEqual("Hello");
        expect(children[3].textContent).toEqual("Hi");
    });

    it("should add a vanilla element to the start of the parent", function() {
        var li = $("<li>Bye</li>")[0];
        $obj.prepend(li);
        var children = $obj.children();
        expect(children.length).toBe(3);
        expect(children[0].textContent).toEqual("Bye");
        expect(children[1].textContent).toEqual("Hello");
        expect(children[2].textContent).toEqual("Hi");
    });

    it("should not clone if only one parent is selected", function() {
        var $li = $("<li>Bye</li>");
        $obj.prepend($li);
        var newLi = $obj[0].children[0];
        $li[0].testMe = "test!";
        expect(newLi.testMe).toEqual("test!");
    });

    it("should not clone the last element if there is more than one parent", function() {
        var $b = $("<b>Bold</b>");
        var $children = $obj.children();
        $children.prepend($b);
        $b[0].testMe = "test!";
        expect($children[0].children[0].testMe).toBeUndefined();
        expect($children[1].children[0].testMe).toEqual("test!");

    });

    it("should return a smallquery object", function() {
        var result = $obj.prepend("<b>hello</b>");
        expect(result).toBe($obj);
    });
});

describe("the before functon", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li>/ul>");
    });

    it("should add an element before selected element", function() {
        var $li = $("<li>Bye</li>");
        $obj.children(":first-child").before($li);
        expect($obj.children()[0].textContent).toEqual("Bye");
    });

    it("should add an element before multiple selected elements", function() {
        var $li = $("<li>Bye</li>");
        var $children = $obj.children();
        $children.before($li);

        for (var i = 0; i < $children.length; i++) {
            if (i % 2 === 0) {
                expect($obj.children()[i].textContent).toEqual("Bye");
            } else {
                expect($obj.children()[i].textContent).not.toEqual("Bye");
            }
        }
    });

    it("should add multiple elemets before selected element", function() {
        var $li = $("<li>Bye</li><li>ByeBye</li>");
        $obj.children(":first-child").before($li);
        var children = $obj.children();
        expect(children.length).toBe(4);
        expect(children[0].textContent).toEqual("Bye");
        expect(children[1].textContent).toEqual("ByeBye");
        expect(children[2].textContent).toEqual("Hello");
        expect(children[3].textContent).toEqual("Hi");
    });

    it("should add a vanilla element before selected element", function() {
        var li = $("<li>Bye</li>")[0];
        $obj.children(":first-child").before(li);
        expect($obj.children()[0].textContent).toEqual("Bye");
    });

    it("should not clone if only one element is selected", function() {
        var $li = $("<li>Bye</li>");
        $obj.children(":first-child").before($li);
        var newLi = $obj[0].children[0];
        $li[0].testMe = "test!";
        expect(newLi.testMe).toEqual("test!");
    });

    it("should not clone the last element if there is more than one selected element", function() {
        var $li = $("<li>Bye</li>");
        $obj.children().before($li);
        var $children = $obj.children();
        $li[0].testMe = "test!";
        expect($children[0].testMe).toBeUndefined();
        expect($children[1].testMe).toBeUndefined();
        expect($children[2].testMe).toEqual("test!");
        expect($children[3].testMe).toBeUndefined();
    });

    it("should return a smallquery object", function() {
        var result = $obj.before("<b>hello</b>");
        expect(result).toBe($obj);
    });
});

describe("the after functon", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li>/ul>");
    });

    it("should add an element after selected element", function() {
        var $li = $("<li>Bye</li>");
        $obj.children(":first-child").after($li);
        expect($obj.children()[1].textContent).toEqual("Bye");
    });

    it("should add an element after multiple selected elements", function() {
        var $li = $("<li>Bye</li>");
        var $children = $obj.children();
        $children.after($li);

        for (var i = 0; i < $children.length; i++) {
            if (i % 2 === 0) {
                expect($obj.children()[i].textContent).not.toEqual("Bye");
            } else {
                expect($obj.children()[i].textContent).toEqual("Bye");
            }
        }
    });

    it("should add multiple elemets after selected element", function() {
        var $li = $("<li>Bye</li><li>ByeBye</li>");
        $obj.children(":first-child").after($li);
        var children = $obj.children();
        expect(children.length).toBe(4);
        expect(children[0].textContent).toEqual("Hello");
        expect(children[1].textContent).toEqual("Bye");
        expect(children[2].textContent).toEqual("ByeBye");
        expect(children[3].textContent).toEqual("Hi");
    });

    it("should add a vanilla element after selected element", function() {
        var li = $("<li>Bye</li>")[0];
        $obj.children(":first-child").after(li);
        expect($obj.children()[1].textContent).toEqual("Bye");
    });

    it("should not clone if only one element is selected", function() {
        var $li = $("<li>Bye</li>");
        $obj.children(":first-child").after($li);
        var newLi = $obj[0].children[1];
        $li[0].testMe = "test!";
        expect(newLi.testMe).toEqual("test!");
    });

    it("should not clone the last element if there is more than one selected element", function() {
        var $li = $("<li>Bye</li>");
        $obj.children().after($li);
        var $children = $obj.children();
        $li[0].testMe = "test!";
        expect($children[0].testMe).toBeUndefined();
        expect($children[1].testMe).toBeUndefined();
        expect($children[2].testMe).toBeUndefined();
        expect($children[3].testMe).toEqual("test!");
    });

    it("should return a smallquery object", function() {
        var result = $obj.after("<b>hello</b>");
        expect(result).toBe($obj);
    });
});
