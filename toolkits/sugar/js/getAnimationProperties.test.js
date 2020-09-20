"use strict";

var _getAnimationProperties = _interopRequireDefault(require("../getAnimationProperties"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.getAnimationProperties', () => {
  document.body.innerHTML = "\n  <style>\n    @keyframes coco {\n      from {\n        opacity: 0;\n      }\n      to {\n        opacity: 1;\n      }\n    }\n    #testing {\n      animation: coco 2s ease-in-out;\n      animation-name: coco;\n    }\n  </style>\n      <div id=\"testing\">\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  var props = (0, _getAnimationProperties.default)($elm);
  it('Should find the "testing" element that is up in the dom tree', () => {//  expect($testing.id).toBe('testing');
  });
});