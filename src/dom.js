import smallQuery from "./core.js";

function prepareElements(arrayOrElement, clone) {
    var elements = [];
    if (arrayOrElement instanceof window.Element) {
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
        window.Element.prototype.prepend.apply(this, prepareElements(arrayOrElement, clone));
    });

    return this;
};

smallQuery.prototype.append = function(arrayOrElement) {
    var targetCount = this.length;

    this.each(function(index) {
        var clone = targetCount && index + 1 < targetCount;
        window.Element.prototype.append.apply(this, prepareElements(arrayOrElement, clone));
    });

    return this;
};

smallQuery.prototype.before = function(arrayOrElement) {
    var targetCount = this.length;

    this.each(function(index) {
        var clone = targetCount && index + 1 < targetCount;
        window.Element.prototype.before.apply(this, prepareElements(arrayOrElement, clone));
    });

    return this;
};

smallQuery.prototype.after = function(arrayOrElement) {
    var targetCount = this.length;

    this.each(function(index) {
        var clone = targetCount && index + 1 < targetCount;
        window.Element.prototype.after.apply(this, prepareElements(arrayOrElement, clone));
    });

    return this;
};

smallQuery.prototype.empty = function() {
    this.each(function(index) {
        while (this.firstChild) {
            this.firstChild.remove();
        }
    });

    return this;
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

export default smallQuery;
