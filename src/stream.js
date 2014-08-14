// TODO ability to return stream to no event state
// TODO timeout for events in stream
// TODO Add function only once
// TODO kill method to remove events and embeded listeners
// TODO pause method to stop events emitting

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
            return function () {
                var index = subscribers.indexOf(subscriber);
                if (index > -1) {
                    subscribers.splice(index, 1);
                }
            }
        }
    };
}