"use strict";

var _nodeIndex = _interopRequireDefault(require("../nodeIndex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.nodeIndex', () => {
  document.body.innerHTML = "\n      \n      <div></div>\n      <div></div>\n      <div id=\"testing\">\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  it('Should return 2 as node index for the #testing node', () => {
    expect((0, _nodeIndex.default)($elm)).toBe(2);
  });
});