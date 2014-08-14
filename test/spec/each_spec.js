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
            each(dummy, {x: 4, y: 2});
            expect(dummy.calls.allArgs()).toEqual([[4, 'x'], [2, 'y']]);
        });

        it('should not call the operation for an empty object', function () {
            each(dummy, {});
            expect(dummy).not.toHaveBeenCalled();
        });
    });
});