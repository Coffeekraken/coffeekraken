"use strict";
var __injectStyle = require('../injectStyle');
describe('sugar.js.css.injectStyle', function () {
    it('Should inject the string style properly', function () {
        __injectStyle('a { color: red; }');
        expect(document.head.querySelector('style').innerHTML).toBe('a { color: red; }');
    });
});
//# sourceMappingURL=injectStyle.test.js.map