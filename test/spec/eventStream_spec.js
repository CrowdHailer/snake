var eventStream;

beforeEach(function () {
    eventStream = require('../../src/eventStream');
});

describe('Creating a generic event Stream', function () {
    it('subscribers should be called with current value', function () {
        var stream = eventStream.create();
        var dummy = jasmine.createSpy('dummy');
        stream.subscribe(dummy);
        expect(dummy).toHaveBeenCalledWith(undefined);
    });

    it('should pass new values to subscriber', function () {
        var stream = eventStream.create();
        var dummy = jasmine.createSpy('dummy');
        stream.subscribe(dummy);
        dummy.calls.reset();
        var DATA = {};
        stream.push(DATA);
        expect(dummy).toHaveBeenCalledWith(DATA);
    });

    it('should accept a start value', function () {
        var INITIAL = {};
        var stream = eventStream.create({startValue: INITIAL});
        var dummy = jasmine.createSpy('dummy');
        stream.subscribe(dummy);
        expect(dummy).toHaveBeenCalledWith(INITIAL);
    });

    it('should pass the latest data on subscription', function () {
        var stream = eventStream.create();
        var dummy = jasmine.createSpy('dummy');
        var DATA = {};
        stream.push(DATA);
        stream.subscribe(dummy);
        expect(dummy).toHaveBeenCalledWith(DATA);
    });

    it('should have multiple subscribers', function () {
        var stream = eventStream.create();
        var dummy = jasmine.createSpy('dummy');
        var dummy2 = jasmine.createSpy('dummy2');
        var DATA = {};
        stream.subscribe(dummy);
        stream.subscribe(dummy2);
        stream.push(DATA);
        expect(dummy).toHaveBeenCalledWith(DATA); 
        expect(dummy2).toHaveBeenCalledWith(DATA); 
    });
});

describe('unsubscribing from an event Stream', function () {
    it('should return a call to unsubscribe', function () {
        var stream = eventStream.create();
        var dummy = jasmine.createSpy('dummy');
        unsubscribe = stream.subscribe(dummy);
        unsubscribe();
        var DATA = {};
        stream.push(DATA);
        expect(dummy).not.toHaveBeenCalledWith(DATA);
    });

    it('should unsubscribe only once', function () {
        var stream = eventStream.create();
        var dummy = jasmine.createSpy('dummy');
        var dummy2 = jasmine.createSpy('dummy2');
        unsubscribe = stream.subscribe(dummy);
        stream.subscribe(dummy2);
        unsubscribe();
        unsubscribe();
        var DATA = {};
        dummy2.calls.reset();
        stream.push(DATA);
        expect(dummy).not.toHaveBeenCalledWith(DATA);
        expect(dummy2).toHaveBeenCalledWith(DATA);
    });
});