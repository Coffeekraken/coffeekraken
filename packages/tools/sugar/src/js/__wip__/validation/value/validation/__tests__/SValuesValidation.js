"use strict";
module.exports = function (__SValuesValidation) {
    describe('sugar.js.validation.value.validation.SValuesValidation', function () {
        it('Should validate the passed value correctly', function () {
            expect(__SValuesValidation.apply('oco', ['hello', 'world'])).toBe("This value must be one of these \"<green>hello,world</green>\" but you've passed \"<red>oco</red>\"");
            expect(__SValuesValidation.apply('world', ['hello', 'world'])).toBe(true);
        });
    });
};
//# sourceMappingURL=SValuesValidation.js.map