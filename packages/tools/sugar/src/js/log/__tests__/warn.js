"use strict";
module.exports = function (__warn) {
    describe('sugar.js.log.warn', function () {
        var promises = [];
        promises.push(__warn('Hello world'));
        it('Should have resolved the 1 warn promise correctly', function (done) {
            Promise.all(promises).then(function (c) {
                expect(c.length).toBe(1);
                done();
            });
        });
    });
};
//# sourceMappingURL=warn.js.map