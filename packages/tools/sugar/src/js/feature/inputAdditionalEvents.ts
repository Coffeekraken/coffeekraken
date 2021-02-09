// @ts-nocheck

import fastdom from 'fastdom';
import __dispatchEvent from '../dom/dispatchEvent';

/**
 * @name 		handleInputAttributes
 * @namespace           sugar.js.feature
 * @type      Feature
 * @stable
 *
 * Add some events on some DOM Elements. Here's the list:
 * - enter (onenter): Triggered when user tap ```enter``` on his keyboard from a **input*** or **textarea** element
 * - escape (onescape): Triggered when user tap ```escape``` on his keyboard from a **input*** or **textarea** element
 *
 * @param       {Object}        [settings={}]         An object of settings to configure your feature
 *
 * @setting       {Boolean}       [enter=true]        Specify if you want to "enter" keyboard event
 * @setting       {Boolean}       [escape=true]        Specify if you want to "escape" keyboard event
 *
 * @todo        interface
 * @todo        doc
 * @todo        tests
 * @todo        add setting to specify on which elements you want to enable the feature
 *
 * @example 	js
 * import inputAdditionalEvents from '@coffeekraken/sugar/js/feature/inputAdditionalEvents';
 * inputAdditionalEvents();
 *
 * @since         1.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function inputAdditionalEvents(settings = {}) {
  settings = {
    enter: true,
    escape: true,
    ...settings
  };

  function handleInputAttributes(e) {
    const field = e.target ? e.target : e;
    if (!field || !field.tagName) return;
    switch (field.tagName) {
      case 'INPUT':
      case 'TEXTAREA':
        fastdom.mutate(() => {
          if (e.keyCode) {
            switch (e.keyCode) {
              case 13: // enter
                if (settings.enter && field.hasAttribute('onenter')) {
                  eval(field.getAttribute('onenter'));
                  __dispatchEvent(field, 'enter');
                }
                break;
              case 27: // escape
                if (settings.escape && field.hasAttribute('onescape')) {
                  eval(field.getAttribute('onescape'));
                  __dispatchEvent(field, 'escape');
                }
                break;
            }
          }
        });
        break;
    }
  }

  document.addEventListener('change', handleInputAttributes);
  document.addEventListener('keyup', handleInputAttributes);
}
export default inputAdditionalEvents;
