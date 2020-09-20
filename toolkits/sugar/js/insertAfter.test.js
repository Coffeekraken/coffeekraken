"use strict";

var __insertAfter = require('../insertAfter');

describe('sugar.js.dom.insertAfter', () => {
  document.body.innerHTML = "\n    <div id=\"testing\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  var $add = document.createElement('a');

  __insertAfter($add, $elm);

  it('Should append the new element tag correctly', () => {
    expect($elm.nextSibling).toEqual($add);
  });
});