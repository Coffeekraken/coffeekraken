module.exports = (__testFn) => {
    describe('sugar.shared.is.noisyProcess', () => {
        it('Should detect if the process is a noisy one correctly', () => {
            expect(__testFn()).toBe(false);
        });
    });
};
