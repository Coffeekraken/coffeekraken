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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7SUFtQ1Y7UUFZRTs7Ozs7Ozs7Ozs7V0FXRztRQUNILHdCQUFZLFFBQWE7WUFBYix5QkFBQSxFQUFBLGFBQWE7WUF2QnpCOzs7Ozs7OztlQVFHO1lBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztZQWViLElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzlELE1BQU0sSUFBSSxLQUFLLENBQ2Isd0ZBQXdGLENBQ3pGLENBQUM7YUFDSDtZQUNELHFCQUFxQjtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM1QixDQUFDO1FBV0Qsc0JBQUksZ0NBQUk7WUFUUjs7Ozs7Ozs7ZUFRRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQzdCLENBQUM7aUJBQ0QsVUFBUyxLQUFLO2dCQUNaLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0ZBQXdGLENBQ3pGLENBQUM7aUJBQ0g7Z0JBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzlCLENBQUM7OztXQVJBO1FBbUJELHNCQUFJLG9DQUFRO1lBVFo7Ozs7Ozs7O2VBUUc7aUJBQ0g7Z0JBQ0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ3hCLENBQUM7OztXQUFBO1FBQ0gscUJBQUM7SUFBRCxDQUFDLEFBbkVRLElBbUVQIn0=