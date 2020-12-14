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
    module.exports = function (__STypeValidation) {
        describe('sugar.js.validation.value.validation.STypeValidation', function () {
            it('Should validate the passed value correctly', function () {
                expect(__STypeValidation.apply('oco', 'Boolean')).toBe("This value has to be of type <yellow>Boolean</yellow> and you've passed \"<red>oco\"</red> which is of type \"<red>String</red>\"");
                expect(__STypeValidation.apply('oco', 'String')).toBe(true);
            });
        });
    };
});
//# sourceMappingURL=module.js.map