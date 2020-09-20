"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getAnimationProperties;

var _getStyleProperty = _interopRequireDefault(require("./getStyleProperty"));

var _convert = _interopRequireDefault(require("../time/convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO tests

/**
 * @name      getAnimationProperties
 * @namespace           sugar.js.dom
 * @type      Function
 *
 * Get the css animation properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map(item => item.trim());
  }

  return what;
}

function getAnimationProperties(elm) {
  // get the animation properties
  var name = (0, _getStyleProperty.default)(elm, 'animation-name') || '';
  var duration = (0, _getStyleProperty.default)(elm, 'animation-duration') || '0s';
  var timingFunction = (0, _getStyleProperty.default)(elm, 'animation-timing-function') || 'linear';
  var delay = (0, _getStyleProperty.default)(elm, 'animation-delay') || '0s';
  var iterationCount = (0, _getStyleProperty.default)(elm, 'animation-iteration-count') || 1;
  var direction = (0, _getStyleProperty.default)(elm, 'animation-direction') || 'normal'; // return the animation object

  var props = {
    name: name.split(','),
    duration: duration.split(',').map(value => (0, _convert.default)(value, 'ms')),
    delay: "".concat(delay).split(',').map(value => (0, _convert.default)(value, 'ms')),
    timingFunction: timingFunction.split(','),
    iterationCount: "".concat(iterationCount).split(','),
    direction: direction.split(',')
  };
  var totalDuration = 0;
  var i = 0;
  var delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach(val => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }
  });
  props.totalDuration = totalDuration;
  return props;
}

module.exports = exports.default;