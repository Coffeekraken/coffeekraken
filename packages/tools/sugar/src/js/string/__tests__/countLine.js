module.exports = (__countLine) => {
    describe('sugar.js.string.countLine', () => {
        it('Should process the passed string correctly', done => {
            expect(__countLine('<span>hello</span> world')).toBe(11);
            done();
        });
    });
};
