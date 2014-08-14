'use strict';

describe('Map', function () {
    var map, dummy, result;

    beforeEach(function () {
        map = require('../../src/map');
        dummy = jasmine.createSpy().and.returnValue(1);
    });

    describe('for Arrays', function () {
        it('should map all elements to new array', function () {
            var array = [4, 2];
            result = map(dummy, array);
            expect(result).toEqual([1, 1]);
        });

        it('should call the action with element, index and array', function () {
            var array = [4, 2];
            map(dummy, array);
            expect(dummy.calls.allArgs()).toEqual([[4, 0, array], [2, 1, array]]);
        });
    });

    describe('for Objects', function () {
        it('should map all values to a new array', function () {
            var obj = {x: 4, y: 2};
            result = map(dummy, obj);
            expect(result).toEqual({x: 1, y: 1});
        });

        it('should call the operation with every value and key in an object', function () {
            var obj = {x: 4, y: 2};
            map(dummy, obj);
            expect(dummy.calls.allArgs()).toEqual([[4, 'x', obj], [2, 'y', obj]]);
        });
    });

    describe('for Strings', function () {
        it('should map all charachters to a new string', function () {
            var str = 'ab';
            result = map(dummy, str);
            expect(result).toEqual('11');
        });

        it('should call the operation with every charachter and location in a string', function () {
            var str = 'ab';
            map(dummy, str);
            expect(dummy.calls.allArgs()).toEqual([['a', 0, str], ['b', 1, str]]);
        });
    });

    describe('General features', function () {
        it('should take arguments in a curried fashion', function () {
            var array = [4, 2];
            result = map(dummy)(array);
            expect(result).toEqual([1, 1]);
        });

        it('should maintain context when calling an array', function () {
            var obj = {};
            map.call(obj, dummy, [4, 2]);
            expect(dummy.calls.mostRecent().object).toBe(obj);
        });

        it('should maintain context when calling an object', function () {
            var obj = {};
            map.call(obj, dummy, {x: 1});
            expect(dummy.calls.mostRecent().object).toBe(obj);
        });

        it('should maintain context when calling string', function () {
            var obj = {};
            map.call(obj, dummy, 'ab');
            expect(dummy.calls.mostRecent().object).toBe(obj);
        });

        it('should maintain context when calling an array, curried', function () {
            var obj = {};
            map(dummy).call(obj, [4, 2]);
            expect(dummy.calls.mostRecent().object).toBe(obj);
        });
    });
});