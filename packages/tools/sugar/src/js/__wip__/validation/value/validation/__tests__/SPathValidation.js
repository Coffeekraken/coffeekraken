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
    var __path = require('path');
    module.exports = function (__SPathValidation) {
        describe('sugar.js.validation.value.validation.SPathValidation', function () {
            it('Should validate the passed value correctly', function () {
                expect(__SPathValidation.apply('hello/world', false)).toBe(true);
                expect(__SPathValidation.apply("" + __path.resolve(__dirname, 'SPathValidation.js'), true)).toBe(true);
                expect(__SPathValidation.apply("" + __path.resolve(__dirname, 'SomethingThatNotExists.js'), true)).toBe("This value must be a valid <yellow>path</yellow and you've passed \"<red>src/js/validation/value/validation/__tests__/SomethingThatNotExists.js\"</red>");
            });
        });
    };
});
//# sourceMappingURL=module.js.map