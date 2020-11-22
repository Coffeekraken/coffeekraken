"use strict";
module.exports = (__autoCast) => {
    describe('sugar.js.string.autoCast', () => {
        it('Should process the passed string correctly', done => {
            expect(__autoCast('10')).toBe(10);
            expect(__autoCast('{hello:"world"}')).toEqual({
                hello: 'world'
            });
            done();
        });
    });
};
