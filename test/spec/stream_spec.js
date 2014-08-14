'use strict';

describe('Stream', function () {
    var Stream, dummy;

    beforeEach(function () {
        Stream = require('../../src/stream');
        dummy = jasmine.createSpy();
    });

    describe('creating an empty stream', function () {
        var stream, pebble;

        beforeEach(function () {
            stream = Stream.create();
            pebble = {}
        });

        it('should pass events to a subscriber', function () {
            stream.forEach(dummy);
            stream.launch(pebble);
            expect(dummy).toHaveBeenCalledWith(pebble);
        });
    });
});