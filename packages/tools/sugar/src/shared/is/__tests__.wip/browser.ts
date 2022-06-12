module.exports = (__testFn) => {
    describe('sugar.shared.is.browser', () => {
        it('Should detect that this script is running inside node and not in the browser', () => {
            expect(__testFn()).toBe(true);
        });
    });
};
