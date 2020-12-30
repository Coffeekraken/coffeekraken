"use strict";
module.exports = function (__strToHtml) {
    describe('sugar.js.html.strToHtml', function () {
        var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";
        var res = __strToHtml(html);
        it('Should have transform the dom element to a string correctly', function () {
            expect(typeof res).toBe('object');
            expect(res instanceof HTMLDivElement).toBe(true);
        });
    });
};
//# sourceMappingURL=strToHtml.js.map