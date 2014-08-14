'use strict';

Object.prototype.map = function (action) {
    var result = {};
    var obj = this;
    for (var key in obj) {
        if(obj.hasOwnProperty(key)) {
            result[key] = action(obj[key], key, obj)
        }
    }
    return result
}

module.exports = function (action, collection) {
    return collection.map(action)
}