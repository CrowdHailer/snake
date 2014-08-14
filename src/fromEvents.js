// TODO clean up event binding on removing element
'use strict';

var Stream = require('./stream');
var bean = require('bean');

function createStreamFromEvents(eventName, element) {
    var stream = Stream.create();
    bean.on(element, eventName, stream.launch);

    return stream;
}

module.exports = function (eventName, element) {
    if (arguments.length === 2) {
        return createStreamFromEvents(eventName, element);
    }
    return function (element) {
        return createStreamFromEvents(eventName, element);
    };
};