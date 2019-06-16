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
    /*! many ages have passed since the first words were spoken in the darkness: initiate program !*/
    var nodes = [];

    if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            nodes = Array.prototype.slice.call(smallQuery.parseHTML(selector));
        } else {
            nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
        }
    } else if (selector instanceof Element) {
        nodes = [selector];
    } else if (typeof selector === "function") {
        return domReady(selector);
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
};

smallQuery.parseHTML = function(html) {
    return document.createRange().createContextualFragment(html).children;
};
})(window);

(function(window){
"use strict";
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
        this.each(function() {
            var fetchedData = getData(this);
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

(function(window){
"use strict";
/*
 * Find API
 *
 * The find, children, siblings, parent, and parents methods are defined here.
 * Self explanatory.
 *
 */
smallQuery.prototype.find = function(selector) {
    selector = ":scope " + selector;
    var matches = $();

    this.each(function() {
        Array.prototype.push.apply(matches, this.querySelectorAll(selector));
    });

    return matches;
};

smallQuery.prototype.children = function(selector) {
    var matches = $();

    this.each(function() {
        if (selector) {
            for (var i = 0; i < this.children.length; i++) {
                var child = this.children[i];
                if (child.matches(selector)) {
                    Array.prototype.push.call(matches, child);
                }
            }
        } else {
            Array.prototype.push.apply(matches, this.children);
        }
    });

    return matches;
};

smallQuery.prototype.siblings = function(selector) {
    var matches = $();

    this.each(function() {
        if (this.parentElement === null) {
            return;
        } else {
            for (var i = 0; i < this.parentElement.children.length; i++) {
                var sibling = this.parentElement.children[i];
                if (Array.prototype.indexOf.call(matches, sibling) === -1 && sibling !== this) {
                    if (selector) {
                        if (sibling.matches(selector)) {
                            Array.prototype.push.call(matches, sibling);
                        }
                    } else {
                        Array.prototype.push.call(matches, sibling);
                    }
                }
            }
        }
    });

    return matches;
};

smallQuery.prototype.parent = function(selector) {
    var matches = $();

    this.each(function() {
        if (this.parentElement === null) {
            return;
        } else if (selector) {
            if (Array.prototype.indexOf.call(matches, this.parentElement) === -1 && this.parentElement.matches(selector)) {
                Array.prototype.push.call(matches, this.parentElement);
            }
        }  else {
            if (Array.prototype.indexOf.call(matches, this.parentElement) === -1) {
                Array.prototype.push.call(matches, this.parentElement);
            }
        }
    });

    return matches;
};

smallQuery.prototype.parents = function(selector) {
    var matches = $();

    this.each(function() {
        var el = this;
        while (el.parentElement !== null) {
            el = el.parentElement;
            if (Array.prototype.indexOf.call(matches, el) === -1) {
                if (selector) {
                    if (el.matches(selector)) {
                        Array.prototype.push.call(matches, el);
                    }
                } else {
                    Array.prototype.push.call(matches, el);
                }
            }
        }
    });

    return matches;
};
})(window);

(function(window){
"use strict";
/*
 * Append/Prepend API
 *
 * The append and prepend methods are defined here. Self explanatory.
 *
 */

function prepareElements(arrayOrElement, clone) {
    var elements = [];
    if (arrayOrElement instanceof Element) {
        elements.push(arrayOrElement);
    } else {
        for (var i = 0; i < arrayOrElement.length; i++) {
            elements.push(arrayOrElement[i]);
        }
    }

    if (clone) {
        for (var j = 0; j < elements.length; j++) {
            elements[j] = elements[j].cloneNode(true);
        }
    }

    return elements;
}

smallQuery.prototype.prepend = function(arrayOrElement) {
    var targetCount = this.length;

    this.each(function(index) {
        var clone = targetCount && index + 1 < targetCount;
        Element.prototype.prepend.apply(this, prepareElements(arrayOrElement, clone));
    });

    return this;
};

smallQuery.prototype.append = function(arrayOrElement) {
    var targetCount = this.length;

    this.each(function(index) {
        var clone = targetCount && index + 1 < targetCount;
        Element.prototype.append.apply(this, prepareElements(arrayOrElement, clone));
    });

    return this;
};
})(window);

(function(window){
"use strict";
/*
 * CSS API
 *
 * CSS manipulation
 */

smallQuery.prototype.css = function(key, value) {
    if (value === undefined) {
        var currentThis = this;

        if (Array.isArray(key)) {
            var styleObj = {};

            key.forEach(function(style) {
                styleObj[style] = getValue(currentThis[0], style);
            });

            return styleObj;
        } else if (typeof key === "object" && key.constructor === Object) {
            Object.entries(key).forEach(function(pair) {
                currentThis.each(function() {
                    this.style[pair[0]] = pair[1];
                });
            });
        } else {
            return getValue(this[0], key);
        }
    } else {
        this.each(function() {
            this.style[key] = value;
        });
    }
};

smallQuery.prototype.addClass = function(klass) {
    this.each(function() {
        this.classList.add(klass);
    });

    return this;
};

smallQuery.prototype.removeClass = function(klass) {
    this.each(function() {
        this.classList.remove(klass);
    });

    return this;
};

smallQuery.prototype.toggleClass = function(klass) {
    this.each(function() {
        this.classList.toggle(klass);
    });

    return this;
};

smallQuery.prototype.hasClass = function(klass) {
    var has = false;

    this.each(function() {
        if (this.classList.contains(klass)) {
            has = true;
            return false;  // make each bail out earlier
        }
    });

    return has;
};

/*
 * Internal functions
 */

function getValue(el, key) {
    return el.style[key] || window.getComputedStyle(el)[key] || undefined;
}
})(window);
