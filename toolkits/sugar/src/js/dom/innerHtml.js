import __uniqid from '../string/uniqid';
import __injectStyle from '../css/injectStyle';
import __emptyNode from './emptyNode';
import __convert from '../time/convert';

// TODO tests

/**
 * @name            innerHtml
 * @namespace           js.dom
 * @type            Function
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
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function innerHtml(node, content, settings = {}) {
  return new Promise((resolve, reject) => {
    // process the settings
    settings = {
      action: 'replace',
      animIn: 'fade',
      animOut: 'fade',
      animInDuration: 300,
      animOutDuration: 150,
      animInDistance: 25,
      animOutDistance: 25,
      animInEasing: 'ease-in-out',
      animOutEasing: 'ease-in-out',
      ...settings
    };
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
          } else {
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
        } else {
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
        } else {
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
