"use strict";

var _emptyNode = _interopRequireDefault(require("../emptyNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.emptyNode', () => {
  document.body.innerHTML = "\n      <div id=\"testing\">\n        <div class=\"coco\">\n        </div>\n        <div id=\"source\"></div>\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  (0, _emptyNode.default)($elm);
  it('Should have empty the node correctly', () => {
    expect($elm.childNodes.length).toBe(0);
  });
});