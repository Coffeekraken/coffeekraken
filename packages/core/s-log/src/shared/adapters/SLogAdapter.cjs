"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xvZ0FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3MtbG9nL3NyYy9zaGFyZWQvYWRhcHRlcnMvU0xvZ0FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsNEZBQXNFO0FBQ3RFLG9FQUE2QztBQWtDN0MsTUFBcUIsV0FBWSxTQUFRLGlCQUFRO0lBQy9DOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtCO1FBQ3BCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxZQUFZLFFBQTRDO1FBQ3RELGtCQUFrQjtRQUNsQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRSxFQUFFO1NBQ2YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYscURBQXFEO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsS0FBSyxVQUFVO1lBQzdDLE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksNkZBQTZGLENBQzVILENBQUM7SUFDTixDQUFDO0NBQ0Y7QUEzQ0QsOEJBMkNDIn0=