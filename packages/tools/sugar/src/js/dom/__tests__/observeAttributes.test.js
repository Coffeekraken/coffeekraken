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
    var __observeAttributes = require('../observeAttributes');
    describe('sugar.js.dom.observeAttributes', function () {
        document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var isMutated = false;
        __observeAttributes($elm).then(function (mutation) {
            isMutated = true;
        });
        $elm.setAttribute('hello', 'world');
        it('Should observe the attributes updates correctly', function () {
            setTimeout(function () {
                expect(isMutated).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=module.js.map