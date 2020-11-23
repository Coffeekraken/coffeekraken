module.exports = (__testFn) => {
    describe('sugar.js.is.js', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
