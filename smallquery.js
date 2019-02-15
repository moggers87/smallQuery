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
    } else {
        this.nodes = [];
    }
};

// give our init method the same prototype as smallQuery so the object created
// has all the right methods that we add elsewhere
smallQuery.prototype.init.prototype = smallQuery.prototype;

smallQuery.prototype.each = function(fn) {
    this.nodes.forEach(fn);
};

smallQuery.parseHTML = function(html) {
   return document.createRange().createContextualFragment(html);
};
})(window);

(function(window){
/*
 * Data API
 *
 * This does everything that jQuery's Data API does, including setting a
 * data attribute to an object reference. This does mean it's more complex
 * than it would otherwise need to be, but that's such a useful feature I
 * thought we'd do that too.
 *
 */
smallQuery.prototype.data = function(key, value) {
    if (key === undefined) {
        var data = {};
        this.each(function(el) {
            var fetchedData = getData(el);
            for (var k in fetchedData) {
                if (!(k in data)) {
                    data[k] = fetchedData[k];
                }
            }
        });

        return data;
    } else if (value === undefined) {
        if (typeof key === "object") {
            // add/update with multiple values
            for (var k in key) {
                setData(this[0], k, key[k]);
            }
        }
        else {
            // fetch single key
            return getData(this[0], key)[key];
        }
    } else {
        // set key to value
        setData(this[0], key, value);
    }
};

// Data API helpers

var privDataMarker = "smallQuery" + Math.random();

function getData(el) {
    var data = {};

    if (privDataMarker in el) {
        var privData = el[privDataMarker];
        for (var k in privData) {
            data[k] = privData[k];
        }
    }

    // check HTML5 data- attributes
    for(var name in el.dataset) {
        if (!(name in data)) {
            data[name] = el.dataset[name];
        }
    }

    return data;
}

function setData(el, key, value) {
    if (!(privDataMarker in el)) {
        el[privDataMarker] = {};
    }

    el[privDataMarker][key] = value;
}
})(window);
