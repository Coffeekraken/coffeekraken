module.exports = (__isGlob) => {
    describe('sugar.shared.is.glob', () => {
        it('Should detect the passed to be a valid glob', () => {
            expect(__isGlob('somthere/**/*.js')).toBe(true);
        });
    });
};
