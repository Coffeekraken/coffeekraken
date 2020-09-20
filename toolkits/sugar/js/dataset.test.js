"use strict";

var _dataset = _interopRequireDefault(require("../dataset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.dataset', () => {
  document.body.innerHTML = "\n      <div id=\"testing\" data-coco=\"hello\"></div>\n      <div id=\"testing1\" data-plop=\"{hello:'coco'}\"></div>\n      \n  ";
  var $testing = document.querySelector('#testing');
  var $testing1 = document.querySelector('#testing1');
  (0, _dataset.default)($testing1, 'json', {
    hello: 'world'
  });
  it('Should get correctly the data-coco value from the attributes', () => {
    expect((0, _dataset.default)($testing, 'coco')).toBe('hello');
  });
  it('Should get correctly the data "json" value from the dataset stack', () => {
    expect((0, _dataset.default)($testing1, 'json')).toEqual({
      hello: 'world'
    });
  });
  it('Should get correctly the data "plop" value from the attributes', () => {
    expect((0, _dataset.default)($testing1, 'plop')).toEqual({
      hello: 'coco'
    });
  });
});