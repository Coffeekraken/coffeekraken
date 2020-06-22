"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = lettersInReveal;

var _splitLetters = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/splitLetters"));

var _whenInViewport = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/whenInViewport"));

var _querySelectorLive = _interopRequireDefault(require("@coffeekraken/sugar/js/dom/querySelectorLive"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name      lettersInReveal
 * @namespace       text-intro
 * @type        function
 *
 * Init the listener for the "letters-in-reveal" intro to work
 *
 * @param    {Integer}    [offset=-window.innerHeight*.2]    An offset that represent the distance before entering the viewport for the detection
 * @param    {Integer}    [delay=300]    The delay after the detection to trigger the animation
 *
 * @example       js
 * \@import 	lettersInReveal from '@coffeekraken/text-intro/js/animLettersInReveal';
 * lettersInReveal(); // init listeners
 *
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */
function lettersInReveal(offset = -window.innerHeight * .2, delay = 300) {
  (0, _querySelectorLive.default)('[intro="letters-in-reveal"]', elm => {
    (0, _splitLetters.default)(elm);
    (0, _whenInViewport.default)(elm, elm.getAttribute('intro-offset') || offset).then(elm => {
      setTimeout(() => {
        elm.classList.add('active');
      }, delay);
    });
  });
}

module.exports = exports.default;