"use strict";
var __observeAttributes = require('../observeAttributes');
describe('sugar.js.dom.observeAttributes', function () {
    document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
    var $elm = document.querySelector('#testing');
    var isMutated = false;
    __observeAttributes($elm).then(function (mutation) {
        isMutated = true;
    });
    $elm.setAttribute('hello', 'world');
    it('Should observe the attributes updates correctly', function () {
        setTimeout(function () {
            expect(isMutated).toBe(true);
        });
    });
});
//# sourceMappingURL=observeAttributes.test.js.map