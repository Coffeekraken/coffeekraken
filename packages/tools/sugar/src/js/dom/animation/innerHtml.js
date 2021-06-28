// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';
import __injectStyle from '../../css/injectStyle';
import __emptyNode from '../manipulate/emptyNode';
import __convert from '../../../shared/time/convert';
/**
 * @name            innerHtml
 * @namespace            js.dom.animation
 * @type            Function
 * @platform          js
 * @platform          ts
 * @status          beta
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5uZXJIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRCxPQUFPLGFBQWEsTUFBTSx1QkFBdUIsQ0FBQztBQUNsRCxPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUNsRCxPQUFPLFNBQVMsTUFBTSw4QkFBOEIsQ0FBQztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJDRztBQUNILFNBQVMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDN0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyx1QkFBdUI7UUFDdkIsUUFBUSxtQkFDTixNQUFNLEVBQUUsU0FBUyxFQUNqQixNQUFNLEVBQUUsTUFBTSxFQUNkLE9BQU8sRUFBRSxNQUFNLEVBQ2YsY0FBYyxFQUFFLEdBQUcsRUFDbkIsZUFBZSxFQUFFLEdBQUcsRUFDcEIsY0FBYyxFQUFFLEVBQUUsRUFDbEIsZUFBZSxFQUFFLEVBQUUsRUFDbkIsWUFBWSxFQUFFLGFBQWEsRUFDM0IsYUFBYSxFQUFFLGFBQWEsSUFDekIsUUFBUSxDQUNaLENBQUM7UUFDRixRQUFRLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLFFBQVEsQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFckUscUNBQXFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsc0JBQXNCLE9BQU8sRUFBRSxDQUFDO1FBQ3pELE1BQU0saUJBQWlCLEdBQUcsdUJB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