// @ts-nocheck
import __uniqid from '../string/uniqid';
import __injectStyle from '../css/injectStyle';
import __emptyNode from './emptyNode';
import __convert from '../time/convert';
/**
 * @name            innerHtml
 * @namespace           sugar.js.dom
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5uZXJIdG1sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5uZXJIdG1sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSxrQkFBa0IsQ0FBQztBQUN4QyxPQUFPLGFBQWEsTUFBTSxvQkFBb0IsQ0FBQztBQUMvQyxPQUFPLFdBQVcsTUFBTSxhQUFhLENBQUM7QUFDdEMsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFFeEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUNHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUM3QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3JDLHVCQUF1QjtRQUN2QixRQUFRLG1CQUNOLE1BQU0sRUFBRSxTQUFTLEVBQ2pCLE1BQU0sRUFBRSxNQUFNLEVBQ2QsT0FBTyxFQUFFLE1BQU0sRUFDZixjQUFjLEVBQUUsR0FBRyxFQUNuQixlQUFlLEVBQUUsR0FBRyxFQUNwQixjQUFjLEVBQUUsRUFBRSxFQUNsQixlQUFlLEVBQUUsRUFBRSxFQUNuQixZQUFZLEVBQUUsYUFBYSxFQUMzQixhQUFhLEVBQUUsYUFBYSxJQUN6QixRQUFRLENBQ1osQ0FBQztRQUNGLFFBQVEsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsUUFBUSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyRSxxQ0FBcUM7UUFDckMsTUFBTSxPQUFPLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDM0IsTUFBTSxnQkFBZ0IsR0FBRyxzQkFBc0IsT0FBTyxFQUFFLENBQUM7UUFDekQsTUFBTSxpQkFBaUIsR0FBRyx1QkFBdUIs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