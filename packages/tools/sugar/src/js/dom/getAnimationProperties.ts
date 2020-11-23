import __getStyleProperty from './getStyleProperty';
import __convert from '../time/convert';

/**
 * @name      getAnimationProperties
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Get the css animation properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import getAnimationProperties from '@coffeekraken/sugar/js/dom/getAnimationProperties'
 * const props = getAnimationProperties(myCoolHTMLElement);
 * // output format
 * // {
 * // 	name : ['animation1'],
 * // 	duration : [200],
 * // 	delay : [0],
 * // 	timingFunction : ['linear'],
 * // 	iterationCount : [1],
 * // 	direction : ['forward'],
 * // 	totalDuration : 200
 * // }
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function getAnimationProperties(elm) {
  // get the animation properties
  const name = __getStyleProperty(elm, 'animation-name') || '';
  const duration = __getStyleProperty(elm, 'animation-duration') || '0s';
  const timingFunction =
    __getStyleProperty(elm, 'animation-timing-function') || 'linear';
  const delay = __getStyleProperty(elm, 'animation-delay') || '0s';
  const iterationCount =
    __getStyleProperty(elm, 'animation-iteration-count') || 1;
  const direction = __getStyleProperty(elm, 'animation-direction') || 'normal';

  // return the animation object
  const props = {
    name: name.split(','),
    duration: duration.split(',').map((value) => __convert(value, 'ms')),
    delay: `${delay}`.split(',').map((value) => __convert(value, 'ms')),
    timingFunction: timingFunction.split(','),
    iterationCount: `${iterationCount}`.split(','),
    direction: direction.split(',')
  };
  let totalDuration = 0;
  const i = 0;
  const delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach((val) => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
  });
  props.totalDuration = totalDuration;
  return props;
}
