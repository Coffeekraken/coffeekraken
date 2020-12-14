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
    var __appendScriptTag = require('../appendScriptTag');
    describe('sugar.js.dom.appendScriptTag', function () {
        __appendScriptTag('hello.js');
        it('Should append the script tag correctly', function () {
            var $elm = document.querySelector('script');
            expect(typeof $elm).toBe('object');
        });
    });
});
//# sourceMappingURL=module.js.map