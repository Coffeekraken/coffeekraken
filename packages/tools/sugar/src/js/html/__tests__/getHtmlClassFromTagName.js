"use strict";
module.exports = function (__getHtmlClassFromTagName) {
    describe('sugar.js.string.getHtmlClassFromTagName', function () {
        it('Should get back the correct HTMLElement class from passed tags', function (done) {
            expect(__getHtmlClassFromTagName('a')).toBe(HTMLAnchorElement);
            expect(__getHtmlClassFromTagName('link')).toBe(HTMLLinkElement);
            done();
        });
    });
};
//# sourceMappingURL=getHtmlClassFromTagName.js.map