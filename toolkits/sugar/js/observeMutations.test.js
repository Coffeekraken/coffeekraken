"use strict";

var _observeMutations = _interopRequireDefault(require("../observeMutations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.observeMutations', () => {
  document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
  var $elm = document.querySelector('#testing');
  var mutationsCount = 0;
  (0, _observeMutations.default)($elm).then(mutation => {
    if (mutation.attributeName === 'plop' || mutation.attributeName === 'hello') {
      mutationsCount++;
    }
  });
  $elm.setAttribute('plop', 'coco');
  $elm.setAttribute('hello', 'world');
  it('Should have detect all the mutations done on the $elm', () => {
    setTimeout(() => {
      expect(mutationsCount).toBe(2);
    });
  });
});