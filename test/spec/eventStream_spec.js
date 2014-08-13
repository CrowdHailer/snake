'use strict';

var eventStream;

beforeEach(function () {
    eventStream = require('../../src/eventStream');
});

describe('Creating a generic event Stream', function () {
    var stream, dummy;
    beforeEach(function () {
        dummy = jasmine.createSpy('dummy');
    });

    it('subscribers should be called with current value', function () {
        stream = eventStream.create();
        stream.subscribe(dummy);
        expect(dummy).toHaveBeenCalledWith(undefined);
    });

    it('should pass new values to subscriber', function () {
        stream = eventStream.create();
        stream.subscribe(dummy);
        dummy.calls.reset();
        var DATA = {};
        stream.push(DATA);
        expect(dummy).toHaveBeenCalledWith(DATA);
    });

    it('should accept a start value', function () {
        var INITIAL = {};
        stream = eventStream.create({startValue: INITIAL});
        stream.subscribe(dummy);
        expect(dummy).toHaveBeenCalledWith(INITIAL);
    });

    it('should pass the latest data on subscription', function () {
        stream = eventStream.create();
        var DATA = {};
        stream.push(DATA);
        stream.subscribe(dummy);
        expect(dummy).toHaveBeenCalledWith(DATA);
    });

    it('should have multiple subscribers', function () {
        stream = eventStream.create();
        var dummy2 = jasmine.createSpy('dummy2'),
            DATA = {};
        stream.subscribe(dummy);
        stream.subscribe(dummy2);
        stream.push(DATA);
        expect(dummy).toHaveBeenCalledWith(DATA);
        expect(dummy2).toHaveBeenCalledWith(DATA);
    });
});

describe('unsubscribing from an event Stream', function () {
    var stream, dummy;
    beforeEach(function () {
        dummy = jasmine.createSpy('dummy');
    });

    it('should return a call to unsubscribe', function () {
        stream = eventStream.create();
        var unsubscribe = stream.subscribe(dummy),
            DATA = {};
        unsubscribe();
        stream.push(DATA);
        expect(dummy).not.toHaveBeenCalledWith(DATA);
    });

    it('should unsubscribe only once', function () {
        stream = eventStream.create();
        var dummy2 = jasmine.createSpy('dummy2'),
            unsubscribe = stream.subscribe(dummy),
            DATA = {};
        stream.subscribe(dummy2);
        unsubscribe();
        unsubscribe();
        dummy2.calls.reset();
        stream.push(DATA);
        expect(dummy).not.toHaveBeenCalledWith(DATA);
        expect(dummy2).toHaveBeenCalledWith(DATA);
    });
});