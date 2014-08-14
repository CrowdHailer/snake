// TODO ability to return stream to no event state
// TODO timeout for events in stream
// TODO Add function only once
// TODO kill method to remove events and embeded listeners
// TODO pause method to stop events emitting
'use strict';
var each, proto, create;

each = require('./each');

proto = {
    map: function (transfiguration) {
        var spawned = create();
        this.forEach(function (data) {
            spawned.launch(transfiguration(data));
        });
        return spawned;
    },
    filter: function (predicate) {
        var spawned = create();
        this.forEach(function (data) {
            if (predicate(data)) {
                spawned.launch(data);
            }
        });
        return spawned;
    }
};

create = function () {
    var subscribers, current, NOEVENT, instance;

    NOEVENT = {};
    current = NOEVENT;
    subscribers = [];

    instance = Object.create(proto);
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