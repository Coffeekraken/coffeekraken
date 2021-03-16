"use strict";
module.exports = function (__replaceTokens) {
    describe('sugar.js.string.replaceTokens', function () {
        it('Should replace tokens correctly', function (done) {
            var string = __replaceTokens('hello [world] how [are] you?', {
                world: 'coco',
                are: 'plop'
            });
            expect(string).toBe('hello coco how plop you?');
            done();
        });
    });
};
//# sourceMappingURL=replaceTokens.js.map