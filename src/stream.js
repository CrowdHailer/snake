var each = require('./each');

exports.create = function () {
    'use strict';

    var subscribers, value, proto;
    proto = {};
    subscribers = [];


    return {
        launch: function (item) {
            each(function(subscriber) {
                subscriber(item)
            }, subscribers)
        },
        forEach: function (subscriber) {
            subscribers.push(subscriber)
        }
    };
}