(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __appendStylesheetLink = require('../appendStylesheetLink');
    describe('sugar.js.dom.appendStylesheetLink', function () {
        __appendStylesheetLink('hello.css');
        it('Should append the style link correctly', function () {
            var $elm = document.querySelector('style');
            expect(typeof $elm).toBe('object');
        });
    });
});
//# sourceMappingURL=module.js.map