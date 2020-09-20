"use strict";

var __observeAttributes = require('../observeAttributes');

describe('sugar.js.dom.observeAttributes', () => {
  document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  var isMutated = false;

  __observeAttributes($elm).then(mutation => {
    isMutated = true;
  });

  $elm.setAttribute('hello', 'world');
  it('Should observe the attributes updates correctly', () => {
    setTimeout(() => {
      expect(isMutated).toBe(true);
    });
  });
});