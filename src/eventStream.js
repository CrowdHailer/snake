exports.create = function (options) {
    options = options || {};
    var subscriber;
    var value = options.startValue;

    prototype = {
        subscribe: function (newSubscriber) {
            subscriber = newSubscriber;
            subscriber(value);
        }, 
        push: function (data) {
            value = data;
            if (subscriber) subscriber(value);
        }
    };

    return Object.create(prototype);
};