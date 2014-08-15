'use strict';

describe('Reducing Stream', function () {
    var Stream, stream1, add, dummy, reduce;

    beforeEach(function () {
        Stream = require('../../src/stream');
        add = function (memo, last) { return memo + last; };
        reduce = require('../../src/reduce');

        stream1 = Stream.create();
        dummy = jasmine.createSpy();
    });

    describe('Starting with initial value', function () {
        it('should add events to a running total', function () {
            var stream2 = stream1.reduce(add, 0);
            stream2.forEach(dummy);
            stream1.launch(1);
            dummy.calls.reset();
            stream1.launch(2);
            expect(dummy).toHaveBeenCalledWith(3);
        });

        it('should pass the seed value onto the spawned stream', function () {
            var stream2 = stream1.reduce(add, 0);
            stream2.forEach(dummy);
            expect(dummy).toHaveBeenCalledWith(0);
        });
    });

    describe('functional application', function () {
        it('should accept all arguments together', function () {
            reduce(0, add, stream1).forEach(dummy);
            expect(dummy).toHaveBeenCalledWith(0);
        });
    });
});