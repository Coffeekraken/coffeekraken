"use strict";

var _em2px = _interopRequireDefault(require("../em2px"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.unit.em2px', () => {
  document.body.innerHTML = "\n    <style>\n      #testing {\n        font-size: 10px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  it('Should convert the passed em value to px correctly', () => {
    expect((0, _em2px.default)(2, $elm)).toBe(20);
  });
});