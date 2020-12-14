// @ts-nocheck
// @shared
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    return /** @class */ (function () {
        /**
         * @name                              constructor
         * @type                              Function
         *
         * Construct the SCacheAdapter instance with the settings passed in object format. See description bellow.
         *
         * @param         {Object}          [settings={}]             An object to configure the SCacheAdapter instance. This is specific to each adapters.settings.settings...
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SCacheAdapter(settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * @name                              _settings
             * @type                              Object
             * @private
             *
             * Store the default settings of the SCacheAdapter instance
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            // store the settings
            this._settings = settings;
        }
        return SCacheAdapter;
    }());
});
//# sourceMappingURL=module.js.map