"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.noisyProcess', function () {
        it('Should detect if the process is a noisy one correctly', function () {
            expect(__testFn()).toBe(false);
        });
    });
};
//# sourceMappingURL=noisyProcess.js.map