"use strict";
var __addEventListenerOnce = require('../addEventListenerOnce');
var __dispatchEvent = require('../dispatchEvent');
describe('sugar.js.dom.addEventListenerOnce', function () {
    document.body.innerHTML = "\n      <div id=\"testing\">Hello World</div>\n  ";
    var $elm = document.querySelector('#testing');
    var isTriggeredTwice = false;
    it('Should add the event listener on the element correctly', function (done) {
        __addEventListenerOnce($elm, 'click').on('click', function (e) {
            if (e.detail.twice)
                isTriggeredTwice = true;
            done();
        });
        __dispatchEvent($elm, 'click', {
            first: true
        });
    });
    it('Should not trigger anymore the same event', function () {
        __dispatchEvent($elm, 'click', {
            twice: true
        });
        expect(isTriggeredTwice).toBe(false);
    });
});
//# sourceMappingURL=addEventListenerOnce.test.js.map