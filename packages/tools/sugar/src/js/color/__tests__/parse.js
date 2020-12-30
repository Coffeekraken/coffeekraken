"use strict";
module.exports = function (__parse) {
    describe('sugar.js.color.parse', function () {
        it('Should parse the string #ff00ff to rgba object correctly', function () {
            expect(__parse('#ff00ff', 'rgba')).toEqual({
                r: 255, g: 0, b: 255, a: 1
            });
        });
        it('Should parse the string hsl(300,100,50) to rgba object correctly', function () {
            expect(__parse('hsl(300,100,50)', 'rgba')).toEqual({
                r: 255, g: 0, b: 255, a: 1
            });
        });
        it('Should parse the string hsv(300,100,100) to rgba object correctly', function () {
            expect(__parse('hsv(300,100,100)', 'rgba')).toEqual({
                r: 255, g: 0, b: 255, a: 1
            });
        });
    });
};
//# sourceMappingURL=parse.js.map