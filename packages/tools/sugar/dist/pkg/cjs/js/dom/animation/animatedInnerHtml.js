"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
const uniqid_1 = __importDefault(require("../../../js/string/uniqid"));
const convertTime_1 = __importDefault(require("../../../shared/datetime/convertTime"));
/**
 * @name            animatedInnerHtml
 * @namespace            js.dom.animation
 * @type            Function
 * @platform          js
 * @status          stable
 *
 * Change the content of a Node with the possibility to animate the change using one of these animations:
 * - fade
 * - fadeUp
 * - fadeDown
 * - fadeLeft
 * - fadeRight
 * You can also choose between 3 actions which are: replace, append and prepend
 *
 * @param           {HTMLElement}            node           The node to change to content of
 * @param           {String}                 content        The new content of the node
 * @param           {Object}                 [settings={}]  The settings to change the content like 'animIn', 'animOut', and more...
 * @return          {Promise}                               A promise resolved when the change has been made
 *
 * @snippet         __animatedInnerHtml($1, $2)
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example       js
 * import { __animatedInnerHtml } from '@coffeekraken/sugar/dom';
 *  __animatedInnerHtml(myCoolNode, 'Hello World', {
 *    action: 'replace', // replace, append, prepend
 *    animIn: 'fade', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
 *    animOut: 'fadeUp', // fade, fadeUp, fadeDown, fadeLeft, fadeRight
 *    animInDuration: 600, // in ms if number, otherwise a string like '1s', '1m', etc...
 *    animOutDuration: 300, // in ms if number, otherwise a string like '1s', '1m', etc...
 *    animInDistance: 25, // in px
 *    animOutDistance: 25, // in px
 *    animInEasing: 'ease-in-out',
 *    animOutEasing: 'ease-in-out'
 * }).then(() => {
 *    // do something when the change has been made...
 * });
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function __animatedInnerHtml(node, content, settings = {}) {
    return new Promise((resolve, reject) => {
        // process the settings
        settings = Object.assign({ action: 'replace', animIn: 'fade', animOut: 'fade', animInDuration: 300, animOutDuration: 150, animInDistance: 25, animOutDistance: 25, animInEasing: 'ease-in-out', animOutEasing: 'ease-in-out' }, settings);
        settings.animInDuration = (0, convertTime_1.default)(settings.animInDuration, 'ms');
        settings.animOutDuration = (0, convertTime_1.default)(settings.animOutDuration, 'ms');
        // generate a uniqid for this process
        const _uniqid = (0, uniqid_1.default)();
        const _animInClassName = `s-innerHtml-animIn-${_uniqid}`;
        const _animOutClassName = `s-innerHtml-animOut-${_uniqid}`;
        // some html elements references
        let $styleAnimIn, $styleAnimOut, $div;
        // generate the animation styles
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
                $styleAnimIn = (0, dom_1.__injectStyle)(sheetAnimIn);
                break;
            case 'fadeDown':
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
                $styleAnimIn = (0, dom_1.__injectStyle)(sheetAnimInFadeUp);
                break;
            case 'fadeUp':
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
                $styleAnimIn = (0, dom_1.__injectStyle)(sheetAnimInFadeDown);
                break;
            case 'fadeRight':
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
                $styleAnimIn = (0, dom_1.__injectStyle)(sheetAnimInFadeLeft);
                break;
            case 'fadeLeft':
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
                $styleAnimIn = (0, dom_1.__injectStyle)(sheetAnimInFadeRight);
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
                $styleAnimOut = (0, dom_1.__injectStyle)(sheetAnimOutFade);
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
                $styleAnimOut = (0, dom_1.__injectStyle)(sheetAnimOutFadeUp);
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
                $styleAnimOut = (0, dom_1.__injectStyle)(sheetAnimOutFadeDown);
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
                $styleAnimOut = (0, dom_1.__injectStyle)(sheetAnimOutFadeLeft);
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
                $styleAnimOut = (0, dom_1.__injectStyle)(sheetAnimOutFadeRight);
                break;
        }
        // switch on the action to execute
        switch (settings.action) {
            case 'replace':
                // anim out the content by adding the corresponding class
                node.classList.add(_animOutClassName);
                // waiting the animation out to be finished
                setTimeout(() => {
                    // removing the animation out class
                    node.classList.remove(_animOutClassName);
                    // change the content
                    if (typeof content === 'string') {
                        node.innerHTML = content;
                    }
                    else {
                        (0, dom_1.__emptyNode)(node).append(content);
                    }
                    // anim in the content by adding the corresponding class
                    node.classList.add(_animInClassName);
                    // wait until the animation is finished to resolve the promise
                    setTimeout(() => {
                        resolve();
                        // removing the classes
                        node.classList.remove(_animInClassName);
                        // removing the styles elements
                        $styleAnimIn.parentNode.removeChild($styleAnimIn);
                        $styleAnimOut.parentNode.removeChild($styleAnimOut);
                    }, settings.animInDuration);
                }, settings.animOutDuration);
                break;
            case 'append':
                // append the new content inside a simple div to animate it
                $div = document.createElement('div');
                $div.classList.add(_animInClassName);
                if (typeof content === 'string') {
                    $div.innerHTML = content;
                }
                else {
                    $div.append(content);
                }
                // append the content
                node.appendChild($div);
                // wait until the animation is finished to resolve the promise
                setTimeout(() => {
                    resolve();
                    // removing the classes
                    $div.classList.remove(_animInClassName);
                    // removing the styles elements
                    $styleAnimIn.parentNode.removeChild($styleAnimIn);
                    $styleAnimOut.parentNode.removeChild($styleAnimOut);
                }, settings.animInDuration);
                break;
            case 'prepend':
                // append the new content inside a simple div to animate it
                $div = document.createElement('div');
                $div.classList.add(_animInClassName);
                if (typeof content === 'string') {
                    $div.innerHTML = content;
                }
                else {
                    $div.append(content);
                }
                // append the content
                node.insertBefore($div, node.firstChild);
                // wait until the animation is finished to resolve the promise
                setTimeout(() => {
                    resolve();
                    // removing the classes
                    $div.classList.remove(_animInClassName);
                    // removing the styles elements
                    $styleAnimIn.parentNode.removeChild($styleAnimIn);
                    $styleAnimOut.parentNode.removeChild($styleAnimOut);
                }, settings.animInDuration);
                break;
        }
    });
}
exports.default = __animatedInnerHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGlEQUFxRTtBQUNyRSx1RUFBaUQ7QUFDakQsdUZBQWlFO0FBRWpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILFNBQXdCLG1CQUFtQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDcEUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNuQyx1QkFBdUI7UUFDdkIsUUFBUSxtQkFDSixNQUFNLEVBQUUsU0FBUyxFQUNqQixNQUFNLEVBQUUsTUFBTSxFQUNkLE9BQU8sRUFBRSxNQUFNLEVBQ2YsY0FBYyxFQUFFLEdBQUcsRUFDbkIsZUFBZSxFQUFFLEdBQUcsRUFDcEIsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZUFBZSxFQUFFLEVBQUUsRUFDbkIsWUFBWSxFQUFFLGFBQWEsRUFDM0IsYUFBYSxFQUFFLGFBQWEsSUFDekIsUUFBUSxDQUNkLENBQUM7UUFDRixRQUFRLENBQUMsY0FBYyxHQUFHLElBQUEscUJBQWEsRUFBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLFFBQVEsQ0FBQyxlQUFlLEdBQUcsSUFBQSxxQkFBYSxFQUNwQyxRQUFRLENBQUMsZUFBZSxFQUN4QixJQUFJLENBQ1AsQ0FBQztRQUVGLHFDQUFxQztRQUNyQyxNQUFNLE9BQU8sR0FBRyxJQUFBLGdCQUFRLEdBQUUsQ0FBQztRQUMzQixNQUFNLGdCQUFnQixHQUFHLHNCQUFzQixPQUFPLEVBQUUsQ0FBQztRQUN6RCxNQUFNLGlCQUFpQixHQUFHLHVCQUF1QixPQUFPLEVBQUUsQ0FBQztRQUUzRCxnQ0FBZ0M7UUFDaEMsSUFBSSxZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FB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