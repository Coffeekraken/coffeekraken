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
        function SCacheAdapter(cache, settings) {
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
            /**
             * @name            cache
             * @type            SCache
             *
             * Store the cache instance which if used
             *
             * @since         2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this.cache = null;
            // store the settings
            this._settings = settings;
            this.cache = cache;
        }
        return SCacheAdapter;
    }());
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NhY2hlQWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNDYWNoZUFkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7O0lBc0NWO1FBdUJFOzs7Ozs7Ozs7V0FTRztRQUNILHVCQUFZLEtBQUssRUFBRSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBaENoQzs7Ozs7Ozs7ZUFRRztZQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7WUFFZjs7Ozs7Ozs7ZUFRRztZQUNILFVBQUssR0FBRyxJQUFJLENBQUM7WUFhWCxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQztRQUNILG9CQUFDO0lBQUQsQ0FBQyxBQXRDUSxJQXNDUCJ9