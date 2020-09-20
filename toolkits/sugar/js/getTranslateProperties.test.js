"use strict";

var _getTranslateProperties = _interopRequireDefault(require("../getTranslateProperties"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('sugar.js.dom.getTranslateProperties', () => {
  document.body.innerHTML = "\n    <style>\n      #testing-matrix {\n        transform: matrix(1.00,0.00,0.00,1.00,10,20);\n      }\n      #testing-matrix3d {\n        transform: matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,10,20,30,1);\n      }\n      #testing-translate3d {\n        transform: translate3d(12px, 50%, 3em);\n      }\n      #testing-translate {\n        transform: translate(20px, 2rem);\n      }\n      #testing-default {\n        transform: translateX(3rem) translateY(10px) translateZ(20%);\n      }\n      </style>\n      <div id=\"testing-matrix\">\n      </div>\n      <div id=\"testing-matrix3d\">\n      </div>\n      <div id=\"testing-translate3d\">\n      </div>\n      <div id=\"testing-translate\">\n      </div>\n      <div id=\"testing-default\">\n      </div>\n  ";
  var $elmMatrix = document.querySelector('#testing-matrix');
  var $elmMatrix3d = document.querySelector('#testing-matrix3d');
  var $elmtranslate3d = document.querySelector('#testing-translate3d');
  var $elmTranslate = document.querySelector('#testing-translate');
  var $elmDefault = document.querySelector('#testing-default');
  it('Should get the translate properties from a matrix css declaration', () => {
    var translate = (0, _getTranslateProperties.default)($elmMatrix);
    expect(translate).toEqual({
      x: 10,
      y: 20,
      z: 0
    });
  });
  it('Should get the translate properties from a matrix3d css declaration', () => {
    var translate = (0, _getTranslateProperties.default)($elmMatrix3d);
    expect(translate).toEqual({
      x: 10,
      y: 20,
      z: 30
    });
  });
  it('Should get the translate properties from a translate3d css declaration', () => {
    var translate = (0, _getTranslateProperties.default)($elmtranslate3d);
    expect(translate).toEqual({
      x: 12,
      y: '50%',
      z: 48
    });
  });
  it('Should get the translate properties from a translate css declaration', () => {
    var translate = (0, _getTranslateProperties.default)($elmTranslate);
    expect(translate).toEqual({
      x: 20,
      y: 32,
      z: 0
    });
  });
  it('Should get the translate properties from a default translateX, translateY and translateZ css declaration', () => {
    var translate = (0, _getTranslateProperties.default)($elmDefault);
    expect(translate).toEqual({
      x: 48,
      y: 10,
      z: '20%'
    });
  });
});