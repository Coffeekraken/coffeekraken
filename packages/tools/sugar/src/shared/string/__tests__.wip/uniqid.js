"use strict";
module.exports = function (__uniqid) {
    describe('sugar.js.string.uniqid', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__uniqid().length).toBeGreaterThan(8);
            expect(__uniqid().length).toBeGreaterThan(8);
            done();
        });
    });
};
//# sourceMappingURL=uniqid.js.map