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
            var stream2 = stream1.reduce(0, add);
            stream2.forEach(dummy);
            stream1.launch(1);
            dummy.calls.reset();
            stream1.launch(2);
            expect(dummy).toHaveBeenCalledWith(3);
        });
    });
});