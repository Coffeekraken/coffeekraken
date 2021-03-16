"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.base64', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('c29tZXRoaW5nIGNvb2w=')).toBe(true);
        });
    });
};
//# sourceMappingURL=base64.js.map