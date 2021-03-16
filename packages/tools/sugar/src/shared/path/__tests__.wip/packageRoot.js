"use strict";
module.exports = function (__packageRoot) {
    describe('sugar.js.path.packageRoot', function () {
        it('Should return the package root path correctly', function () {
            expect(__packageRoot()).not.toBe('');
        });
    });
};
//# sourceMappingURL=packageRoot.js.map