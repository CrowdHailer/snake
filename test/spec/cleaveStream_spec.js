'use strict';

describe('Cleaving Stream', function () {
    var Stream, stream1, cleave, dummy;

    beforeEach(function () {
        Stream = require('../../src/stream');
        cleave = require('../../src/cleave');

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

    describe('Tail method', function () {
        it('should pass no events untill buffer full', function () {
            var stream2 = stream1.tail(2);
            stream2.forEach(dummy);
            stream1.launch(1);
            expect(dummy).not.toHaveBeenCalled();
        });

        it('should pass events to offshoot stream after buffer', function () {
            var stream2 = stream1.tail(2);
            stream2.forEach(dummy);
            stream1.launch(1);
            stream1.launch(2);
            stream1.launch(3);
            expect(dummy).toHaveBeenCalledWith(1);
        });
    });

    describe('cleave function', function () {
        it('should pass events to the head stream', function () {
            cleave(2, stream1).head.forEach(dummy);
            stream1.launch(1);
            expect(dummy).toHaveBeenCalledWith([1]);
        });

        it('should pass most recents events to head stream', function () {
            cleave(2, stream1).head.forEach(dummy);
            stream1.launch(1);
            dummy.calls.reset();
            stream1.launch(2);
            expect(dummy).toHaveBeenCalledWith([1, 2]);
        });

        it('should pass at most set capacity', function () {
            cleave(2, stream1).head.forEach(dummy);
            stream1.launch(1);
            stream1.launch(2);
            dummy.calls.reset();
            stream1.launch(3);
            expect(dummy).toHaveBeenCalledWith([2, 3]);
        });

        it('should pass no events to tail untill buffer full', function () {
            cleave(2, stream1).tail.forEach(dummy);
            stream1.launch(1);
            expect(dummy).not.toHaveBeenCalled();
        });

        it('should pass events to tail stream after buffer', function () {
            cleave(2, stream1).tail.forEach(dummy);
            stream1.launch(1);
            stream1.launch(2);
            stream1.launch(3);
            expect(dummy).toHaveBeenCalledWith(1);
        });
    });
});