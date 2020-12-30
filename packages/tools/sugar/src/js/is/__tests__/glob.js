"use strict";
module.exports = function (__isGlob) {
    describe('sugar.js.is.glob', function () {
        it('Should detect the passed to be a valid glob', function () {
            expect(__isGlob('somthere/**/*.js')).toBe(true);
        });
    });
};
//# sourceMappingURL=glob.js.map