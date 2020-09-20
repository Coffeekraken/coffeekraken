"use strict";

var _convert = _interopRequireDefault(require("../convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.unit.convert', () => {
  document.body.innerHTML = "\n    <style>\n      #testing {\n        font-size: 10px;\n      }\n    </style>\n    <div id=\"testing\"></div>\n  ";
  var $elm = document.querySelector('#testing');
  it('Should convert the passed em value to px correctly', () => {
    expect((0, _convert.default)('2em', 'px', $elm)).toBe(20);
  });
  it('Should convert the passed rem value to px correctly', () => {
    expect((0, _convert.default)('2rem', 'px')).toBe(32);
  });
  it('Should convert the passed px value to em correctly', () => {
    expect((0, _convert.default)('20px', 'em', $elm)).toBe(2);
  });
  it('Should convert the passed px value to em correctly', () => {
    expect((0, _convert.default)('32px', 'rem')).toBe(2);
  });
});