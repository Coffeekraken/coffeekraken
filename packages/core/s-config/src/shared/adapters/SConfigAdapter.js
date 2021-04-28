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
        get configAdapterSettings() {
            return this._settings.configAdapter;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbmZpZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtY29uZmlnL3NyYy9zaGFyZWQvYWRhcHRlcnMvU0NvbmZpZ0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsNEZBQXNFO0lBdUN0RSxNQUFxQixjQUFjO1FBZ0JqQzs7Ozs7Ozs7Ozs7V0FXRztRQUNILFlBQVksUUFBOEM7WUFDeEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM3QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUM5RCxNQUFNLElBQUksS0FBSyxDQUNiLHdGQUF3RixDQUN6RixDQUFDO2FBQ0g7UUFDSCxDQUFDO1FBdkJELElBQUkscUJBQXFCO1lBQ3ZCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUM7UUFDN0MsQ0FBQztRQXVCRDs7Ozs7Ozs7V0FRRztRQUNILE1BQU07WUFDSixvREFBb0Q7WUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUTtnQkFBRSxPQUFPO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVEOzs7Ozs7OztXQVFHO1FBQ0gsSUFBSSxJQUFJO1lBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSztZQUNaLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0ZBQXdGLENBQ3pGLENBQUM7YUFDSDtZQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDO0tBQ0Y7SUF4RUQsaUNBd0VDIn0=