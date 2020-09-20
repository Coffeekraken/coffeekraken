"use strict";

var _next = _interopRequireDefault(require("../next"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.next', () => {
  document.body.innerHTML = "\n      <div id=\"testing\"></div>\n      <div id=\"next1\"></div>\n      <div id=\"next2\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  var $next2 = document.querySelector('#next2');
  var $finded = (0, _next.default)($elm, '#next2');
  it('Should find the $next2 element from the $testing one', () => {
    expect($finded).toEqual($next2);
  });
});