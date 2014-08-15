// TODO ability to return stream to no event state
// TODO timeout for events in stream
// TODO Add function only once
// TODO kill method to remove events and embeded listeners
// TODO pause method to stop events emitting
// TODO check spawned processes signup procedure
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
    },
    take: function (capacity) {
        var spawned = create(),
            slidingWindow = [];
        this.forEach(function (data) {
            slidingWindow.push(data);
            if (slidingWindow.length > capacity) {
                slidingWindow.shift();
            }
            spawned.launch(slidingWindow);
        });
        return spawned;
    },
    tail: function (capacity) {
        var spawned = create(),
            buffer = [];
        this.forEach(function (data) {
            buffer.push(data);
            if (buffer.length > capacity) {
                spawned.launch(buffer.shift());
            }
        });
        return spawned;
    },
    reduce: function (aggregator, seed) {
        var spawned = create();
        var memo = seed;
        spawned.launch(seed);
        this.forEach(function (data) {
            memo = aggregator(memo, data);
            spawned.launch(memo)
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