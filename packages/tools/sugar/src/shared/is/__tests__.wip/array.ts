module.exports = (__testFn) => {
    describe('sugar.shared.is.array', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(['hello'])).toBe(true);
        });
    });
};
