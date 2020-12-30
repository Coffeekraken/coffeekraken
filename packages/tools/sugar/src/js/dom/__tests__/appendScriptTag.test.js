"use strict";
var __appendScriptTag = require('../appendScriptTag');
describe('sugar.js.dom.appendScriptTag', function () {
    __appendScriptTag('hello.js');
    it('Should append the script tag correctly', function () {
        var $elm = document.querySelector('script');
        expect(typeof $elm).toBe('object');
    });
});
//# sourceMappingURL=appendScriptTag.test.js.map