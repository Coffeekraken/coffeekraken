"use strict";
module.exports = (__warn) => {
    describe('sugar.js.log.warn', () => {
        const promises = [];
        promises.push(__warn('Hello world'));
        it('Should have resolved the 1 warn promise correctly', done => {
            Promise.all(promises).then((c) => {
                expect(c.length).toBe(1);
                done();
            });
        });
    });
};
