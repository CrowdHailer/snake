'use strict';

describe('Mapping stream', function () {
    var Stream, stream1, dot, dummy;

    beforeEach(function () {
        Stream = require('../../src/stream');
        dot = require('cumin-dot');
        stream1 = Stream.create();
        dummy = jasmine.createSpy();
    });

    describe('creation by method', function () {
        it('should map all events passing through stream', function () {
            var stream2 = stream1.map(dot('x'))
            stream2.forEach(dummy);
            stream1.launch({x: 1});
            expect(dummy).toHaveBeenCalledWith(1);
        });
    });
});