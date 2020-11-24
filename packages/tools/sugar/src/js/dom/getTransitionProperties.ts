// @ts-nocheck

import __getStyleProperty from './getStyleProperty';
import __convert from '../time/convert';

/**
 * @name      getTransitionProperties
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import getTransitionProperties from '@coffeekraken/sugar/js/dom/getTransitionProperties'
 * const props = getTransitionProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	property : ['all'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	totalDuration : 200
 * // }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map((item) => item.trim());
  }
  return [what];
}

function getTransitionProperties(elm) {
  // get the transition properties
  const property = __getStyleProperty(elm, 'transition-property');
  const duration = __getStyleProperty(elm, 'transition-duration') || 0;
  const timingFunction = __getStyleProperty(elm, 'transition-timing-function');
  const delay = __getStyleProperty(elm, 'transition-delay');

  // return the transition object
  const props = {
    property: splitIfNeeded(property, ','),
    duration: splitIfNeeded(duration, ',').map((value) =>
      __convert(value, 'ms')
    ),
    delay: splitIfNeeded(delay, ',').map((value) => __convert(value, 'ms')),
    timingFunction: splitIfNeeded(timingFunction, ',')
  };
  let totalDuration = 0;
  let i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}
export = getTransitionProperties;