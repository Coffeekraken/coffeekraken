"use strict";
module.exports = function (__color, __SColor) {
    // TODO Create more tests for the SColor class
    var color = __color('#ff00ff');
    describe('sugar.js.color.color', function () {
        // it('Should return an instance of the SColor class', () => {
        //   expect(color instanceof __SColor).toBe(true);
        // });
        it('Should return rgba(255,0,255,1) string when using the toString method', function () {
            expect(color.toString()).toBe('#ff00ff');
        });
    });
};
//# sourceMappingURL=color.js.map