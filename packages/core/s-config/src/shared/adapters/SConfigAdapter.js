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
        define(["require", "exports", "@coffeekraken/sugar/shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
    class SConfigAdapter {
        /**
         * @name                              constructor
         * @type                              Function
         *
         * Construct the SConfigAdapter instance with the settings passed in object format. See description bellow.
         *
         * @param         {Object}          [settings={}]             An object to configure the SConfigAdapter instance. This is specific to each adapters.settings.settings...
         * - name (null) {String}: Specify a simple name for this adapter instance. This name will be used to save the configs, etc...
         * - ...others: All the settings you need for your specific adapter
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        constructor(settings) {
            this._settings = deepMerge_1.default(settings || {});
            if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
                throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
            }
        }
        /**
         * @name        update
         * @type        Function
         *
         * Function that you have to call with the new config when it has been updated
         *
         * @since       2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        update() {
            // calling the "onUpdate" setting callback if exists
            if (!this._settings.onUpdate)
                return;
            this._settings.onUpdate();
        }
        /**
         * @name                  name
         * @type                  String
         * @get
         *
         * Access the adapter setted name
         *
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        get name() {
            return this._settings.name;
        }
        set name(value) {
            if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
                throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
            }
            this._settings.name = value;
        }
    }
    exports.default = SConfigAdapter;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTQ29uZmlnQWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCw0RkFBc0U7SUF1Q3RFLE1BQXFCLGNBQWM7UUFZakM7Ozs7Ozs7Ozs7O1dBV0c7UUFDSCxZQUFZLFFBQThDO1lBQ3hELElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0MsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUQsTUFBTSxJQUFJLEtBQUssQ0FDYix3RkFBd0YsQ0FDekYsQ0FBQzthQUNIO1FBQ0gsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsTUFBTTtZQUNKLG9EQUFvRDtZQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRO2dCQUFFLE9BQU87WUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQ7Ozs7Ozs7O1dBUUc7UUFDSCxJQUFJLElBQUk7WUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQzdCLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLO1lBQ1osSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FDYix3RkFBd0YsQ0FDekYsQ0FBQzthQUNIO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUM7S0FDRjtJQXBFRCxpQ0FvRUMifQ==