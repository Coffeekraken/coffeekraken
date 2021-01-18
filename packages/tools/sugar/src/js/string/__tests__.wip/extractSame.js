"use strict";
module.exports = function (__extractSame) {
    describe('sugar.js.string.extractSame', function () {
        it('Should process the passed string correctly', function (done) {
            var res = __extractSame("Hello world how are you?", "Hello world it's me", false);
            expect(res).toBe('Hello world ');
            done();
        });
    });
};
//# sourceMappingURL=extractSame.js.map