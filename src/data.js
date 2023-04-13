import smallQuery from "./core.js";

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

            return this;
        }
        else {
            // fetch single key
            return getData(this[0], key)[key];
        }
    } else {
        // set key to value
        setData(this[0], key, value);
        return this;
    }
};

smallQuery.prototype.removeData = function() {
    var keys;
    if (!(privDataMarker in this[0])) {
        // if there's no marker, then there's nothing to do
        return;
    }
    if (arguments.length === 0) {
        keys = Object.keys(this[0][privDataMarker]);
    } else {
        keys = arguments;
    }
    for (var i = 0; i < keys.length; i++) {
        delData(this[0], keys[i]);
    }

    return this;
};

// Data API helpers

var privDataMarker = "smallQueryData" + Math.random();

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

function delData(el, key) {
    delete el[privDataMarker][key];
}

export default smallQuery;
