var each = require('./each');

exports.create = function () {
    'use strict';

    var subscribers, current, proto, NOEVENT;
    NOEVENT = {};
    current = NOEVENT;
    proto = {};
    subscribers = [];


    return {
        launch: function (item) {
            current = item
            each(function(subscriber) {
                subscriber(current)
            }, subscribers)
        },
        forEach: function (subscriber) {
            subscribers.push(subscriber)
            if (current !== NOEVENT) {
                subscriber(current)
            }
        }
    };
}