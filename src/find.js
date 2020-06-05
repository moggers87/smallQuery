import smallQuery from "./core.js";

smallQuery.prototype.find = function(selector) {
    selector = ":scope " + selector;
    var matches = smallQuery();

    this.each(function() {
        Array.prototype.push.apply(matches, this.querySelectorAll(selector));
    });

    return matches;
};

smallQuery.prototype.children = function(selector) {
    var matches = smallQuery();

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
    var matches = smallQuery();

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
    var matches = smallQuery();

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
    var matches = smallQuery();

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

export default smallQuery;
