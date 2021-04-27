// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../shared/string/uniqid", "../css/injectStyle", "./emptyNode", "../../shared/time/convert"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const uniqid_1 = __importDefault(require("../../shared/string/uniqid"));
    const injectStyle_1 = __importDefault(require("../css/injectStyle"));
    const emptyNode_1 = __importDefault(require("./emptyNode"));
    const convert_1 = __importDefault(require("../../shared/time/convert"));
    /**
     * @name            innerHtml
     * @namespace            js.dom
     * @type            Function
     * @stable
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
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import innerHtml from '@coffeekraken/sugar/js/dom/innerHtml'
     * innerHtml(myCoolNode, 'Hello World', {
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
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function innerHtml(node, content, settings = {}) {
        return new Promise((resolve, reject) => {
            // process the settings
            settings = Object.assign({ action: 'replace', animIn: 'fade', animOut: 'fade', animInDuration: 300, animOutDuration: 150, animInDistance: 25, animOutDistance: 25, animInEasing: 'ease-in-out', animOutEasing: 'ease-in-out' }, settings);
            settings.animInDuration = convert_1.default(settings.animInDuration, 'ms');
            settings.animOutDuration = convert_1.default(settings.animOutDuration, 'ms');
            // generate a uniqid for this process
            const _uniqid = uniqid_1.default();
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
                    $styleAnimIn = injectStyle_1.default(sheetAnimIn);
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
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeUp);
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
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeDown);
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
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeLeft);
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
                    $styleAnimIn = injectStyle_1.default(sheetAnimInFadeRight);
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
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFade);
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
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeUp);
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
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeDown);
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
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeLeft);
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
                    $styleAnimOut = injectStyle_1.default(sheetAnimOutFadeRight);
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
                            emptyNode_1.default(node).append(content);
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
    exports.default = innerHtml;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5uZXJIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLHdFQUFrRDtJQUNsRCxxRUFBK0M7SUFDL0MsNERBQXNDO0lBQ3RDLHdFQUFrRDtJQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Q0c7SUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsdUJBQXVCO1lBQ3ZCLFFBQVEsbUJBQ04sTUFBTSxFQUFFLFNBQVMsRUFDakIsTUFBTSxFQUFFLE1BQU0sRUFDZCxPQUFPLEVBQUUsTUFBTSxFQUNmLGNBQWMsRUFBRSxHQUFHLEVBQ25CLGVBQWUsRUFBRSxHQUFHLEVBQ3BCLGNBQWMsRUFBRSxFQUFFLEVBQ2xCLGVBQWUsRUFBRSxFQUFFLEVBQ25CLFlBQVksRUFBRSxhQUFhLEVBQzNCLGFBQWEsRUFBRSxhQUFhLElBQ3pCLFFBQVEsQ0FDWixDQUFDO1lBQ0YsUUFBUSxDQUFDLGNBQWMsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkUsUUFBUSxDQUFDLGVBQWUsR0FBRyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFckUscUNBQXFDO1lBQ3JDLE1BQU0sT0FBTyxHQUFHLGdCQUFRLEVBQUUsQ0FBQztZQUMzQixNQUFNLGdCQUFnQixHQUFHLHNCQUFzQixPQUFPLEVBQUUsQ0FBQztZQUN6RCxNQUFNLGlCQUFpQixHQUFHLHVCQUF1QixPQUFPLEVBQUUsQ0FBQztZQUUzRCxnQ0FBZ0M7WUFDaEMsSUFBSSxZQUFZLEVBQUUsYUFBYSxFQUFFLElB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