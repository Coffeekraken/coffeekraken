module.exports = (__unquote) => {
    describe('sugar.js.string.unquote', () => {
        it('Should process the passed string correctly', done => {
            expect(__unquote('"Hello world"')).toBe('Hello world');
            expect(__unquote("'Hello world'")).toBe('Hello world');
            expect(__unquote("”Hello world”")).toBe('Hello world');
            expect(__unquote("`Hello world`")).toBe('Hello world');
            done();
        });
    });
};
