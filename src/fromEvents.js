var Stream = require('./stream');
var bean = require('bean');

module.exports = function (eventName, element) {
    var stream = Stream.create();
    bean.on(element, eventName, stream.launch);

    return stream;
};