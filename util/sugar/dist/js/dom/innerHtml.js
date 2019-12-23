"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = innerHtml;

var _uniqid2 = _interopRequireDefault(require("../string/uniqid"));

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
 *    animIn: 'fade', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
 *    animOut: 'fadeUp', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
 *    animInDuration: 600, // in ms
 *    animOutDuration: 300, // in ms
 *    animInDistance: 25, // in px
 *    animOutDistance: 25, // in px
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
      animInDuration: 600,
      animOutDuration: 300,
      animInDistance: 25,
      animOutDistance: 25,
      animInEasing: 'ease-in-out',
      animOutEasing: 'ease-in-out',
      ...settings
    }; // generate a uniqid for this process

    const _uniqid = (0, _uniqid2.default)();

    const _animInClassName = `s-innerHtml-animIn-${_uniqid}`;
    const _animOutClassName = `s-innerHtml-animOut-${_uniqid}`; // generate the animation styles

    switch (settings.animIn) {
      case 'fade':
        const sheetAnimIn = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimIn);
        break;

      case 'fadeUp':
        const sheetAnimInFadeUp = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateY(-${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimInFadeUp);
        break;

      case 'fadeDown':
        const sheetAnimInFadeDown = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateY(${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimInFadeDown);
        break;

      case 'fadeLeft':
        const sheetAnimInFadeLeft = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateX(-${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimInFadeLeft);
        break;

      case 'fadeRight':
        const sheetAnimInFadeRight = `
          @keyframes animIn-${_uniqid} {
            from {
              opacity: 0;
              transform: translateX(${settings.animInDistance}px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          .${_animInClassName} {
              animation: animIn-${_uniqid} ${settings.animInDuration}ms ${settings.animInEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimInFadeRight);
        break;
    }

    switch (settings.animOut) {
      case 'fade':
        const sheetAnimOutFade = `
          @keyframes animOut-${_uniqid} {
            0% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
          .${_animOutClassName} {
            animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimOutFade);
        break;

      case 'fadeUp':
        const sheetAnimOutFadeUp = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(-${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimOutFadeUp);
        break;

      case 'fadeDown':
        const sheetAnimOutFadeDown = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateY(0);
            }
            to {
              opacity: 0;
              transform: translateY(${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimOutFadeDown);
        break;

      case 'fadeLeft':
        const sheetAnimOutFadeLeft = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(-${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimOutFadeLeft);
        break;

      case 'fadeRight':
        const sheetAnimOutFadeRight = `
          @keyframes animOut-${_uniqid} {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(${settings.animOutDistance}px);
            }
          }
          .${_animOutClassName} {
              animation: animOut-${_uniqid} ${settings.animOutDuration}ms ${settings.animOutEasing};
          }
        `;
        (0, _injectStyle.default)(sheetAnimOutFadeRight);
        break;
    } // anim out the content by adding the corresponding class


    node.classList.add(_animOutClassName); // waiting the animation out to be finished

    setTimeout(() => {
      // removing the animation out class
      node.classList.remove(_animOutClassName); // change the content

      node.innerHTML = content; // anim in the content by adding the corresponding class

      node.classList.add(_animInClassName); // wait until the animation is finished to resolve the promise

      setTimeout(() => {
        resolve();
      }, settings.animInDuration);
    }, settings.animOutDuration);
  });
}

module.exports = exports.default;