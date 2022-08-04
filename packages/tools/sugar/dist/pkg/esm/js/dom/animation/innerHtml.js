// @ts-nocheck
import __uniqid from '../../../shared/string/uniqid';
import __convert from '../../../shared/time/convert';
import __injectStyle from '../../dom/css/injectStyle';
import __emptyNode from '../manipulate/emptyNode';
/**
 * @name            innerHtml
 * @namespace            js.dom.animation
 * @type            Function
 * @platform          js
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFFBQVEsTUFBTSwrQkFBK0IsQ0FBQztBQUNyRCxPQUFPLFNBQVMsTUFBTSw4QkFBOEIsQ0FBQztBQUNyRCxPQUFPLGFBQWEsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RCxPQUFPLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMENHO0FBQ0gsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUMzQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ25DLHVCQUF1QjtRQUN2QixRQUFRLG1CQUNKLE1BQU0sRUFBRSxTQUFTLEVBQ2pCLE1BQU0sRUFBRSxNQUFNLEVBQ2QsT0FBTyxFQUFFLE1BQU0sRUFDZixjQUFjLEVBQUUsR0FBRyxFQUNuQixlQUFlLEVBQUUsR0FBRyxFQUNwQixjQUFjLEVBQUUsRUFBRSxFQUNsQixlQUFlLEVBQUUsRUFBRSxFQUNuQixZQUFZLEVBQUUsYUFBYSxFQUMzQixhQUFhLEVBQUUsYUFBYSxJQUN6QixRQUFRLENBQ2QsQ0FBQztRQUNGLFFBQVEsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkUsUUFBUSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyRSxxQ0FBcUM7UUFDckMsTUFBTSxPQUFPLEdBQUcsUUFBUSxFQUFFLENBQUM7UUFDM0IsTUFBTSxnQkFBZ0IsR0FBRyxzQkFBc0IsT0FBTyxFQUFFLENBQUM7UUFDekQsTUFBTSxpQkFBaUIsR0FBRyx1QkFBdUIsT0FBTyxFQUFFLENBQUM7UUFFM0QsZ0NBQWdDO1FBQ2hDLElBQUksWUFBWSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUM7UUFFdEMsZ0NBQWdDO1FBQ2hDLFFBQVEsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNyQixLQUFLLE1BQU07Z0JBQ1AsTUFBTSxXQUFXLEdBQUc7OEJBQ04sT0FBTzs7Ozs7Ozs7YUFReEIsZ0JBQWdCO2tDQUNLLE9BQU8sSUFBSSxRQUFRLENBQUMsY0FBYyxNQUFNLFFBQVEsQ0FBQyxZQUFZOztTQUV0RixDQUFDO2dCQUNNLFlBQVksR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQzFDLE1BQU07WUFDVixLQUFLLFVBQVU7Z0JBQ1gsTUFBTSxpQkFBaUIsR0FBRzs4QkFDWixPQUFPOzs7dUNBR0UsUUFBUSxDQUFDLGNBQWM7Ozs7Ozs7YUFPakQsZ0JBQWdCO2tDQUNLLE9BQU8sSUFBSSxRQUFRLENBQUMsY0FBYyxNQUFNLFFBQVEsQ0FBQyxZQUFZOztTQUV0RixDQUFDO2dCQUNNLFlBQVksR0FBRyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDaEQsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxNQUFNLG1CQUFtQixHQUFHOzhCQUNkLE9BQU87OztzQ0FHQyxRQUFRLENBQUMsY0FBYzs7Ozs7OzthQU9oRCxnQkFBZ0I7a0NBQ0ssT0FBTyxJQUFJLFFBQVEsQ0FBQyxjQUFjLE1BQU0sUUFBUSxDQUFDLFlBQVk7O1NBRXRGLENBQUM7Z0JBQ00sWUFBWSxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1YsS0FBSyxXQUFXO2dCQUNaLE1BQU0sbUJBQW1CLEdBQUc7OEJBQ2QsT0FBTzs7O3VDQUdFLFFBQVEsQ0FBQyxjQUFjOzs7Ozs7O2FBT2pELGdCQUFnQjtrQ0FDSyxPQUFPLElBQUksUUFBUSxDQUFDLGNBQWMsTUFBTSxRQUFRLENBQUMsWUFBWTs7U0FFdEYsQ0FBQztnQkFDTSxZQUFZLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7Z0JBQ2xELE1BQU07WUFDVixLQUFLLFVBQVU7Z0JBQ1gsTUFBTSxvQkFBb0IsR0FBRzs4QkFDZixPQUFPOzs7c0NBR0MsUUFBUSxDQUFDLGNBQWM7Ozs7Ozs7YUFPaEQsZ0JBQWdCO2tDQUNLLE9BQU8sSUFBSSxRQUFRLENBQUMsY0FBYyxNQUFNLFFBQVEsQ0FBQyxZQUFZOztTQUV0RixDQUFDO2dCQUNNLFlBQVksR0FBRyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDbkQsTUFBTTtTQUNiO1FBQ0QsUUFBUSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQ3RCLEtBQUssTUFBTTtnQkFDUCxNQUFNLGdCQUFnQixHQUFHOytCQUNWLE9BQU87Ozs7Ozs7O2FBUXpCLGlCQUFpQjtpQ0FDRyxPQUFPLElBQUksUUFBUSxDQUFDLGVBQWUsTUFBTSxRQUFRLENBQUMsYUFBYTs7U0FFdkYsQ0FBQztnQkFDTSxhQUFhLEdBQUcsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQ2hELE1BQU07WUFDVixLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxrQkFBa0IsR0FBRzsrQkFDWixPQUFPOzs7Ozs7O3VDQU9DLFFBQVEsQ0FBQyxlQUFlOzs7YUFHbEQsaUJBQWlCO21DQUNLLE9BQU8sSUFBSSxRQUFRLENBQUMsZUFBZSxNQUFNLFFBQVEsQ0FBQyxhQUFhOztTQUV6RixDQUFDO2dCQUNNLGFBQWEsR0FBRyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDbEQsTUFBTTtZQUNWLEtBQUssVUFBVTtnQkFDWCxNQUFNLG9CQUFvQixHQUFHOytCQUNkLE9BQU87Ozs7Ozs7c0NBT0EsUUFBUSxDQUFDLGVBQWU7OzthQUdqRCxpQkFBaUI7bUNBQ0ssT0FBTyxJQUFJLFFBQVEsQ0FBQyxlQUFlLE1BQU0sUUFBUSxDQUFDLGFBQWE7O1NBRXpGLENBQUM7Z0JBQ00sYUFBYSxHQUFHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNO1lBQ1YsS0FBSyxVQUFVO2dCQUNYLE1BQU0sb0JBQW9CLEdBQUc7K0JBQ2QsT0FBTzs7Ozs7Ozt1Q0FPQyxRQUFRLENBQUMsZUFBZTs7O2FBR2xELGlCQUFpQjttQ0FDSyxPQUFPLElBQUksUUFBUSxDQUFDLGVBQWUsTUFBTSxRQUFRLENBQUMsYUFBYTs7U0FFekYsQ0FBQztnQkFDTSxhQUFhLEdBQUcsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQ3BELE1BQU07WUFDVixLQUFLLFdBQVc7Z0JBQ1osTUFBTSxxQkFBcUIsR0FBRzsrQkFDZixPQUFPOzs7Ozs7O3NDQU9BLFFBQVEsQ0FBQyxlQUFlOzs7YUFHakQsaUJBQWlCO21DQUNLLE9BQU8sSUFBSSxRQUFRLENBQUMsZUFBZSxNQUFNLFFBQVEsQ0FBQyxhQUFhOztTQUV6RixDQUFDO2dCQUNNLGFBQWEsR0FBRyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztnQkFDckQsTUFBTTtTQUNiO1FBRUQsa0NBQWtDO1FBQ2xDLFFBQVEsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUNyQixLQUFLLFNBQVM7Z0JBQ1YseURBQXlEO2dCQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV0QywyQ0FBMkM7Z0JBQzNDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ1osbUNBQW1DO29CQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO29CQUV6QyxxQkFBcUI7b0JBQ3JCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO3dCQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDckM7b0JBRUQsd0RBQXdEO29CQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVyQyw4REFBOEQ7b0JBQzlELFVBQVUsQ0FBQyxHQUFHLEVBQUU7d0JBQ1osT0FBTyxFQUFFLENBQUM7d0JBRVYsdUJBQXVCO3dCQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO3dCQUV4QywrQkFBK0I7d0JBQy9CLFlBQVksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUNsRCxhQUFhLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDeEQsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDN0IsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCwyREFBMkQ7Z0JBQzNELElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtvQkFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7aUJBQzVCO3FCQUFNO29CQUNILElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3hCO2dCQUVELHFCQUFxQjtnQkFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdkIsOERBQThEO2dCQUM5RCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLE9BQU8sRUFBRSxDQUFDO29CQUVWLHVCQUF1QjtvQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFeEMsK0JBQStCO29CQUMvQixZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDbEQsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3hELENBQUMsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTVCLE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsMkRBQTJEO2dCQUMzRCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDckMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO2lCQUM1QjtxQkFBTTtvQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUN4QjtnQkFFRCxxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFFekMsOERBQThEO2dCQUM5RCxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNaLE9BQU8sRUFBRSxDQUFDO29CQUVWLHVCQUF1QjtvQkFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFFeEMsK0JBQStCO29CQUMvQixZQUFZLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztvQkFDbEQsYUFBYSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQ3hELENBQUMsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBRTVCLE1BQU07U0FDYjtJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELGVBQWUsU0FBUyxDQUFDIn0=