"use strict";

var _closestNotVisible = _interopRequireDefault(require("../closestNotVisible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.closestNotVisible', () => {
  document.body.innerHTML = "\n  <style>\n    #testing {\n      display: none;\n    }\n  </style>\n      <div id=\"testing\">\n        <div class=\"coco testing\">\n          <div id=\"source\"></div>\n        </div>\n      </div>\n  ";
  var $elm = document.querySelector('#source');
  it('Should find the "testing" element that is up in the dom tree', () => {
    var $testing = (0, _closestNotVisible.default)($elm, '.testing');
    expect($testing.id).toBe('testing');
  });
});