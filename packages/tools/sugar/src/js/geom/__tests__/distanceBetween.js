"use strict";
module.exports = function (__distanceBetween) {
    describe('sugar.js.geom.distanceBetween', function () {
        var res = __distanceBetween({
            x: 20, y: 10
        }, {
            x: 10, y: 20
        });
        it('Should constrain the passed point correctly', function () {
            expect(res).toBe(14.142135623730951);
        });
    });
};
//# sourceMappingURL=distanceBetween.js.map