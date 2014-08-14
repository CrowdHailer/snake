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

String.prototype.map = function (action) {
    var result = '';
    var str = this;
    for (var key in str) {
        if(str.hasOwnProperty(key)) {
            result = result + action(str[key], parseInt(key), str)
        }
    }
    return result
}

module.exports = function (action, collection) {
    return collection.map(action)
}