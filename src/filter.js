'use strict';

Object.prototype.filter = function (action) {
    var result = {}, obj = this;
    obj.forEach(function(value, key){
        if (action(value, key, obj)) {
            result[key] = value;
        }
    });
    return result
}

var filter = function (condition, collection) {
    return collection.filter(condition);
};

module.exports = function (condition, collection) {
    if (arguments.length === 2) {
        return filter.apply(this, arguments);
    }
    return function (collection) {
        return filter(condition, collection)
    }
};