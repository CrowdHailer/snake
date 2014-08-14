'use strict';


describe('Each', function () {
    var each, dummy;

    beforeEach(function () {
        each = require('../../src/each');
        dummy = jasmine.createSpy();
    });

    describe('for Arrays', function () {
        it('should call the operation with every element', function () {
            var array = [4, 2]
            each(dummy, array);
            expect(dummy.calls.allArgs()).toEqual([[4, 0, array], [2, 1, array]]);
        });

        it('should not call the operation for an empty array', function () {
            each(dummy, []);
            expect(dummy).not.toHaveBeenCalled();
        });
    });

    describe('for Objects', function () {
        it('should call the operation with every value and key in an object', function () {
            var obj = {x: 4, y: 2}
            each(dummy, obj);
            expect(dummy.calls.allArgs()).toEqual([[4, 'x', obj], [2, 'y', obj]]);
        });

        it('should not call the operation for an empty object', function () {
            each(dummy, {});
            expect(dummy).not.toHaveBeenCalled();
        });
    });

    describe('for Strings', function () {
        it('should call the operation with every charachter', function () {
            var str = 'ab'
            each(dummy, str);
            expect(dummy.calls.allArgs()).toEqual([['a', 0, str], ['b', 1, str]])
        });

        it('should not call the operation for an empty string', function () {
            each(dummy, '')
            expect(dummy).not.toHaveBeenCalled();
        })
    })

    describe('curried', function () {
        it('should take arguments in a curried fashion', function () {
            var array = [4, 2]
            each(dummy)(array);
            expect(dummy.calls.allArgs()).toEqual([[4, 0, array], [2, 1, array]]);
        })
    });
});