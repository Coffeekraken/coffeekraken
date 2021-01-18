"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.json', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('{"name":"John","age":30,"city":"New York"}')).toBe(true);
        });
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('something')).toBe(false);
        });
    });
};
//# sourceMappingURL=json.js.map