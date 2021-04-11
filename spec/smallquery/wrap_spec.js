import $ from "../../src/smallquery.js";

describe("the wrap API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li></ul>");
    });

    it("should wrap selected elements with specified object", function() {
        var $p = $("<p></p>");
        $obj.find("li").wrap($p);
        expect($obj.children().length).toBe(2);
        expect($obj.children()[0]).not.toBe($p[0]);
        expect($obj.children()[1]).toBe($p[0]);
    });

    it("should ignore siblings of wrapper", function() {
        var $p = $("<p></p><span></span>");
        $obj.find("li").wrap($p);
        expect($obj.children().length).toBe(2);
        expect($obj.children()[0]).not.toBe($p[0]);
        expect($obj.children()[1]).toBe($p[0]);
        expect($obj.find("span")).toEqual($());
    });

    it("should work with wrappers that have multiple levels", function() {
        $obj.find("li").wrap($("<p><span></span></p>"));
        var pTags = $obj.find("p");
        expect(pTags.length).toBe(2);
        expect(pTags[0]).not.toBe(pTags[1]);
        var spanTags = $obj.find("span");
        expect(spanTags.length).toBe(2);
        expect(spanTags[0]).not.toBe(spanTags[1]);
        expect(spanTags[0].parentElement).toBe(pTags[0]);
        expect(spanTags[1].parentElement).toBe(pTags[1]);
        var liTags = $obj.find("li");
        expect(liTags.length).toBe(2);
        expect(liTags[0]).not.toBe(liTags[1]);
        expect(liTags[0].parentElement).toBe(spanTags[0]);
        expect(liTags[1].parentElement).toBe(spanTags[1]);
    });

    it("should return a smallquery object", function() {
        var result = $obj.wrap("<p></p>");
        expect(result).toBe($obj);
    });
});

describe("the wrapInner API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li>Hello</li><li>Hi</li></ul>");
    });

    it("should wrap selected elements with specified tags", function() {
        $obj.find("li").wrapInner($("<p></p>"));
        var pTags = $obj.find("p");
        expect(pTags.length).toBe(2);
        expect(pTags[0]).not.toBe(pTags[1]);
        var parents = pTags.parent();
        expect(parents.length).toBe(2);
        expect(parents[0]).not.toBe(parents[1]);
    });

    it("should ignore siblings of wrapper", function() {
        $obj.find("li").wrapInner($("<p></p><span></span>"));
        var parents = $obj.find("p").parent();
        expect(parents.length).toBe(2);
        expect(parents[0]).not.toBe(parents[1]);
        expect($obj.find("span")).toEqual($());
    });

    it("should work with wrappers that have multiple levels", function() {
        $obj.find("li").wrapInner($("<p><span></span></p>"));
        var pTags = $obj.find("p");
        expect(pTags.length).toBe(2);
        expect(pTags[0]).not.toBe(pTags[1]);
        var spanTags = $obj.find("span");
        expect(spanTags.length).toBe(2);
        expect(spanTags[0]).not.toBe(spanTags[1]);
        expect(spanTags[0].parentElement).toBe(pTags[0]);
        expect(spanTags[1].parentElement).toBe(pTags[1]);
        var liTags = $obj.find("li");
        expect(liTags.length).toBe(2);
        expect(liTags[0]).not.toBe(liTags[1]);
        expect(pTags[0].parentElement).toBe(liTags[0]);
        expect(pTags[1].parentElement).toBe(liTags[1]);
    });

    it("should not error when there is no inner node to wrap", function() {
        $obj.find("li").each(function(index) {
            this.textContent = "";
            expect(this.childNodes.length).toBe(0);
        });
        $obj.find("li").wrapInner($("<p></p>"));
        var parents = $obj.find("p").parents();
        expect(parents.length).toBe(0);
    });

    it("should return a smallquery object", function() {
        var result = $obj.wrapInner("<p></p>");
        expect(result).toBe($obj);
    });
});

describe("the wrapAll API", function() {
    var $obj;

    beforeEach(function() {
        $obj = $("<ul><li><span>Hello</span><span>friend</span></li><li><span>Hi</span></li></ul>");
    });

    it("should wrap selected elements with specified tags", function() {
        var $span = $obj.find("li:first-child").find("span");
        $span.wrapAll($("<p></p>"));
        var $p = $obj.find("p");
        expect($p.length).toBe(1);
        expect($p.children().length).toBe(2);
        expect($p.children("span").length).toBe(2);
        expect($obj.find("li")[1].children.length).toBe(1);
    });

    it("should ignore siblings of wrapper", function() {
        var $span = $obj.find("li:first-child").find("span");
        $span.wrapAll($("<p></p><p></p>"));
        var $p = $obj.find("p");
        expect($p.length).toBe(1);
        expect($p.children().length).toBe(2);
        expect($p.children("span").length).toBe(2);
        expect($obj.find("li")[1].children.length).toBe(1);
    });

    it("should work with wrappers that have multiple levels", function() {
        var $span = $obj.find("li:first-child").find("span");
        $span.wrapAll($("<p><b></b></p>"));
        var $p = $obj.find("p");
        expect($p.length).toBe(1);
        expect($p.children().length).toBe(1);
        expect($p.children("b").length).toBe(1);
        var $b = $obj.find("b");
        expect($b.length).toBe(1);
        expect($b.children().length).toBe(2);
        expect($b.children("span").length).toBe(2);
        expect($obj.find("li")[1].children.length).toBe(1);
    });

    it("should collect children from different parents", function() {
        var $span = $obj.find("span");
        $span.wrapAll($("<p></p>"));
        var $p = $obj.find("p");
        expect($p.length).toBe(1);
        expect($p.children().length).toBe(3);
        expect($p.children("span").length).toBe(3);
        expect($obj.find("li")[1].children.length).toBe(0);
    });

    it("should return a smallquery object", function() {
        var result = $obj.wrapAll("<p></p>");
        expect(result).toBe($obj);
    });
});
