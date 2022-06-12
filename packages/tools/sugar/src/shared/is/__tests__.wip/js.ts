module.exports = (__testFn) => {
    describe('sugar.shared.is.js', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
