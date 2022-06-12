module.exports = (__testFn) => {
    describe('sugar.shared.is.url', () => {
        it('Should detect the passed variable type correctly', () => {
            expect(__testFn('http://google.com')).toBe(true);
            expect(__testFn('https://google.com/something')).toBe(true);
            expect(__testFn('http://google.com?hello=world#coco')).toBe(true);
        });
    });
};
