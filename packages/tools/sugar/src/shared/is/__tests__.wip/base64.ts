module.exports = (__testFn) => {
    describe('sugar.shared.is.base64', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn('c29tZXRoaW5nIGNvb2w=')).toBe(true);
        });
    });
};
