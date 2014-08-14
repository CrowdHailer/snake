'use strict';

describe('From Events', function () {
    var Stream, dummy, each, $, sandbox, element, bean, pebble;

    beforeEach(function () {
        Stream = require('../../src/fromEvents');
        each = require('../../src/each');
        dummy = jasmine.createSpy();
        $ = document.querySelector.bind(document);
        sandbox = $('#sandbox');
        sandbox.innerHTML = '<div id="test"></div>'
        element = $('#test');
        bean = require('bean');
        pebble = {};
    });

    describe('watching an element for events', function () {
        var stream;

        it('should pass all events to subscribers', function () {
            stream = Stream.fromEvents('click', element);
            each(dummy, stream);
            bean.fire(element, 'click', pebble)
            expect(dummy).toHaveBeenCalledWith(pebble);
        });

        it('should pass last event to new subscribers', function () {
            stream = Stream.fromEvents('click', element);
            bean.fire(element, 'click', pebble)
            each(dummy, stream);
            expect(dummy).toHaveBeenCalledWith(pebble);
        });
    });
});