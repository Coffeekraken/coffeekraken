"use strict";
module.exports = (__upperFirst) => {
    describe('sugar.js.string.upperFirst', () => {
        it('Should process the passed string correctly', done => {
            expect(__upperFirst('hello world')).toBe('Hello world');
            done();
        });
    });
};
