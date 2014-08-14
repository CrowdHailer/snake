'use strict';

Object.prototype.filter = function (action) {
    var result = {}, obj = this;
    obj.forEach(function(value, key){
        if (action(value, key, obj)) {
            result[key] = value
        }
    });
    return result
}

module.exports = function (condition, collection) {
    return collection.filter(condition)
};