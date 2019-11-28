"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTransmationDuration;

var _getAnimationProperties = _interopRequireDefault(require("./getAnimationProperties"));

var _getTransitionProperties = _interopRequireDefault(require("./getTransitionProperties"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the animation or the transition duration
 * @param    {HTMLElement}    $elm    The element to get the animation/transition duration from
 * @return    {Integer}    The animation/transition duration in ms
 *
 * @example    js
 * import getTransmationDuration from '@coffeekraken/sugar/js/dom/getTransmationDuration'
 * getTransmationDuration($myElm) // 200
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function getTransmationDuration($elm) {
  const animationProperties = (0, _getAnimationProperties.default)($elm);
  const transitionProperties = (0, _getTransitionProperties.default)($elm);
  return animationProperties.totalDuration || transitionProperties.totalDuration;
}

module.exports = exports.default;