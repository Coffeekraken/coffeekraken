"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.ddmmyyyy', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('20.12.2018')).toBe(true);
        });
    });
};
//# sourceMappingURL=ddmmyyyyDate.js.map