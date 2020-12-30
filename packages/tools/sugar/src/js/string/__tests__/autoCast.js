"use strict";
module.exports = function (__autoCast) {
    describe('sugar.js.string.autoCast', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__autoCast('10')).toBe(10);
            expect(__autoCast('{hello:"world"}')).toEqual({
                hello: 'world'
            });
            done();
        });
    });
};
//# sourceMappingURL=autoCast.js.map