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
});