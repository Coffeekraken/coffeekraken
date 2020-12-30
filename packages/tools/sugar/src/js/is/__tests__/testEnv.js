"use strict";
module.exports = function (__isTestEnv) {
    describe('sugar.js.is.testEnv', function () {
        it('Should detect that we are in a test environment', function () {
            expect(__isTestEnv()).toBe(true);
        });
    });
};
//# sourceMappingURL=testEnv.js.map