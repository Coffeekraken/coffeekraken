"use strict";
var __insertAfter = require('../insertAfter');
describe('sugar.js.dom.insertAfter', function () {
    document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
    var $elm = document.querySelector('#testing');
    var $add = document.createElement('a');
    __insertAfter($add, $elm);
    it('Should append the new element tag correctly', function () {
        expect($elm.nextSibling).toEqual($add);
    });
});
//# sourceMappingURL=insertAfter.test.js.map