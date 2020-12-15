// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../dom/domready"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // imports
    var domready_1 = __importDefault(require("../dom/domready"));
    // prepare a settings object to store
    // the getted settings from the css
    var settings = {};
    // wait the css to be loaded
    domready_1.default(function () {
        var settingsElm = document.createElement('div');
        settingsElm.classList.add('s-settings');
        document.body.appendChild(settingsElm);
        var _settings = window
            .getComputedStyle(settingsElm, ':after')
            .getPropertyValue('content')
            .trim();
        if (_settings && _settings !== '' && _settings !== 'none') {
            _settings = _settings.replace(/\\"/g, '"');
            // handle numbers that does not have initial 0.65
            _settings = _settings.replace(/([:|\s])(\.\d+)([\s|,|}]?)/g, '$10$2$3');
            _settings = _settings.slice(1, _settings.length - 1);
            _settings = JSON.parse(_settings);
            Object.assign(settings, _settings);
        }
    });
    // export the settings
    module.exports = settings;
});
//# sourceMappingURL=settings.js.map