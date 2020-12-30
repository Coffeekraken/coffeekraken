"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.node', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn()).toBe(true);
        });
    });
};
//# sourceMappingURL=node.js.map