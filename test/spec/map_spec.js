'use strict';

describe('Map', function () {
    var map, action, result;

    beforeEach(function () {
        map = require('../../src/map');
        action = function (x) {
            return x * 2;
        }
    });

    describe('for Arrays', function () {
        it('should map all elements to new array', function () {
            var array = [4, 2];
            result = map(action, array)
            expect(result).toEqual([8, 4])
        });
    });
});