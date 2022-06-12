module.exports = (__testFn) => {
    describe('sugar.shared.is.boolean', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(false)).toBe(true);
        });
    });
};
