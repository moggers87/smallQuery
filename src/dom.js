import smallQuery from "./core.js";

function prepareElements(thisArg, arrayOrElement, clone) {
    var elements;
    if (typeof arrayOrElement === "function") {
        elements = smallQuery(arrayOrElement.call(thisArg));
    } else {
        elements = smallQuery(arrayOrElement);
    }

    if (clone) {
        elements = elements.clone();
    }

    return elements;
}

function cloneDataAndEvents(source, destination) {
    var dataMarker = smallQuery.prototype.privDataMarker;
    var eventMarker = smallQuery.prototype.privEventMarker;

    if (source[dataMarker] !== undefined) {
        destination[dataMarker] = {};
        for (let key in source[dataMarker]) {
            destination[dataMarker][key] = source[dataMarker][key];
        }
    }

    if (source[eventMarker] !== undefined) {
        destination[eventMarker] = {};
        for (let key in source[eventMarker]) {
            destination[eventMarker][key] = new Set();
            for (let fn of source[eventMarker][key]) {
                destination.addEventListener(key, fn);
                destination[eventMarker][key].add(fn);
            }
        }
    }
}

smallQuery.prototype.clone = function(dataAndEvents, dataAndEventsDeep) {
    var clonedElements = smallQuery();

    this.each(function(idx) {
        var clone = this.cloneNode(true);
        Array.prototype.push.call(clonedElements, clone);

        if (dataAndEvents) {
            cloneDataAndEvents(this, clone);
            if (dataAndEventsDeep) {
                var children = this.querySelectorAll(":scope *");
                var cloneChildren = clone.querySelectorAll(":scope *");
                for (var i = 0; i < children.length; i++) {
                    cloneDataAndEvents(children[i], cloneChildren[i]);
                }
            }
        }
    });

    return clonedElements;
};

smallQuery.prototype.prepend = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.prepend.apply(this, prepareElements(this, arrayOrElement, index !== lastIndex));
    });
};

smallQuery.prototype.append = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.append.apply(this, prepareElements(this, arrayOrElement, index !== lastIndex));
    });
};

smallQuery.prototype.before = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.before.apply(this, prepareElements(this, arrayOrElement, index !== lastIndex));
    });
};

smallQuery.prototype.after = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.after.apply(this, prepareElements(this, arrayOrElement, index !== lastIndex));
    });
};

smallQuery.prototype.empty = function() {
    return this.each(function(index) {
        while (this.firstChild) {
            this.firstChild.remove();
        }
    });
};

function removeElements(sqObj, selector, removeData) {
    var selected;

    if (selector) {
        selected = sqObj.find(selector);
    } else {
        selected = sqObj;
    }

    selected.each(function(index) {
        if (removeData) {
            smallQuery(this).removeData();
        }
        this.remove();
    });

    return selected;
}

smallQuery.prototype.remove = function(selector) {
    return removeElements(this, selector, true);
};

smallQuery.prototype.detach = function(selector) {
    return removeElements(this, selector, false);
};

function wrap(target, wrapper) {
    var parent = target.parentNode;
    var innerElement = wrapper[0];
    while (innerElement.firstElementChild) {
        innerElement = innerElement.firstElementChild;
    }
    target.remove();
    innerElement.appendChild(target);
    parent.appendChild(wrapper[0]);
}

smallQuery.prototype.wrap = function(element) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        var wrapper = prepareElements(this, element, index !== lastIndex);
        wrap(this, wrapper);
    });
};

smallQuery.prototype.wrapInner = function(element) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        var lastChild = (this.childNodes.length || 0) - 1;
        var children = {};
        for (var i = 0; i <= lastChild; i++) {
            children[i] = this.childNodes[i];
        }
        for (var j = 0; j <= lastChild; j++) {
            var wrapper = prepareElements(this, element, index !== lastIndex || j !== lastChild);
            wrap(children[j], wrapper);
        }
    });
};

smallQuery.prototype.wrapAll = function(element) {
    var wrapper = prepareElements(this, element, false);
    wrap(this[0], wrapper);
    var newParent = this[0].parentNode;
    return this.each(function(index) {
        this.remove();
        newParent.appendChild(this);
    });
};

smallQuery.prototype.replaceWith = function(contentOrFunction) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.replaceWith.apply(this, prepareElements(this, contentOrFunction, index !== lastIndex));
    });
};

export default smallQuery;
