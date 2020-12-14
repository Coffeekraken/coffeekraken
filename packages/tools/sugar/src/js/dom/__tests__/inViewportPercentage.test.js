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
    var __inViewportPercentage = require('../inViewportPercentage');
    describe('sugar.js.dom.inViewportPercentage', function () {
        document.body.innerHTML = "\n    <style>\n      #testing {\n        display: block;\n        width: 100px; height: 100px;\n        background: red;\n        position: absolute;\n        top:0; left: -50px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        $elm.getBoundingClientRect = jest.fn(function () { return ({
            x: -50,
            y: 0,
            width: 100,
            height: 100,
            top: 0,
            right: 50,
            bottom: 100,
            left: -50,
        }); });
        var percentage = __inViewportPercentage($elm);
        it('Should get the percentage in the viewport correctly', function () {
            expect(percentage).toBe(50);
        });
    });
});
//# sourceMappingURL=module.js.map