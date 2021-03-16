"use strict";
module.exports = function (__parse) {
    describe('sugar.js.string.parse', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__parse('199')).toBe(199);
            done();
        });
    });
};
//# sourceMappingURL=parse.js.map