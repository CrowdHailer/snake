// TODO switch seed and aggregator, curry and make seed optional, MAYBE?

'use strict';

module.exports = function (seed, aggregator, collection) {
    return collection.reduce(aggregator, seed);
};