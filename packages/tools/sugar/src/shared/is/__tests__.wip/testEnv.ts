module.exports = (__isTestEnv) => {
    describe('sugar.shared.is.testEnv', () => {
        it('Should detect that we are in a test environment', () => {
            expect(__isTestEnv()).toBe(true);
        });
    });
};
