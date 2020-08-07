"use strict";

var _domReady = _interopRequireDefault(require("../dom/domReady"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name 		        settings
 * @namespace           js.core
 * @type 		{Object}
 *
 * Store all the sugar settings grabed from your scss settings
 *
 * @example    js
 * import settings from '@coffeekraken/sugar/js/core/settings';
 * console.log(settings.unit); // => 'rem'
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// imports
// prepare a settings object to store
// the getted settings from the css
let settings = {}; // wait the css to be loaded

(0, _domReady.default)(() => {
  let settingsElm = document.createElement('div');
  settingsElm.classList.add('s-settings');
  document.body.appendChild(settingsElm);

  let _settings = window.getComputedStyle(settingsElm, ':after').getPropertyValue('content').trim();

  if (_settings && _settings !== '' && _settings !== 'none') {
    _settings = _settings.replace(/\\"/g, '"'); // handle numbers that does not have initial 0.65

    _settings = _settings.replace(/([:|\s])(\.\d+)([\s|,|}]?)/g, '$10$2$3');
    _settings = _settings.slice(1, _settings.length - 1);
    _settings = JSON.parse(_settings);
    Object.assign(settings, _settings);
  }
}); // export the settings

module.exports = settings;