'use strict';

describe('Cleave', function () {
    var cleave;

    beforeEach(function () {
        cleave = require('../../src/cleave');
    });

    describe('for Arrays', function () {
        it('should split an array', function () {
            var array = [1, 2, 3];
            expect(cleave(2, array)).toEqual({head: [1, 2], tail: [3]});
        });

        it('should take index larger than array length', function () {
            var array = [1, 2, 3];
            expect(cleave(5, array)).toEqual({head: [1, 2, 3], tail: []});
        });
    });
});