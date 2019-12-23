"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = innerHtml;

var _uniqid2 = _interopRequireDefault(require("../string/uniqid"));

var _jss = _interopRequireDefault(require("../vendor/jss"));

var _injectStyle = _interopRequireDefault(require("../css/injectStyle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name            innerHtml
 * @namespace       sugar.js.dom
 * @type            Function
 *
 * Change the content of a Node with the possibility to animate the change using one of these animations:
 * - fade
 * - fadeUp
 * - fadeDown
 * - fadeLeft
 * - fadeRight
 *
 * @param           {HTMLElement}            node           The node to change to content of
 * @param           {String}                 content        The new content of the node
 * @param           {Object}                 [settings={}]  The settings to change the content like 'animIn', 'animOut', and more...
 * @return          {Promise}                               A promise resolved when the change has been made
 *
 * @example       js
 * import innerHtml from '@coffeekraken/sugar/js/dom/innerHtml'
 * innerHtml(myCoolNode, 'Hello World', {
 *    animIn: 'fade',
 *    animOut: 'fadeUp',
 *    animInDuration: 2000,
 *    animOutDuration: 1000,
 *    animInDistance: 100,
 *    animOutDistance: 100,
 *    animInEasing: 'ease-in-out',
 *    animOutEasing: 'ease-in-out'
 * }).then(() => {
 *    // do something when the change has been made...
 * });
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function innerHtml(node, content, settings = {}) {
  return new Promise((resolve, reject) => {
    // process the settings
    settings = {
      animIn: 'fade',
      animOut: 'fade',
      animInDuration: 5000,
      animOutDuration: 5000,
      animInDistance: 100,
      animOutDistance: 100,
      animInEasing: 'ease-in-out',
      animOutEasing: 'ease-in-out',
      ...settings
    }; // generate a uniqid for this process

    const _uniqid = (0, _uniqid2.default)();

    const _animInClassName = `s-innerHtml-animIn-${_uniqid}`;
    const _animOutClassName = `s-innerHtml-animOut-${_uniqid}`; // generate the animation styles

    switch (settings.animIn) {
      case 'fade':
        const sheet = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
            },
            to {
              opacity: 1;
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        (0, _injectStyle.default)(sheet);
        break;

      case 'fadeUp':
        break;

      case 'fadeDown':
        break;

      case 'fadeLeft':
        break;

      case 'fadeRight':
        break;
    }

    switch (settings.animOut) {
      case 'fade':
        const sheet = `
          @keyframes animOut-${_uniqid} {
            0% {
              opacity: 1;
            },
            100% {
              opacity: 0;
            }
          }
          .${_animOutClassName} {
            animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        (0, _injectStyle.default)(sheet);
        break;

      case 'fadeUp':
        break;

      case 'fadeDown':
        break;

      case 'fadeLeft':
        break;

      case 'fadeRight':
        break;
    } // anim out the content by adding the corresponding class


    node.classList.add(_animOutClassName); // waiting the animation out to be finished

    setTimeout(() => {
      // removing the animation out class
      node.classList.remove(_animOutClassName); // change the content

      node.innerHTML = content; // anim in the content by adding the corresponding class

      node.classList.add(_animInClassName);
    }, settings.animOutDuration);
  });
}

module.exports = exports.default;