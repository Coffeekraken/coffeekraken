module.exports = (__testFn) => {
    describe('sugar.shared.is.email', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn('olivier.bossel@gmail.com')).toBe(true);
        });
    });
};
