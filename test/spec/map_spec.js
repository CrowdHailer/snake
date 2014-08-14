'use strict';

describe('Map', function () {
    var map, dummy, result;

    beforeEach(function () {
        map = require('../../src/map');
        dummy = jasmine.createSpy().and.returnValue(1)
    });

    describe('for Arrays', function () {
        it('should map all elements to new array', function () {
            var array = [4, 2];
            result = map(dummy, array)
            expect(result).toEqual([1, 1])
        });

        it('should call the action with element, index and array', function () {
            var array = [4, 2];
            map(dummy, array)
            expect(dummy.calls.allArgs()).toEqual([[4, 0, array], [2, 1, array]])
        });
    });
});