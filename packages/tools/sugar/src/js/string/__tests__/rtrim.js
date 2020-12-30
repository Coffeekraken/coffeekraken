"use strict";
module.exports = function (__rtrim) {
    describe('sugar.js.string.rtrim', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__rtrim('HELLO WORLD', 'LD')).toBe('HELLO WOR');
            done();
        });
    });
};
//# sourceMappingURL=rtrim.js.map