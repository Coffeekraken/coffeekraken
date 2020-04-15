"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTranslateProperties;

var _convert = _interopRequireDefault(require("../unit/convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      getTranslateProperties
 * @namespace     sugar.js.dom
 * @type      Function
 *
 * Get a translate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The translate x,y and z properties
 *
 * @example  	js
 * import getTranslateProperties from '@coffeekraken/sugar/js/dom/getTranslateProperties'
 * const props = getTranslateProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	x : 100,
 * // 	y : 0,
 * // 	z : 0
 * // }
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getTranslateProperties($elm, unit = 'px') {
  if (!window.getComputedStyle) return;
  let idx, mat, style, transform;
  style = getComputedStyle($elm);
  transform = style.transform || style.webkitTransform || style.mozTransform || style.msTransform;
  if (!transform) return {
    x: 0,
    y: 0,
    z: 0
  };
  mat = transform.match(/^matrix3d\((.+)\)$/);

  if (mat) {
    // preparing the value
    let val = mat[1].replace('matrix3d(', '').replace(')', '').split(',').map(v => v.trim());
    return {
      x: (0, _convert.default)(val[12], unit, $elm),
      y: (0, _convert.default)(val[13], unit, $elm),
      z: (0, _convert.default)(val[14], unit, $elm)
    };
  }

  mat = transform.match(/^matrix\((.+)\)$/);

  if (mat) {
    // preparing the value
    let val = mat[1].replace('matrix(', '').replace(')', '').split(',').map(v => v.trim());
    return {
      x: (0, _convert.default)(val[4], unit, $elm),
      y: (0, _convert.default)(val[5], unit, $elm),
      z: (0, _convert.default)(val[6], unit, $elm) || 0
    };
  }

  mat = transform.match(/^translate3d\((.+)\)$/);

  if (mat) {
    // preparing the value
    let val = mat[1].replace('translate3d(', '').replace(')', '').split(',').map(v => v.trim());
    return {
      x: (0, _convert.default)(val[0], unit, $elm),
      y: (0, _convert.default)(val[1], unit, $elm),
      z: (0, _convert.default)(val[2], unit, $elm) || 0
    };
  }

  mat = transform.match(/^translate\((.+)\)$/);

  if (mat) {
    // preparing the value
    let val = mat[1].replace('translate(', '').replace(')', '').split(',').map(v => v.trim());
    return {
      x: (0, _convert.default)(val[0], unit, $elm),
      y: (0, _convert.default)(val[1], unit, $elm),
      z: 0
    };
  }

  mat = transform.match(/translate[XYZ]\((.+)\)/);

  if (mat) {
    // preparing the value
    const xReg = /translateX\((\S+)\)/;
    const yReg = /translateY\((\S+)\)/;
    const zReg = /translateZ\((\S+)\)/;
    const xRegRes = mat[0].match(xReg);
    const yRegRes = mat[0].match(yReg);
    const zRegRes = mat[0].match(zReg);
    let xRes = 0;

    if (xRegRes[1]) {
      xRes = (0, _convert.default)(xRegRes[1], unit, $elm);
    }

    let yRes = 0;

    if (yRegRes[1]) {
      yRes = (0, _convert.default)(yRegRes[1], unit, $elm);
    }

    let zRes = 0;

    if (zRegRes[1]) {
      zRes = (0, _convert.default)(zRegRes[1], unit, $elm);
    }

    return {
      x: xRes,
      y: yRes,
      z: zRes
    };
  }

  return {
    x: 0,
    y: 0,
    z: 0
  };
}

module.exports = exports.default;