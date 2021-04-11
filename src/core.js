/* smallquery Copyright (C) 2019 Matt Molyneaux */

var domReadyArray = [];

var smallQuery = function(selector) {
    return new smallQuery.prototype.init(selector);
};

smallQuery.fn = smallQuery.prototype;  // jQuery compatibility

// populate the global context
var oldDollar = window.$;
window.$ = window.smallQuery = smallQuery;

function domReady(fn) {
    return window.document.readyState === "complete" ? fn.call(window.document) : domReadyArray.push(fn);
}

window.document.addEventListener("DOMContentLoaded", function() {
    while (domReadyArray.length) {
        domReadyArray.shift().call(window.document);
    }
});

smallQuery.prototype.init = function(selector) {
    var nodes = [];
    this.length = 0;

    if (typeof selector === "function") {
        domReady(selector);
        return;
    } else if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            nodes = Array.prototype.slice.call(smallQuery.parseHTML(selector));
        } else {
            nodes = Array.prototype.slice.call(window.document.querySelectorAll(selector));
        }
    } else if (selector instanceof window.Element) {
        nodes = [selector];
    } else if (selector && "length" in selector) {
        // assume it's some sort of iterable
        nodes = selector;
    } else {
        return;
    }

    this.length = nodes.length;
    for (var i = 0; i < nodes.length; i++) {
        this[i] = nodes[i];
    }
};

// give our init method the same prototype as smallQuery so the object created
// has all the right methods that we add elsewhere
smallQuery.prototype.init.prototype = smallQuery.prototype;

smallQuery.prototype.each = function(fn) {
    for (var i = 0; i < this.length; i++) {
        if (fn.call(this[i], i) === false) {
            break;
        }
    }
    return this;
};

smallQuery.noConflict = function() {
    if(window.$ === window.smallQuery) {
        window.$ = oldDollar;
    }
};

smallQuery.parseHTML = function(html) {
    return window.document.createRange().createContextualFragment(html).children;
};

export default smallQuery;
