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
    var __insertAfter = require('../insertAfter');
    describe('sugar.js.dom.insertAfter', function () {
        document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var $add = document.createElement('a');
        __insertAfter($add, $elm);
        it('Should append the new element tag correctly', function () {
            expect($elm.nextSibling).toEqual($add);
        });
    });
});
//# sourceMappingURL=module.js.map