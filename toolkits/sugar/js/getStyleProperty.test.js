"use strict";

var _getStyleProperty = _interopRequireDefault(require("../getStyleProperty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.getStyleProperty', () => {
  document.body.innerHTML = "\n      <style>\n          #testing {\n            content: 'hello world';\n            animation: coco 2s ease-in-out 3s;\n          }\n      </style>\n      <div id=\"testing\">\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  it('Should get the "content" css property correctly', () => {
    expect((0, _getStyleProperty.default)($elm, 'content')).toBe('hello world');
  });
  it('Should get the "animation" css property correctly', () => {
    expect((0, _getStyleProperty.default)($elm, 'animation')).toBe('coco 2s ease-in-out 3s');
  });
});