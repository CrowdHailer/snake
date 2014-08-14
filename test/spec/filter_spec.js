'use strict';

describe('Filter', function () {
    var filter, dummy, result, positive;

    beforeEach(function () {
        filter = require('../../src/filter');
        positive = function (n) { return n >= 0; }
        dummy = jasmine.createSpy();
    });

    describe('for Arrays', function () {
        it('should filter an array', function () {
            var array = [-1, 1];
            expect(filter(positive, array)).toEqual([1])
        })

        it('should call the action with element, index and array', function () {
            var array = [-1, 1];
            filter(dummy, array);
            expect(dummy.calls.allArgs()).toEqual([[-1, 0, array], [1, 1, array]]);
        });
    });
});