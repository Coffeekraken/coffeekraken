"use strict";
module.exports = (__testFn) => {
    describe('sugar.js.is.noisyProcess', () => {
        it('Should detect if the process is a noisy one correctly', () => {
            expect(__testFn()).toBe(false);
        });
    });
};
