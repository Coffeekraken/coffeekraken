"use strict";
const __path = require('path');
/**
 * @TODO            more tests
 */
module.exports = (__validateValue) => {
    describe('sugar.js.validation.value.validateValue', () => {
        it('Should validate the passed value correctly', () => {
            expect(__validateValue('hello', {
                type: 'Boolean',
                required: true
            })).toBe(true);
        });
    });
};
