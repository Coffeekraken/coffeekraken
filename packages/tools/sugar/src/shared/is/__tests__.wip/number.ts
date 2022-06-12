module.exports = (__testFn) => {
    describe('sugar.shared.is.number', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn(12)).toBe(true);
        });
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn({ hello: 'world' })).toBe(false);
        });
    });
};
