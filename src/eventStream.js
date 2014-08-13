exports.create = function (options) {
    options = options || {};
    var subscribers = [];
    var value = options.startValue;

    prototype = {
        subscribe: function (subscriber) {
            subscribers.push(subscriber);
            subscriber(value);
            return function () {
                var index = subscribers.indexOf(subscriber);
                if (index > -1) {
                    subscribers.splice(index, 1);
                }
            };
        }, 
        push: function (data) {
            value = data;
            if (subscribers.length) {
                subscribers.forEach(function (subscriber) {
                    subscriber(data);
                });
            }
        }
    };

    return Object.create(prototype);
};