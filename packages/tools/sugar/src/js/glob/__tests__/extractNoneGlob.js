"use strict";
module.exports = function (__extractNoneGlob) {
    describe('sugar.js.glob.extractNoneGlob', function () {
        it('Should extract none glob part correctly', function () {
            expect(__extractNoneGlob('/hello/world/**/*.js')).toBe('/hello/world');
        });
    });
};
//# sourceMappingURL=extractNoneGlob.js.map