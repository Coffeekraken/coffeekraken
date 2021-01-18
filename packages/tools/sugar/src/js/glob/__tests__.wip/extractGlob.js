"use strict";
module.exports = function (__extractGlob) {
    describe('sugar.js.glob.extractGlob', function () {
        it('Should extract none glob part correctly', function () {
            expect(__extractGlob('/Users/olivierbossel/data/web/coffeekraken/coffeekraken/toolkits/sugar/src/js/**/*.js')).toBe('**/*.js');
        });
    });
};
//# sourceMappingURL=extractGlob.js.map