"use strict";

var _isVisible = _interopRequireDefault(require("../isVisible"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.isVisible', () => {
  document.body.innerHTML = "\n      <style>\n        #testing {\n          display: none;\n        }\n      </style>\n      <div id=\"testing\">\n      </div>\n      <div id=\"testing1\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  var $elm1 = document.querySelector('#testing1');
  it('Should detect that the div #testing is not visible', () => {
    expect((0, _isVisible.default)($elm)).toBe(false);
  });
  it('Should detect that the div #testing1 is visible', () => {
    expect((0, _isVisible.default)($elm1)).toBe(true);
  });
});