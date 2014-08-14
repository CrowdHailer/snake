'use strict';

describe('Stream', function () {
    var Stream, dummy, each;

    beforeEach(function () {
        Stream = require('../../src/stream');
        each = require('../../src/each');
        dummy = jasmine.createSpy();
    });

    describe('creating a raw stream', function () {
        var stream, pebble;

        beforeEach(function () {
            stream = Stream.create();
            pebble = {};
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

        it('should return an unsubscribe function', function () {
            var remove = stream.forEach(dummy);
            remove();
            stream.launch(pebble);
            expect(dummy).not.toHaveBeenCalled();
        });

        it('should be able to subscribe with functional each', function () {
            each(dummy, stream);
            stream.launch(pebble);
            expect(dummy).toHaveBeenCalledWith(pebble);
        });

        it('should return an unsubscribe function from functional signup', function () {
            var remove = each(dummy, stream);
            remove();
            stream.launch(pebble);
            expect(dummy).not.toHaveBeenCalled();
        });
    });
});