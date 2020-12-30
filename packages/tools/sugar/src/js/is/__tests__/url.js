"use strict";
module.exports = function (__testFn) {
    describe('sugar.js.is.url', function () {
        it('Should detect the passed variable type correctly', function () {
            expect(__testFn('http://google.com')).toBe(true);
            expect(__testFn('https://google.com/something')).toBe(true);
            expect(__testFn('http://google.com?hello=world#coco')).toBe(true);
        });
    });
};
//# sourceMappingURL=url.js.map