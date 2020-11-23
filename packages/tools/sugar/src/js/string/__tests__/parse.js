module.exports = (__parse) => {
    describe('sugar.js.string.parse', () => {
        it('Should process the passed string correctly', done => {
            expect(__parse('199')).toBe(199);
            done();
        });
    });
};
