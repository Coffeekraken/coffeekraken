// @ts-nocheck
import { __emptyNode, __injectStyle } from '@coffeekraken/sugar/dom';
import __uniqid from '../../../js/string/uniqid';
import __convertTime from '../../../shared/datetime/convertTime';
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
export default function __animatedInnerHtml(node, content, settings = {}) {
    return new Promise((resolve, reject) => {
        // process the settings
        settings = Object.assign({ action: 'replace', animIn: 'fade', animOut: 'fade', animInDuration: 300, animOutDuration: 150, animInDistance: 25, animOutDistance: 25, animInEasing: 'ease-in-out', animOutEasing: 'ease-in-out' }, settings);
        settings.animInDuration = __convertTime(settings.animInDuration, 'ms');
        settings.animOutDuration = __convertTime(settings.animOutDuration, 'ms');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3JFLE9BQU8sUUFBUSxNQUFNLDJCQUEyQixDQUFDO0FBQ2pELE9BQU8sYUFBYSxNQUFNLHNDQUFzQyxDQUFDO0FBRWpFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUNwRSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLHVCQUF1QjtRQUN2QixRQUFRLG1CQUNKLE1BQU0sRUFBRSxTQUFTLEVBQ2pCLE1BQU0sRUFBRSxNQUFNLEVBQ2QsT0FBTyxFQUFFLE1BQU0sRUFDZixjQUFjLEVBQUUsR0FBRyxFQUNuQixlQUFlLEVBQUUsR0FBRyxFQUNwQixjQUFjLEVBQUUsRUFBRSxFQUNsQixlQUFlLEVBQUUsRUFBRSxFQUNuQixZQUFZLEVBQUUsYUFBYSxFQUMzQixhQUFhLEVBQUUsYUFBYSxJQUN6QixRQUFRLENBQ2QsQ0FBQztRQUNGLFFBQVEsQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdkUsUUFBUSxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQ3BDLFFBQVEsQ0FBQyxlQUFlLEVBQ3hCLElBQUksQ0FDUCxDQUFDO1FBRUYscUNBQXFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFHLFFBQVEsRUFBRSxDQUFDO1FBQzNCLE1BQU0sZ0JBQWdCLEdBQUcsc0JBQXNCLE9BQU8sRUFBRSxDQUFDO1FBQ3pELE1BQU0saUJBQWlCLEdBQUcsdUJB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