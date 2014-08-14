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

        it('should not call new subscribers without an event', function () {
            stream.forEach(dummy);
            expect(dummy).not.toHaveBeenCalled();
        });

        it('should call new subscribers with previous event', function () {
            stream.launch(pebble);
            stream.forEach(dummy);
            expect(dummy).toHaveBeenCalledWith(pebble);
        });
    });
});