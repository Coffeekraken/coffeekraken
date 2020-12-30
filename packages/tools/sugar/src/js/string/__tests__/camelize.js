"use strict";
module.exports = function (__camelize) {
    describe('sugar.js.string.camelize', function () {
        it('Should process the passed string correctly', function (done) {
            expect(__camelize('hello world')).toBe('helloWorld');
            done();
        });
    });
};
//# sourceMappingURL=camelize.js.map