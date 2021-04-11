describe("noConflict", function() {
    beforeEach(async function() {
        window.$ = "tester";
        await import("../../src/smallquery.js"); // jshint ignore:line
    });

    afterEach(async function() {
        window.$ = window.smallQuery;
    });

    it("should reset window.$", function() {
        window.smallQuery.noConflict();
        expect(window.$).toBe("tester");
    });

    it("should fine to call it multiple times", function() {
        window.smallQuery.noConflict();
        window.smallQuery.noConflict();
        expect(window.$).toBe("tester");
    });
});
