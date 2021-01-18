"use strict";
module.exports = function (__trimLines) {
    describe('sugar.js.string.trimLines', function () {
        it('Should trim the lines correctly', function (done) {
            var string = "Something\n      So cool\nSo cool\n                  a\nYes";
            expect(__trimLines(string, {
                leftPadding: 2
            })).toBe("  Something\n  So cool\n  So cool\n  a\n  Yes");
            done();
        });
    });
};
//# sourceMappingURL=trimLines.js.map