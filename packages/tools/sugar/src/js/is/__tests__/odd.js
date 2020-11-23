module.exports = (__testFn) => {
    describe('sugar.js.is.odd', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(1)).toBe(true);
            expect(__testFn(2)).toBe(false);
        });
    });
};
