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

    describe('for Objects', function () {
        it('should filter passing values to a new array', function () {
            var obj = {x: -1, y: 1};
            result = filter(positive, obj);
            expect(result).toEqual({y: 1});
        });

        it('should call the operation with every value and key in an object', function () {
            var obj = {x: -1, y: 1};
            filter(dummy, obj);
            expect(dummy.calls.allArgs()).toEqual([[-1, 'x', obj], [1, 'y', obj]]);
        });
    });

    // TODO strings

    describe('General features', function () {
        it('should take arguments curried', function () {
            var array = [-1, 1];
            expect(filter(positive)(array)).toEqual([1])
        });
    });
});