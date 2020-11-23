module.exports = (__log) => {
    describe('sugar.js.log.log', () => {
        const promises = [];
        promises.push(__log('Hello world'));
        it('Should have resolved the 1 log promise correctly', done => {
            Promise.all(promises).then((c) => {
                expect(c.length).toBe(1);
                done();
            });
        });
    });
};
