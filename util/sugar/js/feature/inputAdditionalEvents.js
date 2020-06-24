"use strict";

var _fastdom = _interopRequireDefault(require("fastdom"));

var _dispatchEvent = _interopRequireDefault(require("../dom/dispatchEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		handleInputAttributes
 * @namespace           js.feature
 * @type      Feature
 *
 * Add some events on some DOM Elements. Here's the list:
 * **input/textarea**: `onenter`, `onescape`
 *
 * @example 	js
 * import '@coffeekraken/sugar/js/feature/inputAdditionalEvents'
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// TODO tests
function handleInputAttributes(e) {
  const field = e.target ? e.target : e;
  if (!field || !field.tagName) return;

  switch (field.tagName) {
    case 'INPUT':
    case 'TEXTAREA':
      _fastdom.default.mutate(() => {
        if (e.keyCode) {
          switch (e.keyCode) {
            case 13:
              // enter
              if (field.hasAttribute('onenter')) {
                eval(field.getAttribute('onenter'));
                (0, _dispatchEvent.default)(field, 'enter');
              }

              break;

            case 27:
              // escape
              if (field.hasAttribute('onescape')) {
                eval(field.getAttribute('onescape'));
                (0, _dispatchEvent.default)(field, 'escape');
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