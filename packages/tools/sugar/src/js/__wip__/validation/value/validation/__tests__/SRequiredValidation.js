module.exports = function (__SRequiredValidation) {
    describe('sugar.js.validation.value.validation.SRequiredValidation', function () {
        it('Should validate the passed value correctly', function () {
            expect(__SRequiredValidation.apply('oco')).toBe(true);
            expect(__SRequiredValidation.apply(null)).toBe('This value is <yellow>required</yellow> and you\'ve passed "<red>null"</red>');
            expect(__SRequiredValidation.apply(undefined)).toBe('This value is <yellow>required</yellow> and you\'ve passed "<red>undefined"</red>');
        });
    });
};
