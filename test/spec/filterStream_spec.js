'use strict';

describe('Filtering Stream', function () {
    var Stream, stream1, filter, positive, dummy;

    beforeEach(function () {
        Stream = require('../../src/stream');
        filter = require('../../src/filter');
        positive = function (n) { return n >= 0; };

        stream1 = Stream.create();
        dummy = jasmine.createSpy();
    });

    describe('creation by method', function () {
        it('should filter events passing through a stream', function () {
            var stream2 = stream1.filter(positive);
            stream2.forEach(dummy)
            stream1.launch(1);
            stream1.launch(-1);
            expect(dummy).toHaveBeenCalledWith(1);
            expect(dummy).not.toHaveBeenCalledWith(-1);
        })
    });

    describe('creation by function', function () {
        it('should filter events passing the predicate', function () {
            var stream2 = filter(positive, stream1);
            stream2.forEach(dummy)
            stream1.launch(1);
            stream1.launch(-1);
            expect(dummy).toHaveBeenCalledWith(1);
            expect(dummy).not.toHaveBeenCalledWith(-1);
        });
    });
});