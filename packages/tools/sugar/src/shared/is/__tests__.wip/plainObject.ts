module.exports = (__testFn) => {
    describe('sugar.shared.is.plainObject', () => {
        it('Should detect the passed variable type correctly', () => {
            class myClass {}
            expect(__testFn({ hello: 'world' })).toBe(true);
            expect(__testFn(new myClass())).toBe(false);
        });
    });
};
