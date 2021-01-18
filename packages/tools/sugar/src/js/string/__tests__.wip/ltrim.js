"use strict";
module.exports = function (__ltrim) {
    describe('sugar.js.string.ltrim', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__ltrim('HELLO WORLD', 'HELLO')).toBe('WORLD');
            done();
        });
    });
};
//# sourceMappingURL=ltrim.js.map