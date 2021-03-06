import smallQuery from "./core.js";

function prepareElements(arrayOrElement, clone) {
    var elements = smallQuery(arrayOrElement);

    if (clone) {
        for (var j = 0; j < elements.length; j++) {
            elements[j] = elements[j].cloneNode(true);
        }
    }

    return elements;
}

smallQuery.prototype.prepend = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.prepend.apply(this, prepareElements(arrayOrElement, index !== lastIndex));
    });
};

smallQuery.prototype.append = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.append.apply(this, prepareElements(arrayOrElement, index !== lastIndex));
    });
};

smallQuery.prototype.before = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.before.apply(this, prepareElements(arrayOrElement, index !== lastIndex));
    });
};

smallQuery.prototype.after = function(arrayOrElement) {
    var lastIndex = this.length - 1;
    return this.each(function(index) {
        window.Element.prototype.after.apply(this, prepareElements(arrayOrElement, index !== lastIndex));
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
        var wrapper = prepareElements(element, index !== lastIndex);
        wrap(this, wrapper);
    });
};

smallQuery.prototype.wrapInner = function(element) {
    var lastIndex = this.length - 1;
    var $element = smallQuery(element);
    return this.each(function(index) {
        var lastChild = (this.childNodes.length || 0) - 1;
        var children = {};
        for (var i = 0; i <= lastChild; i++) {
            children[i] = this.childNodes[i];
        }
        for (var j = 0; j <= lastChild; j++) {
            var wrapper = prepareElements($element, index !== lastIndex || j !== lastChild);
            wrap(children[j], wrapper);
        }
    });
};

smallQuery.prototype.wrapAll = function(element) {
    var wrapper = prepareElements(element, false);
    wrap(this[0], wrapper);
    var newParent = this[0].parentNode;
    return this.each(function(index) {
        this.remove();
        newParent.appendChild(this);
    });
};

export default smallQuery;
