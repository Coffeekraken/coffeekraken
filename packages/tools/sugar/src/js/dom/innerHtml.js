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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvdG9vbHMvc3VnYXIvc3JjL2pzL2RvbS9pbm5lckh0bWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQWtEO0lBQ2xELHFFQUErQztJQUMvQyw0REFBc0M7SUFDdEMsd0VBQWtEO0lBRWxEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlDRztJQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7UUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyx1QkFBdUI7WUFDdkIsUUFBUSxtQkFDTixNQUFNLEVBQUUsU0FBUyxFQUNqQixNQUFNLEVBQUUsTUFBTSxFQUNkLE9BQU8sRUFBRSxNQUFNLEVBQ2YsY0FBYyxFQUFFLEdBQUcsRUFDbkIsZUFBZSxFQUFFLEdBQUcsRUFDcEIsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZUFBZSxFQUFFLEVBQUUsRUFDbkIsWUFBWSxFQUFFLGFBQWEsRUFDM0IsYUFBYSxFQUFFLGFBQWEsSUFDekIsUUFBUSxDQUNaLENBQUM7WUFDRixRQUFRLENBQUMsY0FBYyxHQUFHLGlCQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRSxRQUFRLENBQUMsZUFBZSxHQUFHLGlCQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVyRSxxQ0FBcUM7WUFDckMsTUFBTSxPQUFPLEdBQUcsZ0JBQVEsRUFBRSxDQUFDO1lBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsc0JBQXNCLE9BQU8sRUFBRSxDQUFDO1lBQ3pELE1BQU0saUJBQWlCLEdBQUcsdUJBQXVC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