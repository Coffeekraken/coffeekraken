"use strict";

var _closest = _interopRequireDefault(require("../closest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.closest', () => {
  document.body.innerHTML = "\n      <div id=\"testing\">\n        <div class=\"coco\">\n          <div id=\"source\"></div>\n        </div>\n      </div>\n  ";
  var $elm = document.querySelector('#source');
  it('Should find the "testing" element that is up in the dom tree', () => {
    var $testing = (0, _closest.default)($elm, '#testing');
    expect($testing.id).toBe('testing');
  });
});