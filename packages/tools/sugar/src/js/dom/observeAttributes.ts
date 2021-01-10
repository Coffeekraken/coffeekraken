// @ts-nocheck

import __SPromise from '../promise/SPromise';

/**
 * @name        observeAttributes
 * @namespace           sugar.js.dom
 * @type      Function
 * @stable
 *
 * Observe attributes on an HTMLElement and get mutations through the SPromise instance
 *
 * @param 		{HTMLElement} 					target 		The element to observe
 * @param 		{MutationObserverInit} 			settings 	The mutation observer settings
 * @return 		{SPromise} 								The SPromise throught which you can have the mutations using the "then" callback
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example  	js
 * import observeAttributes from 'sugarcss/js/dom/observeAttributes'
 * const observer = observeAttributes(myCoolHTMLElement).then(mutation => {
 * 		// do something with the mutation
 * });
 * / the observer
 * observe();
 *
 * @see 		https://developer.mozilla.org/en/docs/Web/API/MutationObserver
 * @since       1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function observeAttributes (target, settings = {}) {
  return new __SPromise(
    (resolve, reject, trigger) => {
      // create a new observer
      const mutationObserver = new MutationObserver((mutations) => {
        let mutedAttrs = {};
        // loop on mutations
        mutations.forEach((mutation) => {
          // push mutation
          if (!mutedAttrs[mutation.attributeName]) {
            trigger('then', mutation);
            mutedAttrs[mutation.attributeName] = true;
          }
        });
        mutedAttrs = {};
      });
      mutationObserver.observe(target, {
        attributes: true,
        // characterData : true,
        ...settings
      });
    },
    {
      id: 'observeAttributes'
    }
  ).on('finally', () => {
    mutationObserver.disconnect();
  });
}

/**
 * List of attributes to observe
 * @setting
 * @name 		attributes
 * @type 		{Array}
 * @default 	null
 */
export = observeAttributes;