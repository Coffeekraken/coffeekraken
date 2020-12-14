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
    var __injectStyle = require('../injectStyle');
    describe('sugar.js.css.injectStyle', function () {
        it('Should inject the string style properly', function () {
            __injectStyle('a { color: red; }');
            expect(document.head.querySelector('style').innerHTML).toBe('a { color: red; }');
        });
    });
});
//# sourceMappingURL=module.js.map