"use strict";
module.exports = function (__uncamelize) {
    describe('sugar.js.string.uncamelize', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__uncamelize('helloWorldAndUniverse')).toBe('hello-world-and-universe');
            expect(__uncamelize('helloWorldAndUniverse', '.')).toBe('hello.world.and.universe');
            done();
        });
    });
};
//# sourceMappingURL=uncamelize.js.map