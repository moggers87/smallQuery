import smallQuery from "./core.js";

smallQuery.prototype.on = function(eventType, fn) {
    return this.each(function() {
        addHandler(this, eventType, fn);
    });
};

smallQuery.prototype.off = function(eventType, fn) {
    return this.each(function() {
        removeHandler(this, eventType, fn);
    });
};

smallQuery.prototype.trigger = function(eventType) {
    var event = new window.Event(eventType);

    return this.each(function() {
        this.dispatchEvent(event);
    });
};


var privEventMarker = "smallQueryEvents" + Math.random();

function addHandler(el, type, fn) {
    el.addEventListener(type, fn);
    if (!(privEventMarker in el)) {
        el[privEventMarker] = {};
    }

    if (!(type in el[privEventMarker])) {
        el[privEventMarker][type] = new Set();
    }

    el[privEventMarker][type].add(fn);

}

function removeHandler(el, type, fn) {
    if (privEventMarker in el) {
        for (const eventType in el[privEventMarker]) {
            if (type !== undefined && type !== eventType) {
                continue;
            }
            for (const handler of el[privEventMarker][eventType]) {
                if (fn !== undefined && fn !== handler) {
                    continue;
                }
                el.removeEventListener(eventType, handler);
                el[privEventMarker][eventType].delete(handler);
            }
        }
    }
}

export default smallQuery;
