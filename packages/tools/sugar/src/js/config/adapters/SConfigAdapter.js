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
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @name                                SConfigAdapter
     * @namespace           sugar.js.config.adapters
     * @type                                Class
     * @status              beta
     *
     * Base class for SCache adapters
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example             js
     * class SConfigCoolAdapter extends SConfigAdapter {
     *    constructor(settings = {}) {
     *      super(settings);
     *      // settings are accessible through this._settings
     *    }
     *    async load() {
     *      // load the config the way you want and return it in Object format
     *      return {};
     *    }
     *    async save(newConfig) {
     *      // save the newConfig object the way you want and return true when all it ok
     *      return true;
     *    }
     * }
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var SConfigAdapter = /** @class */ (function () {
        /**
         * @name                              constructor
         * @type                              Function
         *
         * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
         *
         * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
         * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
         * - ...others: All the settings you need for your specific adapter
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        function SConfigAdapter(settings) {
            if (settings === void 0) { settings = {}; }
            /**
             * @name                              _settings
             * @type                              Object
             * @private
             *
             * Store the default settings of the SConfigAdapter instance
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            this._settings = {};
            if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
                throw new Error("The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...");
            }
            // store the settings
            this._settings = settings;
        }
        Object.defineProperty(SConfigAdapter.prototype, "name", {
            /**
             * @name                  name
             * @type                  String
             * @get
             *
             * Access the adapter setted name
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._settings.name;
            },
            set: function (value) {
                if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
                    throw new Error("The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...");
                }
                this._settings.name = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SConfigAdapter.prototype, "settings", {
            /**
             * @name                  settings
             * @type                  Object
             * @get
             *
             * Access the adapter setted settings
             *
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._settings;
            },
            enumerable: false,
            configurable: true
        });
        return SConfigAdapter;
    }());
    exports.default = SConfigAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7O0lBSVY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQThCRztJQUNIO1FBWUU7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCx3QkFBWSxRQUFhO1lBQWIseUJBQUEsRUFBQSxhQUFhO1lBdkJ6Qjs7Ozs7Ozs7ZUFRRztZQUNILGNBQVMsR0FBRyxFQUFFLENBQUM7WUFlYixJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5RCxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO2FBQ0g7WUFDRCxxQkFBcUI7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDNUIsQ0FBQztRQVdELHNCQUFJLGdDQUFJO1lBVFI7Ozs7Ozs7O2VBUUc7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUM3QixDQUFDO2lCQUNELFVBQVMsS0FBSztnQkFDWixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNyQyxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO2lCQUNIO2dCQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDOzs7V0FSQTtRQW1CRCxzQkFBSSxvQ0FBUTtZQVRaOzs7Ozs7OztlQVFHO2lCQUNIO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUN4QixDQUFDOzs7V0FBQTtRQUNILHFCQUFDO0lBQUQsQ0FBQyxBQW5FRCxJQW1FQyJ9