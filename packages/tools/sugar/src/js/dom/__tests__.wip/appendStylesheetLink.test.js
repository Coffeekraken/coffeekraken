"use strict";
var __appendStylesheetLink = require('../appendStylesheetLink');
describe('sugar.js.dom.appendStylesheetLink', function () {
    __appendStylesheetLink('hello.css');
    it('Should append the style link correctly', function () {
        var $elm = document.querySelector('style');
        expect(typeof $elm).toBe('object');
    });
});
//# sourceMappingURL=appendStylesheetLink.test.js.map