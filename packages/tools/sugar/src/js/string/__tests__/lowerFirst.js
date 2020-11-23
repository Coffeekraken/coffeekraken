module.exports = (__lowerFirst) => {
    describe('sugar.js.string.lowerFirst', () => {
        it('Should process the passed string correctly', done => {
            expect(__lowerFirst('HELLO WORLD')).toBe('hELLO WORLD');
            done();
        });
    });
};
