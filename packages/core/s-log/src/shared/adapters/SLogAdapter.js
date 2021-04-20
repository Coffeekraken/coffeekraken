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
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/s-class"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
    class SLogAdapter extends s_class_1.default {
        /**
         * @name          logAdapterSettings
         * @type          ISLogAdapterSettings
         * @get
         *
         * Access the logAdapter settings
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get logAdapterSettings() {
            return this._settings.logAdapter;
        }
        /**
         * @name          constructor
         * @type          Function
         *
         * Constructor
         *
         * @param         {Object}        [settings={}]           The settings object to configure your SLogAdapter instance. Here's the settings available:
         * - logMethods ({}) {Object}: Store all the console methods like "log", "info", "warn", "debug" and "error". You can override each methods with your own method if you want. The Object format is { methodName: overrideFunction }
         *
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings) {
            // extend settings
            super(deepMerge_1.default({
                logAdapter: {}
            }, settings !== null && settings !== void 0 ? settings : {}));
            // make sure the adapter implement a ```log``` method
            if (!this.log || typeof this.log !== 'function')
                throw new Error(`<red>[${this.constructor.name}]</red> Sorry but your SLog adapter MUST implement a "<yellow>log(lobObj)</yellow>" method.`);
        }
    }
    exports.default = SLogAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTTG9nQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0RkFBc0U7SUFDdEUsb0VBQTZDO0lBa0M3QyxNQUFxQixXQUFZLFNBQVEsaUJBQVE7UUFDL0M7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxrQkFBa0I7WUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUMxQyxDQUFDO1FBRUQ7Ozs7Ozs7Ozs7V0FVRztRQUNILFlBQVksUUFBNEM7WUFDdEQsa0JBQWtCO1lBQ2xCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLFVBQVUsRUFBRSxFQUFFO2FBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1lBRUYscURBQXFEO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsS0FBSyxVQUFVO2dCQUM3QyxNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDZGQUE2RixDQUM1SCxDQUFDO1FBQ04sQ0FBQztLQUNGO0lBM0NELDhCQTJDQyJ9