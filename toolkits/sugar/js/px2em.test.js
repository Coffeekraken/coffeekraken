"use strict";

var _px2em = _interopRequireDefault(require("../px2em"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.unit.px2em', () => {
  document.body.innerHTML = "\n    <style>\n      #testing {\n        font-size: 10px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  it('Should convert the passed px value to em correctly', () => {
    expect((0, _px2em.default)(20, $elm)).toBe(2);
  });
});