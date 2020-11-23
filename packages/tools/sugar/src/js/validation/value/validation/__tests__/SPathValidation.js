const __path = require('path');
module.exports = (__SPathValidation) => {
    describe('sugar.js.validation.value.validation.SPathValidation', () => {
        it('Should validate the passed value correctly', () => {
            expect(__SPathValidation.apply('hello/world', false)).toBe(true);
            expect(__SPathValidation.apply(`${__path.resolve(__dirname, 'SPathValidation.js')}`, true)).toBe(true);
            expect(__SPathValidation.apply(`${__path.resolve(__dirname, 'SomethingThatNotExists.js')}`, true)).toBe(`This value must be a valid <yellow>path</yellow and you've passed \"<red>src/js/validation/value/validation/__tests__/SomethingThatNotExists.js\"</red>`);
        });
    });
};
