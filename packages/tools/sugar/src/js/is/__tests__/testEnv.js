"use strict";
module.exports = (__isTestEnv) => {
    describe('sugar.js.is.testEnv', () => {
        it('Should detect that we are in a test environment', () => {
            expect(__isTestEnv()).toBe(true);
        });
    });
};
