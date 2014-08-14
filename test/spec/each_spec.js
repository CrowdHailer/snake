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
    });
});