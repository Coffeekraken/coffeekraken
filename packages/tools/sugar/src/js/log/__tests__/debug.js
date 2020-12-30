"use strict";
module.exports = function (__debug) {
    describe('sugar.js.log.debug', function () {
        var promises = [];
        promises.push(__debug('Hello world'));
        it('Should have resolved the 1 debug promise correctly', function (done) {
            Promise.all(promises).then(function (c) {
                expect(c.length).toBe(1);
                done();
            });
        });
    });
};
//# sourceMappingURL=debug.js.map