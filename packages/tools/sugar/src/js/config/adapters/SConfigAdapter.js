// @ts-nocheck
// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../object/deepMerge", "../../event/SEventEmitter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var deepMerge_1 = __importDefault(require("../../object/deepMerge"));
    var SEventEmitter_1 = __importDefault(require("../../event/SEventEmitter"));
    var SConfigAdapter = /** @class */ (function (_super) {
        __extends(SConfigAdapter, _super);
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
            var _this = _super.call(this, deepMerge_1.default({
                configAdapter: {}
            }, settings || {})) || this;
            if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
                throw new Error("The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...");
            }
            return _this;
        }
        Object.defineProperty(SConfigAdapter.prototype, "configAdapterSettings", {
            /**
             * @name        configAdapterSettings
             * @type        ISConfigAdapterSettings
             * @get
             *
             * Access the config adapter settings
             *
             * @since     2.0.0
             * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            get: function () {
                return this._settings.configAdapter;
            },
            enumerable: false,
            configurable: true
        });
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
                return this.configAdapterSettings.name;
            },
            set: function (value) {
                if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
                    throw new Error("The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...");
                }
                this._settings.configAdapter.name = value;
            },
            enumerable: false,
            configurable: true
        });
        return SConfigAdapter;
    }(SEventEmitter_1.default));
    exports.default = SConfigAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLHFFQUFpRDtJQUVqRCw0RUFBd0Q7SUF3Q3hEO1FBQTRDLGtDQUFlO1FBZXpEOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsd0JBQVksUUFBcUM7WUFBakQsWUFDRSxrQkFDRSxtQkFBVyxDQUNUO2dCQUNFLGFBQWEsRUFBRSxFQUFFO2FBQ2xCLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLFNBT0Y7WUFMQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5RCxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO2FBQ0g7O1FBQ0gsQ0FBQztRQS9CRCxzQkFBSSxpREFBcUI7WUFWekI7Ozs7Ozs7OztlQVNHO2lCQUNIO2dCQUNFLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxhQUFhLENBQUM7WUFDN0MsQ0FBQzs7O1dBQUE7UUF3Q0Qsc0JBQUksZ0NBQUk7WUFUUjs7Ozs7Ozs7ZUFRRztpQkFDSDtnQkFDRSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7WUFDekMsQ0FBQztpQkFDRCxVQUFTLEtBQUs7Z0JBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FDYix3RkFBd0YsQ0FDekYsQ0FBQztpQkFDSDtnQkFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQzVDLENBQUM7OztXQVJBO1FBU0gscUJBQUM7SUFBRCxDQUFDLEFBaEVELENBQTRDLHVCQUFlLEdBZ0UxRCJ9