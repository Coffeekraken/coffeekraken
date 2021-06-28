// @ts-nocheck

import __convert from '../../../shared/unit/convert';

/**
 * @name      getTranslateProperties
 * @namespace            js.dom.style
 * @type      Function
 * @platform          js
 * @platform          ts
 * @status        beta
 *
 * Get a translate properties of an HTMLElement
 *
 * @param 		{HTMLElement} 					$elm  		The element to get the properties from
 * @return 		{Object} 									The translate x,y and z properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
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
 * @since           1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getTranslateProperties($elm: HTMLElement, unit: 'px' | 'rem' | 'em' = 'px'): {
  x: number;
  y: number;
  z: number;
} {
  if (!window.getComputedStyle) return;
  let idx, mat;
  const style = getComputedStyle($elm);
  const transform =
    style.transform ||
    style.webkitTransform ||
    style.mozTransform ||
    style.msTransform;
  if (!transform)
    return {
      x: 0,
      y: 0,
      z: 0
    };
  mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    // preparing the value
    const val = mat[1]
      .replace('matrix3d(', '')
      .replace(')', '')
      .split(',')
      .map((v) => v.trim());
    return {
      x: __convert(val[12], unit, $elm),
      y: __convert(val[13], unit, $elm),
      z: __convert(val[14], unit, $elm)
    };
  }
  mat = transform.match(/^matrix\((.+)\)$/);
  if (mat) {
    // preparing the value
    const val = mat[1]
      .replace('matrix(', '')
      .replace(')', '')
      .split(',')
      .map((v) => v.trim());
    return {
      x: __convert(val[4], unit, $elm),
      y: __convert(val[5], unit, $elm),
      z: __convert(val[6], unit, $elm) || 0
    };
  }

  mat = transform.match(/^translate3d\((.+)\)$/);
  if (mat) {
    // preparing the value
    const val = mat[1]
      .replace('translate3d(', '')
      .replace(')', '')
      .split(',')
      .map((v) => v.trim());
    return {
      x: __convert(val[0], unit, $elm),
      y: __convert(val[1], unit, $elm),
      z: __convert(val[2], unit, $elm) || 0
    };
  }

  mat = transform.match(/^translate\((.+)\)$/);
  if (mat) {
    // preparing the value
    const val = mat[1]
      .replace('translate(', '')
      .replace(')', '')
      .split(',')
      .map((v) => v.trim());
    return {
      x: __convert(val[0], unit, $elm),
      y: __convert(val[1], unit, $elm),
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
      xRes = __convert(xRegRes[1], unit, $elm);
    }
    let yRes = 0;
    if (yRegRes[1]) {
      yRes = __convert(yRegRes[1], unit, $elm);
    }
    let zRes = 0;
    if (zRegRes[1]) {
      zRes = __convert(zRegRes[1], unit, $elm);
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
export default getTranslateProperties;
