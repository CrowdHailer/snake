// TODO ability to return stream to no event state
// TODO timeout for events in stream
// TODO Add function only once
// TODO kill method to remove events and embeded listeners
// TODO pause method to stop events emitting

var each = require('./each');

var create = function () {
    'use strict';

    var subscribers, current, proto, NOEVENT;
    NOEVENT = {};
    current = NOEVENT;
    subscribers = [];

    proto = {
        map: function (transfiguration) {
            var spawned = create();
            this.forEach(function(data){
                spawned.launch(transfiguration(data))
            })
            return spawned
        }
    }

    var instance = Object.create(proto);
    instance.launch = function (item) {
        current = item;
        each(function (subscriber) {
            subscriber(current);
        }, subscribers);
    };
    instance.forEach = function (subscriber) {
        subscribers.push(subscriber);
        if (current !== NOEVENT) {
            subscriber(current);
        }
        return function () {
            var index = subscribers.indexOf(subscriber);
            if (index > -1) {
                subscribers.splice(index, 1);
            }
        };
    };

    return instance;
};

module.exports = create;