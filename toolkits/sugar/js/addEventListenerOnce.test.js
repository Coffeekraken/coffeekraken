"use strict";

var __addEventListenerOnce = require('../addEventListenerOnce');

var __dispatchEvent = require('../dispatchEvent');

describe('sugar.js.dom.addEventListenerOnce', () => {
  document.body.innerHTML = "\n      <div id=\"testing\">Hello World</div>\n  ";
  var $elm = document.querySelector('#testing');
  var isTriggeredTwice = false;
  it('Should add the event listener on the element correctly', done => {
    __addEventListenerOnce($elm, 'click').on('click', e => {
      if (e.detail.twice) isTriggeredTwice = true;
      done();
    });

    __dispatchEvent($elm, 'click', {
      first: true
    });
  });
  it('Should not trigger anymore the same event', () => {
    __dispatchEvent($elm, 'click', {
      twice: true
    });

    expect(isTriggeredTwice).toBe(false);
  });
});