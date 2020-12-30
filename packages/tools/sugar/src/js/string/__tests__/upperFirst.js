"use strict";
module.exports = function (__upperFirst) {
    describe('sugar.js.string.upperFirst', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__upperFirst('hello world')).toBe('Hello world');
            done();
        });
    });
};
//# sourceMappingURL=upperFirst.js.map