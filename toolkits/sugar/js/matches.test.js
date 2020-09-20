"use strict";

var _matches = _interopRequireDefault(require("../matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.matches', () => {
  document.body.innerHTML = "\n      <div id=\"testing\" class=\"hello-world coco\">\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  it('Should return true on the match testing', () => {
    expect((0, _matches.default)($elm, '.hello-world, .coco')).toBe(true);
  });
  it('Should return false on the match testing', () => {
    expect((0, _matches.default)($elm, '.hello-wold, .coco')).toBe(true);
  });
});