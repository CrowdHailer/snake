'use strict';

Array.prototype.take = function (n) {
    return Array.prototype.slice.call(this, 0, n)
}

Array.prototype.tail = function (n) {
    return Array.prototype.slice.call(this, n)
}

module.exports = function (index, collection) {
    var result = {
        head: collection.take(index),
        tail: collection.tail(index)
    }
    return result;
};