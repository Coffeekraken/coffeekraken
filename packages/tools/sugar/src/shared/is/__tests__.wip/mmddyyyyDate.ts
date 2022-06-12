module.exports = (__testFn) => {
    describe('sugar.shared.is.mmddyyyyDate', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn('02.15.2020')).toBe(true);
        });
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn('40.20.2090')).toBe(false);
        });
    });
};
