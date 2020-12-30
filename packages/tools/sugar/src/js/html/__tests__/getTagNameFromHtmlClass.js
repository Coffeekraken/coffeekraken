"use strict";
module.exports = function (__getTagNameFromHtmlClass) {
    describe('sugar.js.string.getTagNameFromHtmlClass', function () {
        it('Should get back the correct tagname from passed classes', function (done) {
            expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe('a');
            expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe('link');
            done();
        });
    });
};
//# sourceMappingURL=getTagNameFromHtmlClass.js.map