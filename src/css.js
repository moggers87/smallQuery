import smallQuery from "./core.js";

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
        return this.each(function() {
            this.style[key] = value;
        });
    }
};

smallQuery.prototype.addClass = function(klass) {
    return this.each(function() {
        this.classList.add(klass);
    });
};

smallQuery.prototype.removeClass = function(klass) {
    return this.each(function() {
        this.classList.remove(klass);
    });
};

smallQuery.prototype.toggleClass = function(klass) {
    return this.each(function() {
        this.classList.toggle(klass);
    });
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

export default smallQuery;
