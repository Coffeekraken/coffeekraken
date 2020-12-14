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
    /**
     * @TODO            more tests
     */
    module.exports = function (__validateValue) {
        describe('sugar.js.validation.value.validateValue', function () {
            it('Should validate the passed value correctly', function () {
                expect(__validateValue('hello', {
                    type: 'Boolean',
                    required: true
                })).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map