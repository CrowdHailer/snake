'use strict';

Object.prototype.forEach = function (action, context) {
    var key, item, obj = this;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj.length) {
                key = parseInt(key, 10);
            }
            item = obj[key];
            action.call(context, item, key, obj);
        }
    }
};

module.exports = function (action, collection) {
    if (arguments.length === 2) {
        collection.forEach(action, this);
    } else {
        return function (collection) {
            collection.forEach(action, this);
        };
    }
};