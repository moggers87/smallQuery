import smallQuery from "./core.js";

smallQuery.prototype.on = function(eventType, fn) {
    return this.each(function() {
        this.addEventListener(eventType, fn);
    });
};

smallQuery.prototype.trigger = function(eventType) {
    var event = new window.Event(eventType);

    return this.each(function() {
        this.dispatchEvent(event);
    });
};
