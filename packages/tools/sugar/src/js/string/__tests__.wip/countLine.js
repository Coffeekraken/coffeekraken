"use strict";
module.exports = function (__countLine) {
    describe('sugar.js.string.countLine', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__countLine('<span>hello</span> world')).toBe(11);
            done();
        });
    });
};
//# sourceMappingURL=countLine.js.map