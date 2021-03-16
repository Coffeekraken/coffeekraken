"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.browser', function () {
        it('Should detect that this script is running inside node and not in the browser', function () {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=browser.js.map