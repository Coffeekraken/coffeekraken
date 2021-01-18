"use strict";
module.exports = function (__lowerFirst) {
    describe('sugar.js.string.lowerFirst', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__lowerFirst('HELLO WORLD')).toBe('hELLO WORLD');
            done();
        });
    });
};
//# sourceMappingURL=lowerFirst.js.map