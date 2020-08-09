"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTransitionProperties;

var _getStyleProperty = _interopRequireDefault(require("./getStyleProperty"));

var _convert = _interopRequireDefault(require("../time/convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO tests

/**
 * @name      getTransitionProperties
 * @namespace           js.dom
 * @type      Function
 *
 * Get the css transition properties from an HTMLElement in an object format
 *
 * @param 		{HTMLElement} 					elm  		The element to get the properties from
 * @return 		{Object} 									The animation properties
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function splitIfNeeded(what, separator) {
  if (what.indexOf(separator) !== -1) {
    return what.split(separator).map(item => item.trim());
  }

  return [what];
}

function getTransitionProperties(elm) {
  // get the transition properties
  var property = (0, _getStyleProperty.default)(elm, 'transition-property');
  var duration = (0, _getStyleProperty.default)(elm, 'transition-duration') || 0;
  var timingFunction = (0, _getStyleProperty.default)(elm, 'transition-timing-function');
  var delay = (0, _getStyleProperty.default)(elm, 'transition-delay'); // return the transition object

  var props = {
    property: splitIfNeeded(property, ','),
    duration: splitIfNeeded(duration, ',').map(value => (0, _convert.default)(value, 'ms')),
    delay: splitIfNeeded(delay, ',').map(value => (0, _convert.default)(value, 'ms')),
    timingFunction: splitIfNeeded(timingFunction, ',')
  };
  var totalDuration = 0;
  var i = 0;
  var delays = [0].concat(props.delay);
  [0].concat(props.duration).forEach(val => {
    if (val + delays[i] > totalDuration) {
      totalDuration = val + delays[i];
    }

    i++;
  });
  props.totalDuration = totalDuration;
  return props;
}

module.exports = exports.default;