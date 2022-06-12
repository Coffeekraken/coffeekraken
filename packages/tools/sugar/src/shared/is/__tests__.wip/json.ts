module.exports = (__testFn) => {
    describe('sugar.shared.is.json', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn('{"name":"John","age":30,"city":"New York"}')).toBe(
                true,
            );
        });
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn('something')).toBe(false);
        });
    });
};
