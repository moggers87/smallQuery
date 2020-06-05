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

export default smallQuery;
