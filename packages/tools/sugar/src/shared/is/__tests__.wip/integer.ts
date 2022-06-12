module.exports = (__testFn) => {
    describe('sugar.shared.is.integer', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(10)).toBe(true);
        });
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(10.2)).toBe(false);
        });
    });
};
