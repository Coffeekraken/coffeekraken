// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../../css/injectStyle';
import __emptyNode from '../manipulate/emptyNode';
import __convert from '../../../shared/time/convert';
/**
 * @name            innerHtml
 * @namespace            js.dom.animation
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
        settings.animInDuration = __convert(settings.animInDuration, 'ms');
        settings.animOutDuration = __convert(settings.animOutDuration, 'ms');
        // generate a uniqid for this process
        const _uniqid = __uniqid();
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
                $styleAnimIn = __injectStyle(sheetAnimIn);
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
                $styleAnimIn = __injectStyle(sheetAnimInFadeUp);
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
                $styleAnimIn = __injectStyle(sheetAnimInFadeDown);
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
                $styleAnimIn = __injectStyle(sheetAnimInFadeLeft);
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
                $styleAnimIn = __injectStyle(sheetAnimInFadeRight);
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
                $styleAnimOut = __injectStyle(sheetAnimOutFade);
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
                $styleAnimOut = __injectStyle(sheetAnimOutFadeUp);
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
                $styleAnimOut = __injectStyle(sheetAnimOutFadeDown);
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
                $styleAnimOut = __injectStyle(sheetAnimOutFadeLeft);
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
                $styleAnimOut = __injectStyle(sheetAnimOutFadeRight);
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
                        __emptyNode(node).append(content);
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
export default innerHtml;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5uZXJIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRCxPQUFPLGFBQWEsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLFNBQVMsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F5Q0c7QUFDSCxTQUFTLFNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQzdDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsdUJBQXVCO1FBQ3ZCLFFBQVEsbUJBQ04sTUFBTSxFQUFFLFNBQVMsRUFDakIsTUFBTSxFQUFFLE1BQU0sRUFDZCxPQUFPLEVBQUUsTUFBTSxFQUNmLGNBQWMsRUFBRSxHQUFHLEVBQ25CLGVBQWUsRUFBRSxHQUFHLEVBQ3BCLGNBQWMsRUFBRSxFQUFFLEVBQ2xCLGVBQWUsRUFBRSxFQUFFLEVBQ25CLFlBQVksRUFBRSxhQUFhLEVBQzNCLGFBQWEsRUFBRSxhQUFhLElBQ3pCLFFBQVEsQ0FDWixDQUFDO1FBQ0YsUUFBUSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRSxRQUFRLENBQUMsZUFBZSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRXJFLHFDQUFxQztRQUNyQyxNQUFNLE9BQU8sR0FBRyxRQUFRLEVBQUUsQ0FBQztRQUMzQixNQUFNLGdCQUFnQixHQUFHLHNCQUFzQixPQUFPLEVBQUUsQ0FBQztRQUN6RCxNQUFNLGlCQUFpQixHQUFHLHVCQUF1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