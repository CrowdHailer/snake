'use strict';

describe('Filter', function () {
    var filter, dummy, result, positive;

    beforeEach(function () {
        filter = require('../../src/filter');
        positive = function (n) { return n >= 0; }
    });

    describe('for Arrays', function () {
        it('should filter an array', function () {
            var array = [-1, 1];
            expect(filter(positive, array)).toEqual([1])
        })
    });
});