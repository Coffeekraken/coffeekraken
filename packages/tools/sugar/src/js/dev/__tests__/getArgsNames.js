"use strict";
module.exports = function (__getArgsNames) {
    describe('sugar.js.dev.getArgsNames', function () {
        it('Should get the args names correctly', function () {
            function hello(param1, world2, youhou) {
                if (youhou === void 0) { youhou = 10; }
            }
            var args = __getArgsNames(hello);
            expect(args).toEqual(['param1', 'world2', 'youhou']);
        });
    });
};
//# sourceMappingURL=getArgsNames.js.map