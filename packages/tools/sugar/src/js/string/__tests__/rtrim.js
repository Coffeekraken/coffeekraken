"use strict";
module.exports = (__rtrim) => {
    describe('sugar.js.string.rtrim', () => {
        it('Should process the passed string correctly', done => {
            expect(__rtrim('HELLO WORLD', 'LD')).toBe('HELLO WOR');
            done();
        });
    });
};
