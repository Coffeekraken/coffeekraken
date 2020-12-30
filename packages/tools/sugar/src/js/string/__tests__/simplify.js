"use strict";
module.exports = function (__simplify) {
    describe('sugar.js.string.simplify', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__simplify('-éàddö_')).toBe('eaddo');
            done();
        });
    });
};
//# sourceMappingURL=simplify.js.map