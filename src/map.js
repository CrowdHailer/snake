'use strict';

module.exports = function (action, collection) {
    return collection.map(action)
}