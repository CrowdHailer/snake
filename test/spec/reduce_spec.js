'use strict';

describe('Reduce', function () {
    var reduce, dummy, result;

    beforeEach(function () {
        reduce = require('../../src/reduce');
        dummy = jasmine.createSpy().and.callFake(function (total, item) {
            return total + item;
        });
    });

    xdescribe('for Arrays', function () {
        it('should reduce an array', function () {
            var array = [4, 2];
            result = reduce(0, dummy, array);
            expect(result).toEqual(6);
        });

        it('should call the action with seed, element, index and array', function () {
            var array = [4, 2];
            reduce(0, dummy, array);
            expect(dummy.calls.allArgs()).toEqual([[0, 4, 0, array], [4, 2, 1, array]]);
        });
    });
});