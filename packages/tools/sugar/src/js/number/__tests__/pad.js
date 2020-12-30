"use strict";
module.exports = function (__pad) {
    describe('sugar.js.number.pad', function () {
        it('Should pad the passed numbers correctly', function () {
            expect(__pad(13, 5)).toBe('00013');
            expect(__pad(13, 5, '#')).toBe('###13');
        });
    });
};
//# sourceMappingURL=pad.js.map