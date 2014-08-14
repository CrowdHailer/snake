'use strict';

Object.prototype.map = function (action, context) {
    var result = {};
    var obj = this;
    for (var key in obj) {
        if(obj.hasOwnProperty(key)) {
            result[key] = action.call(context, obj[key], key, obj)
        }
    }
    return result
}

String.prototype.map = function (action, context) {
    var result = '';
    var str = this;
    for (var key in str) {
        if(str.hasOwnProperty(key)) {
            result = result + action.call(context, str[key], parseInt(key), str)
        }
    }
    return result
}

module.exports = function (action, collection) {
    if (arguments.length === 2) {
        return collection.map(action, this)
    } else {
        return function (collection) {
            return collection.map(action, this  )
        };
    }
};