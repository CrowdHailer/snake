'use strict';

describe('Cleaving Stream', function () {
    var Stream, stream1, dummy;

    beforeEach(function () {
        Stream = require('../../src/stream');

        stream1 = Stream.create();
        dummy = jasmine.createSpy();
    });

    describe('Take method', function () {
        it('should pass events to offshoot in array', function () {
            var stream2 = stream1.take(2);
            stream2.forEach(dummy);
            stream1.launch(1);
            expect(dummy).toHaveBeenCalledWith([1]);
        });

        it('should pass most recents events to offshoot in array', function () {
            var stream2 = stream1.take(2);
            stream2.forEach(dummy);
            stream1.launch(1);
            dummy.calls.reset();
            stream1.launch(2);
            expect(dummy).toHaveBeenCalledWith([1, 2]);
        });

        it('should pass at maximum set capacity', function () {
            var stream2 = stream1.take(2);
            stream2.forEach(dummy);
            stream1.launch(1);
            stream1.launch(2);
            dummy.calls.reset();
            stream1.launch(3);
            expect(dummy).toHaveBeenCalledWith([2, 3]);
        });
    });
});