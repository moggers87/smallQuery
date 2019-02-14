/*! smallquery Copyright (C) 2019 Matt Molyneaux */

(function(window) {
"use strict";

var domReadyArray = [];

var smallQuery = function(selector) {
    return new smallQuery.prototype.init(selector);
};

smallQuery.fn = smallQuery.prototype;  // jQuery compatibility

// populate the global context
window.$ = window.smallQuery = smallQuery;

function domReady(fn) {
    return document.readyState === "complete" ? fn.call(document) : domReadyArray.push(fn);
}

document.addEventListener("DOMContentLoaded", function() {
    while (domReadyArray.length) {
        domReadyArray.shift().call(document);
    }
});

smallQuery.prototype.init = function(selector) {
    if (!selector) {
        return this;
    } else if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            this.nodes = Array.prototype.slice.call(smallQuery.parseHTML(selector).childNodes);
        } else {
            this.nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
        }
    } else if (selector instanceof Element) {
        this.nodes = [selector];
    } else if (typeof selector === "function") {
        return domReady(selector);
    }

    if (this.nodes.length !== undefined) {
        this.length = this.nodes.length;
        for (var i = 0; i < this.nodes.length; i++) {
            this[i] = this.nodes[i];
        }
    }

    return this;
};

smallQuery.parseHTML = function(html) {
   return document.createRange().createContextualFragment(html);
};
})(window);
