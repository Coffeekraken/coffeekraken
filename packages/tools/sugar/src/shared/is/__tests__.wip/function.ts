module.exports = (__testFn) => {
    describe('sugar.shared.is.function', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(function () {})).toBe(true);
        });
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(() => {})).toBe(true);
        });
    });
};
