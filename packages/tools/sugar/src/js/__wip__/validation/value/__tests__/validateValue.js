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
//# sourceMappingURL=validateValue.js.map